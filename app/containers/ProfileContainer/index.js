import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as ProfileContainerActionCreators from './actions';
import './index.css';
import {
  Button,
  Box,
  Image,
  Input,
  Text,
  Flex,
  ListItem,
  List,
} from '@chakra-ui/react';
import { store } from '../../store';
import * as S from './selectors';
import { isNil } from 'lodash';
import * as T from '../App/constants';
import { LOCALSTORAGE_KEY } from '../App/constants';
import { FaCarSide } from 'react-icons/fa';
import { PiChargingStationFill, PiPlugChargingFill } from 'react-icons/pi';
import StarRatingDisplay from '../../components/StarRatingDisplay';
import { FaUserLarge } from 'react-icons/fa6';
import { BsFillBarChartLineFill } from 'react-icons/bs';
import { FaBook } from 'react-icons/fa';

const convertBase64 = file => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = error => {
      reject(error);
    };
  });
};

function base64toFile(base64String, filename, contentType) {
  const byteCharacters = atob(base64String); // Decode base64 string
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new File([byteArray], filename, { type: contentType });
  return URL.createObjectURL(file);
}

const writeLocalStorage = (data, key) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const updateUserInLocalStorage = (newUser, key) => {
  // Retrieve the existing data from localStorage
  const existingDataString = localStorage.getItem(key);

  // Parse the existing data to an object
  let existingData = {};
  if (existingDataString) {
    existingData = JSON.parse(existingDataString);
  }

  // Update the user parameter
  existingData.user = newUser;

  // Write the updated data back to localStorage
  writeLocalStorage(existingData, key);
};

