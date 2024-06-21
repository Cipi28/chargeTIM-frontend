import React, { useEffect, useRef, useState } from 'react';

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
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { BOOKING_TYPES } from '../../containers/HomepageContainer/constants';
import AddLocationFromMap from '../AddLocationFromMap';
import { isEmpty } from 'lodash';

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

function AddStationModal({
  setIsAddStationModalOpen,
  addStation,
  errors,
  clearAddStationError,
  addedStationSuccess,
}) {
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

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const defaultImage =
    'https://static.vecteezy.com/system/resources/previews/025/406/327/original/electric-charging-station-dual-head-electric-vehicle-charging-stations-illustrations-vector.jpg';

  const fileInputRef = useRef(null);

  const [errorMessages, setErrorMessages] = useState([]);
  const [nameMessages, setNameMessages] = useState([]);
  const [websiteLinkMessages, setWebsiteLinkMessages] = useState([]);
  const [addressMessages, setAddressMessages] = useState([]);
  const [latitudeMessages, setLatitudeMessages] = useState([]);
  const [longitudeMessages, setLongitudeMessages] = useState([]);
  const [openPeriodMessages, setOpenPeriodMessages] = useState([]);
  const [kwPowerMessages, setKwPowerMessages] = useState([]);
  const [costPerKwMessages, setCostPerKwMessages] = useState([]);
  const [phoneNumberMessages, setPhoneNumberMessages] = useState([]);

  useEffect(() => {
    setErrorMessages(!isEmpty(errors?.error) ? errors?.error : []);
    setNameMessages(!isEmpty(errors?.name) ? errors?.name : []);
    setWebsiteLinkMessages(
      !isEmpty(errors?.websiteLink) ? errors?.websiteLink : [],
    );
    setAddressMessages(!isEmpty(errors?.address) ? errors?.address : []);
    setLatitudeMessages(!isEmpty(errors?.latitude) ? errors?.latitude : []);
    setLongitudeMessages(!isEmpty(errors?.longitude) ? errors?.longitude : []);
    setOpenPeriodMessages(
      !isEmpty(errors?.openPeriod) ? errors?.openPeriod : [],
    );
    setKwPowerMessages(!isEmpty(errors?.kw_power) ? errors?.kw_power : []);
    setCostPerKwMessages(
      !isEmpty(errors?.cost_per_kw) ? errors?.cost_per_kw : [],
    );
    setPhoneNumberMessages(
      !isEmpty(errors?.phone_number) ? errors?.phone_number : [],
    );
  }, [errors]);

  useEffect(() => {
    if (addedStationSuccess) {
      setIsAddStationModalOpen(false);
    }
  }, [addedStationSuccess]);

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

  const saveCoordinates = coordinates => {
    setLatitude(coordinates.lat);
    setLongitude(coordinates.lng);
  };

  return (
    <>
      <Modal
        size="2xl"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={() => {
          setErrorMessages([]);
          setNameMessages([]);
          setWebsiteLinkMessages([]);
          setAddressMessages([]);
          setLatitudeMessages([]);
          setLongitudeMessages([]);
          setOpenPeriodMessages([]);
          setKwPowerMessages([]);
          setCostPerKwMessages([]);
          setPhoneNumberMessages([]);
          setIsAddStationModalOpen(false);
          clearAddStationError();
        }}
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
                <Box width={'100%'} display="flex" justifyContent="center">
                  <Button
                    w="50%"
                    bg={useColorModeValue('#317873', 'gray.900')}
                    color={'white'}
                    rounded={'xl'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    onClick={() => setIsMapModalOpen(true)}
                  >
                    Set location from map
                  </Button>
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
              <Flex mt={8} align="center" justify="center">
                <Text fontSize={'xl'}>Plug info</Text>
              </Flex>
              <Flex justifyContent="space-between" mt={1}>
                <Box width={'44%'}>
                  <Box mb={5} mt={5}>
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
                  <Box mb={5}>
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
                  <Box>
                    <Text fontSize={'md'} mb={4} textAlign={'center'}>
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
                </Box>
                <Box ml={5}>
                  <Box
                    mt={6}
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
                      bg={useColorModeValue('#317873', 'gray.900')}
                      color={'white'}
                      rounded={'xl'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
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
              {isMapModalOpen && (
                <AddLocationFromMap
                  setIsMapModalOpen={setIsMapModalOpen}
                  saveCoordinates={saveCoordinates}
                />
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Box width="100%">
              <Flex justify="center" width="100%" mb={6}>
                <Box>
                  <Button
                    rounded={'xl'}
                    bg={useColorModeValue('#b2d8d8', 'gray.900')}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    width="150px"
                    mr={3}
                    onClick={() => {
                      setErrorMessages([]);
                      setNameMessages([]);
                      setWebsiteLinkMessages([]);
                      setAddressMessages([]);
                      setLatitudeMessages([]);
                      setLongitudeMessages([]);
                      setOpenPeriodMessages([]);
                      setKwPowerMessages([]);
                      setCostPerKwMessages([]);
                      setPhoneNumberMessages([]);

                      //verify that closing hours is greater than opening hours
                      if (closingHours <= openingHours) {
                        setOpenPeriodMessages([
                          'Closing hours should be greater than opening hours',
                        ]);
                        return;
                      }

                      addStation(
                        name === '' ? null : name,
                        websiteLink === '' ? null : websiteLink,
                        address === '' ? null : address,
                        phoneNumber === '' ? null : phoneNumber,
                        openingHours === '' ? null : openingHours,
                        closingHours === '' ? null : closingHours,
                        latitude === '' ? null : latitude,
                        longitude === '' ? null : longitude,
                        kwPower === '' ? null : kwPower,
                        costPerKw === '' ? null : costPerKw,
                        BOOKING_TYPES.indexOf(plug),
                        image,
                      );
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    bg={useColorModeValue('#FFFFFF', 'gray.900')}
                    variant="outline"
                    rounded={'xl'}
                    width="150px"
                    onClick={() => {
                      setErrorMessages([]);
                      setNameMessages([]);
                      setWebsiteLinkMessages([]);
                      setAddressMessages([]);
                      setLatitudeMessages([]);
                      setLongitudeMessages([]);
                      setOpenPeriodMessages([]);
                      setKwPowerMessages([]);
                      setCostPerKwMessages([]);
                      setPhoneNumberMessages([]);
                      clearAddStationError();
                      setIsAddStationModalOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Flex>
              {!isEmpty(errorMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{errorMessages[0]}</AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setErrorMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(nameMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{nameMessages[0]}</AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setNameMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(websiteLinkMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                          {websiteLinkMessages[0]}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setWebsiteLinkMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(addressMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                          {addressMessages[0]}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setAddressMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(latitudeMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                          {latitudeMessages[0]}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setLatitudeMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(longitudeMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                          {longitudeMessages[0]}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setLongitudeMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(openPeriodMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                          {openPeriodMessages[0]}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setOpenPeriodMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(kwPowerMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                          {kwPowerMessages[0]}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setKwPowerMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(costPerKwMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                          {costPerKwMessages[0]}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setCostPerKwMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(phoneNumberMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                          {phoneNumberMessages[0]}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setPhoneNumberMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddStationModal;
