import React, { useRef, useState } from 'react';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Flex,
  Box,
  Image,
  Text,
  Select,
} from '@chakra-ui/react';
import { BOOKING_TYPES } from '../../containers/HomepageContainer/constants';

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

function AddStationModal({ setIsAddStationModalOpen, addStation }) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [name, setName] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [openingHours, setOpeningHours] = useState('08:00');
  const [closingHours, setClosingHours] = useState('17:00');

  const [kwPower, setKwPower] = useState('');
  const [costPerKw, setCostPerKw] = useState('');
  const [plug, setPlug] = useState(BOOKING_TYPES[0]);

  const [image, setImage] = useState('');
  const defaultImage =
    'https://static.vecteezy.com/system/resources/previews/006/683/801/non_2x/electric-vehicle-sport-car-charging-parking-at-the-charger-station-with-a-plug-in-cable-charging-in-the-top-side-of-car-to-battery-isolated-flat-illustration-on-white-background-vector.jpg';

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileRead = async event => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      const base64Data = base64.split(',')[1];
      setImage(base64Data);
    }
  };

  return (
    <>
      <Modal
        size="2xl"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={() => setIsAddStationModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>PUBLISH A STATION</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box mx={10} my={6}>
              <Flex justifyContent="space-between">
                <Box width={'44%'}>
                  <Input
                    placeholder="Station Name"
                    variant="flushed"
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                    }}
                  />
                </Box>
                <Box width={'44%'}>
                  <Input
                    placeholder="Station related website Link"
                    variant="flushed"
                    value={websiteLink}
                    onChange={e => {
                      setWebsiteLink(e.target.value);
                    }}
                  />
                </Box>
              </Flex>
              <Flex justifyContent="space-between" mt={5}>
                <Box width={'44%'}>
                  <Input
                    placeholder="Address"
                    variant="flushed"
                    value={address}
                    onChange={e => {
                      setAddress(e.target.value);
                    }}
                  />
                </Box>
                <Box width={'44%'}>
                  <Input
                    placeholder="Station related phone number"
                    variant="flushed"
                    value={phoneNumber}
                    onChange={e => {
                      const value = e.target.value;
                      const digitsOnly = value.replace(/\D/g, '');
                      setPhoneNumber(digitsOnly);
                    }}
                  />
                </Box>
              </Flex>
              <Flex justifyContent="space-between" mt={5}>
                <Box width={'44%'}>
                  <Input
                    placeholder="latitude"
                    variant="flushed"
                    value={latitude}
                    onChange={e => {
                      const value = e.target.value;
                      const digitsAndDecimalOnly = value.replace(/[^\d.]/g, '');
                      setLatitude(digitsAndDecimalOnly);
                    }}
                  />
                </Box>
                <Box width={'44%'}>
                  <Input
                    placeholder="longitude"
                    variant="flushed"
                    value={longitude}
                    onChange={e => {
                      const value = e.target.value;
                      const digitsAndDecimalOnly = value.replace(/[^\d.]/g, '');
                      setLongitude(digitsAndDecimalOnly);
                    }}
                  />
                </Box>
              </Flex>
              <Flex justifyContent="space-between" mt={5}>
                <Box width={'44%'}>
                  <Text fontSize={'md'} mb={1}>
                    Opening hours
                  </Text>
                  <Input
                    type="time"
                    value={openingHours}
                    onChange={e => setOpeningHours(e.target.value)}
                  />
                </Box>
                <Box width={'44%'}>
                  <Text fontSize={'md'} mb={1}>
                    Closing hours
                  </Text>
                  <Input
                    type="time"
                    value={closingHours}
                    onChange={e => setClosingHours(e.target.value)}
                  />
                </Box>
              </Flex>
              <Flex mt={6} align="center" justify="center">
                <Text fontSize={'xl'}>Plug info</Text>
              </Flex>
              <Flex justifyContent="space-between" mt={3}>
                <Box width={'44%'}>
                  <Input
                    placeholder="Kw_power"
                    variant="flushed"
                    value={kwPower}
                    onChange={e => {
                      const value = e.target.value;
                      const digitsOnly = value.replace(/\D/g, '');
                      setKwPower(digitsOnly);
                    }}
                  />
                </Box>
                <Box width={'44%'}>
                  <Input
                    placeholder="Cost per kw"
                    variant="flushed"
                    value={costPerKw}
                    onChange={e => {
                      const value = e.target.value;
                      const digitsOnly = value.replace(/[^\d.]/g, '');
                      setCostPerKw(digitsOnly);
                    }}
                  />
                </Box>
              </Flex>
              <Flex justifyContent="space-between" mt={3}>
                <Box width={'44%'}>
                  <Text fontSize={'md'} mb={4} mt={'3rem'} textAlign={'center'}>
                    Select your plug type:
                  </Text>
                  <Select
                    value={BOOKING_TYPES[plug]}
                    onChange={event => {
                      setPlug(event.target.value);
                    }}
                  >
                    {BOOKING_TYPES.map((type, index) => (
                      <option value={type}>{type}</option>
                    ))}
                  </Select>
                </Box>
                <Box ml={5}>
                  <Box
                    mt={10}
                    width="280px"
                    height="200px"
                    overflow="hidden"
                    overflowY="auto"
                    rounded={'lg'}
                    pos={'relative'}
                    boxShadow={'2xl'}
                  >
                    <Image
                      src={
                        image
                          ? base64toFile(image, 'image', 'jpeg')
                          : defaultImage
                      }
                      rounded={'lg'}
                      alt="Staion photo"
                      width="100%"
                      height="100%"
                      objectFit={'cover'}
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      mt={7}
                      w="50%"
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
                      Add Photo
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
              </Flex>
              <Box display="flex" justifyContent="center" />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Box width="100%">
              <Flex justify="center" width="100%" mb={6}>
                <Box>
                  <Button
                    rounded={'xl'}
                    width="150px"
                    colorScheme="blue"
                    mr={3}
                    onClick={() => {
                      addStation(
                        name,
                        websiteLink,
                        address,
                        phoneNumber,
                        openingHours,
                        closingHours,
                        latitude,
                        longitude,
                        kwPower,
                        costPerKw,
                        BOOKING_TYPES.indexOf(plug),
                        image,
                      );
                      setIsAddStationModalOpen(false);
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    rounded={'xl'}
                    width="150px"
                    onClick={() => setIsAddStationModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Flex>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddStationModal;