export function ProfileContainer(props) {
  const { actions } = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [userInfo, setUserInfo] = useState(null);
  const [image, setImage] = useState('');
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const fileInputRef = useRef(null);
  const defaultImage =
    'https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg';

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const {
      global: { user },
    } = store.getState();
    if (user && user.user) {
      actions.getUserAction({ id: user.user.id });
    }

    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setUserInfo(props.user);
    if (!isNil(props.user)) {
      setImage(props.user.profile_photo);
      setName(props.user.name);
      setEmail(props.user.email);
      setAddress(props.user.address);
    }
  }, [props.user]);

  const handleFileRead = async event => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      const base64Data = base64.split(',')[1];
      setImage(base64Data);
      actions.updateUserAction({
        ...userInfo,
        profile_photo: base64Data,
        name,
        email,
        address,
      });

      updateUserInLocalStorage(
        {
          ...userInfo,
          profile_photo: base64Data,
          name,
          email,
          address,
        },
        LOCALSTORAGE_KEY,
      );
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/*<Box*/}
      {/*  minH={'100vh'}*/}
      {/*  align={'center'}*/}
      {/*  justify={'center'}*/}
      {/*  // bg={useColorModeValue('gray.50', 'gray.800')}*/}
      {/*  backgroundSize="cover"*/}
      {/*  backgroundPosition="center"*/}
      {/*  backgroundRepeat="no-repeat"*/}
      {/*  _before={{*/}
      {/*    paddingLeft: '240px',*/}
      {/*    content: '""',*/}
      {/*    position: 'absolute',*/}
      {/*    top: 0,*/}
      {/*    right: '10%', // Adjust this value to set the left margin*/}
      {/*    width: '90%', // Adjust this value to account for the left margin*/}
      {/*    height: '100%',*/}
      {/*    bgImage:*/}
      {/*      'https://evocharge.com/wp-content/uploads/2021/02/GettyImages-1184969192-1.jpg',*/}
      {/*    bgSize: 'cover',*/}
      {/*    bgPosition: 'center',*/}
      {/*    bgRepeat: 'no-repeat',*/}
      {/*    bgAttachment: 'fixed',*/}
      {/*    opacity: 0.2,*/}
      {/*    zIndex: -999,*/}
      {/*  }}*/}
      {/*  zIndex={-99999}*/}
      {/*>*/} {/* Added justifyContent: 'center' */}
      {showFirstDiv && (
        <div style={{ width: '240px', flexShrink: 0 }}>
          {' '}
          {/* Added flexShrink: 0 */}
          {/* Content for the first div */}
        </div>
      )}
      <div>
        <Box
          mt={'2rem'}
          boxShadow={'2xl'}
          width={'45rem'}
          height={'84vh'}
          zIndex={1}
        >
          <Box display="flex" justifyContent="center" zIndex={1}>
            <Box zIndex={1}>
              <Image
                mt={'2rem'}
                borderRadius="full"
                boxSize="200px"
                src={
                  image ? base64toFile(image, 'image', 'jpeg') : defaultImage
                }
              />
              <Button
                mt={7}
                w="full"
                bg={'green.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                _hover={{
                  bg: 'green.500',
                }}
                _focus={{
                  bg: 'green.500',
                }}
                onClick={handleButtonClick}
              >
                Change Photo
                <input
                  style={{ display: 'none' }}
                  type="file"
                  accept=".jpeg, .png, .jpg"
                  placeholder="Car plug"
                  ref={fileInputRef}
                  onChange={handleFileRead}
                />
              </Button>
            </Box>
          </Box>
          <Box mx={10} my={6}>
            <Flex justifyContent="space-between">
              <Box width={'40%'}>
                <Text fontSize={'md'} mt={3}>
                  Name
                </Text>
                <Input
                  placeholder="Name"
                  isDisabled={!isEditEnabled}
                  variant="flushed"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </Box>
              <Box width={'40%'}>
                <Text fontSize={'md'} mt={3}>
                  Email
                </Text>
                <Input
                  placeholder="Email"
                  isDisabled={!isEditEnabled}
                  variant="flushed"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </Box>
            </Flex>
            <Box width={'100%'}>
              <Text fontSize={'md'} mt={3}>
                Adress
              </Text>
              <Input
                placeholder="Ender your address"
                isDisabled={!isEditEnabled}
                variant="flushed"
                value={address}
                onChange={e => {
                  setAddress(e.target.value);
                }}
              />
            </Box>
            <Flex w="full" justifyContent="space-between">
              <Button
                mt={10}
                w="47%"
                bg={'green.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                onClick={() => {
                  setIsEditEnabled(!isEditEnabled);
                  if (isEditEnabled && !isNil(props.user)) {
                    setImage(props.user.profile_photo);
                    setName(props.user.name);
                    setEmail(props.user.email);
                    setAddress(props.user.address);
                  }
                }}
                _hover={{
                  bg: 'green.500',
                }}
                _focus={{
                  bg: 'green.500',
                }}
              >
                {isEditEnabled ? 'Cancel' : 'Edit'}
              </Button>
              <Button
                mt={10}
                w={'47%'}
                bg={'green.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgba(72, 187, 120, 0.43)'}
                _hover={{ bg: 'green.500' }}
                _focus={{ bg: 'green.500' }}
                onClick={() => {
                  actions.updateUserAction({
                    ...userInfo,
                    profile_photo: image,
                    name,
                    email,
                    address,
                  });
                  setIsEditEnabled(!isEditEnabled);
                  updateUserInLocalStorage(
                    {
                      ...userInfo,
                      profile_photo: image,
                      name,
                      email,
                      address,
                    },
                    LOCALSTORAGE_KEY,
                  );
                }}
              >
                Save
              </Button>
            </Flex>
            <List spacing={3} mt={10}>
              <ListItem>
                <Flex alignItems="center" mb={2}>
                  <Box mr={3} mt={3}>
                    <FaUserLarge size={25} />
                  </Box>
                  <Text fontSize={'md'} mt={3}>
                    Role:
                  </Text>
                  <Text fontSize={'md'} mt={3} ml="auto" mr={5}>
                    {userInfo?.role ? 'Contributor' : 'User'}
                  </Text>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex alignItems="center" mb={2}>
                  <Box mr={3} mt={3}>
                    <BsFillBarChartLineFill size={25} />
                  </Box>
                  <Text fontSize={'md'} mt={3}>
                    Personal Rating:
                  </Text>
                  <Text fontSize={'md'} mt={3} ml="auto" mr={5}>
                    <StarRatingDisplay
                      rating={userInfo?.personal_rating}
                      starSize={30}
                      ratingSize={'md'}
                    />
                  </Text>
                </Flex>
              </ListItem>
              <ListItem>
                <Flex alignItems="center" mb={2}>
                  <Box mr={3} mt={3}>
                    <FaBook size={25} />
                  </Box>
                  <Text fontSize={'md'} mt={3}>
                    Number of Bookings:
                  </Text>
                  <Text fontSize={'md'} mt={3} ml="auto" mr={5}>
                    {userInfo?.bookings_number}
                  </Text>
                </Flex>
              </ListItem>
            </List>
          </Box>
        </Box>
      </div>
      {/*</Box>*/}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
  user: S.selectUser(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ProfileContainerActionCreators, dispatch),
});

const ConnectedProfileContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProfileContainer);

export default ConnectedProfileContainer;
