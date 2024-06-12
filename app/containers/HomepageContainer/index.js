import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as HomepageContainerActionCreators from './actions';
import './index.css';
import CarCard from '../../components/CarCard';
import {
  Icon,
  Input,
  Button,
  Flex,
  useDisclosure,
  Heading,
  Box,
} from '@chakra-ui/react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import * as S from './selectors';
import { store } from '../../store';
import AddCarModal from '../../components/AddCarModal';
import CarDetailsModal from '../../components/CarDetailsModal';
import { isEmpty } from 'lodash';
import BookingDetailsModal from '../../components/BookingDetailsModal';

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

export function HomepageContainer(props) {
  const { actions } = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [carItems, setCarItems] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [stations, setStations] = useState([]);
  const [updateErrorMessagesState, setUpdateErrorMessagesState] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const {
      global: { user },
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
      actions.getUserCars({ userId: user.user.id });
    }
    actions.getStationsAction();

    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setCarItems(props.userCars);
    setStations(props.allStations);
  }, [props.userCars, props.allStations]);

  useEffect(() => {
    setUpdateErrorMessagesState(props.updateErrorMessages);
  }, [props.updateErrorMessages]);

  const deleteErrors = () => {
    setUpdateErrorMessagesState({});
  };

  const addCar = (name, plate, plug_type, image) => {
    actions.addCar({ userId: userInfo.id, name, plate, plug_type, image });
    actions.getUserCars({ userId: userInfo.id });
  };

  const openCarDetails = carIndex => {
    setSelectedCar(carItems[carIndex]);
    setIsOpenEdit(true);
  };

  const deleteCar = carId => {
    actions.deleteCar({ id: carId });
    setCarItems(carItems.filter(car => car.id !== carId));
    actions.getUserCars({ userId: userInfo.id });
    setIsOpenEdit(false);
  };

  const updateCar = (id, name, plate, plug_type, image) => {
    actions.updateCar({ id, name, plate, plug_type, image });
    actions.getUserCars({ userId: userInfo.id });
  };

  const handleBookButton = carIndex => {
    setSelectedCar(carItems[carIndex]);
    setOpenBookingModal(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {showFirstDiv && <div style={{ width: '240px', flexShrink: 0 }} />}
      <div style={{ width: '100%' }}>
        <Box mt={4} ml={7} mr={7}>
          <Flex justify="center" align="center" mt={10}>
            <Box mb={10}>
              <Icon
                mr="4"
                mt="1"
                fontSize="30"
                _groupHover={{
                  color: 'white',
                }}
                as={FiSearch}
              />
              <Input
                width={'30rem'}
                className="search-bar"
                placeholder="Search Car"
                value={searchField}
                onChange={event => {
                  const searchTerm = event.target.value.toLowerCase();
                  setSearchField(event.target.value);
                  setCarItems(
                    props.userCars.filter(carItem =>
                      carItem.name.toLowerCase().includes(searchTerm),
                    ),
                  );
                }}
              />
              <Button
                ml={8}
                mb={2}
                fontSize="sm"
                rounded="full"
                bg="blue.400"
                color="white"
                boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
                onClick={onOpen}
              >
                Add Car
                <Icon
                  ml="2"
                  title="filterSurveyTags"
                  fontSize="20"
                  _groupHover={{
                    color: 'white',
                  }}
                  as={FiPlus}
                />
              </Button>
            </Box>
          </Flex>
          <Flex alignItems="center" wrap="wrap">
            {carItems.map((car, index) => (
              <Box p={3} mx={4} mb={12} key={index}>
                <div className="car-card">
                  <CarCard
                    index={index}
                    plate={car.plate}
                    plugType={car.plug_type}
                    image={car.image}
                    name={car.name}
                    openCarDetails={openCarDetails}
                    handleBookButton={handleBookButton}
                  />
                </div>
              </Box>
            ))}
          </Flex>
          {isEmpty(carItems) && (
            <div>
              <Heading
                mt={12}
                fontSize={'4xl'}
                fontFamily={'body'}
                fontWeight={500}
                align="center"
                textAlign={'center'}
              >
                No cars added yet!
              </Heading>
            </div>
          )}
        </Box>
      </div>
      <AddCarModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        addCar={addCar}
        errors={props.errorMessages}
        successAddCar={props.successAddCar}
      />
      {isOpenEdit && selectedCar && (
        <CarDetailsModal
          setIsOpenEdit={setIsOpenEdit}
          selectedCar={selectedCar}
          deleteCar={deleteCar}
          updateCar={updateCar}
          errors={updateErrorMessagesState}
          successUpdateCar={props.successUpdateCar}
          deleteErrors={deleteErrors}
        />
      )}
      {openBookingModal && (
        <BookingDetailsModal
          setOpenBookingModal={setOpenBookingModal}
          cars={carItems}
          stations={stations}
          selectedCar={selectedCar}
          userId={userInfo.id}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
  userCars: S.selectUserCars(state),
  allStations: S.selectAllStations(state),
  errorMessages: S.selectErrorMessages(state),
  successAddCar: S.selectSuccessAddCar(state),
  updateErrorMessages: S.selectUpdateErrorMessages(state),
  successUpdateCar: S.selectSuccessUpdateCar(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(HomepageContainerActionCreators, dispatch),
});

const ConnectedHomepageContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(HomepageContainer);

export default ConnectedHomepageContainer;
