import React, { useEffect, useRef, useState } from 'react';
// import convertBase64 from '../../components/Utils';

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
  Text,
  Select,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { BOOKING_TYPES } from '../../containers/HomepageContainer/constants';
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

function CarDetailsModal({
  setIsOpenEdit,
  selectedCar,
  deleteCar,
  updateCar,
  errors,
  successUpdateCar,
  deleteErrors,
}) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [carName, setCarName] = useState(selectedCar.name);
  const [carPlate, setCarPlate] = useState(selectedCar.plate);
  const [carPlug, setCarPlug] = useState(selectedCar.plug_type);
  const [selectedPug, setSelectedPlug] = useState(
    BOOKING_TYPES[selectedCar.plug_type],
  );
  const [carImage, setCarImage] = useState(selectedCar.image);
  const [errorMessages, setErrorMessages] = useState([]);
  const [nameMessages, setNameMessages] = useState([]);
  const [plateMessages, setPlateMessages] = useState([]);

  const fileInputRef = useRef(null);
  const defaultImage =
    'https://media.istockphoto.com/id/1406257864/vector/electric-car-ev-charge-station-vector-concept-electric-vehicle-charger-energy-background.jpg?s=612x612&w=0&k=20&c=bsjslHp7mE8s2l9eel9eG9fZr5epx65h9U6dfyhdSLs=';

  useEffect(() => {
    setErrorMessages(!isEmpty(errors?.error) ? errors?.error : []);
    setPlateMessages(!isEmpty(errors?.plate) ? errors?.plate : []);
    setNameMessages(!isEmpty(errors?.name) ? errors?.name : []);
  }, [errors]);

  useEffect(() => {
    if (successUpdateCar) {
      setIsOpenEdit(false);
    }
  }, [successUpdateCar]);

  const handleFileRead = async event => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      const base64Data = base64.split(',')[1];
      setCarImage(base64Data);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Modal
        size="2xl"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={() => {
          console.log('onClose2');
          setPlateMessages([]);
          setNameMessages([]);
          setErrorMessages([]);
          deleteErrors();
          setIsOpenEdit(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EDIT CAR</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box mx={10} my={6}>
              <Flex justifyContent="space-between">
                <Box width={'44%'}>
                  <Input
                    placeholder="Car Name"
                    variant="flushed"
                    value={carName}
                    onChange={e => {
                      const value = e.target.value.toUpperCase();

                      if (value.length < 25) {
                        setCarName(e.target.value);
                      }
                    }}
                  />
                </Box>
                <Box width={'44%'}>
                  <Input
                    placeholder="Car Plate"
                    variant="flushed"
                    value={carPlate}
                    onChange={e => {
                      const value = e.target.value.toUpperCase();

                      // Extract parts of the input
                      const firstPart = value
                        .substring(0, 2)
                        .replace(/[^A-Z]/g, ''); // First 2 letters
                      const middlePart = value
                        .substring(2, 5)
                        .replace(/[^0-9]/g, ''); // Next 2 digits
                      const lastPart = value
                        .substring(5, 9)
                        .replace(/[^A-Z]/g, ''); // Last 3 letters

                      // Combine parts with spaces
                      let formattedValue = firstPart;
                      if (middlePart.length > 0) {
                        formattedValue += ' ' + middlePart;
                      }
                      if (lastPart.length > 0) {
                        formattedValue += ' ' + lastPart;
                      }

                      // Limit to the pattern MN 12 ABC
                      if (formattedValue.length > 9) {
                        formattedValue = formattedValue.substring(0, 9);
                      }

                      setCarPlate(formattedValue);
                    }}
                  />
                </Box>
              </Flex>
              <Box my={10}>
                <Text fontSize={'md'} mt={3} mb={5} textAlign={'center'}>
                  Select your plug type:
                </Text>
                <Select
                  value={selectedPug}
                  onChange={event => {
                    setSelectedPlug(event.target.value);
                  }}
                >
                  {BOOKING_TYPES.map((type, index) => (
                    <option value={type}>{type}</option>
                  ))}
                </Select>
              </Box>
              <Box display="flex" justifyContent="center">
                <Box>
                  <Box
                    mt={10}
                    width="300px"
                    height="200px"
                    overflow="hidden"
                    overflowY="auto"
                    rounded={'lg'}
                    pos={'relative'}
                    boxShadow={'2xl'}
                  >
                    <Image
                      src={
                        carImage
                          ? base64toFile(carImage, 'image', 'jpeg')
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
                      boxShadow={'lg'}
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
              </Box>
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
                      if (carPlate.length < 9) {
                        setPlateMessages([
                          'Plate number must have the format AB 12 ABC',
                        ]);
                      } else {
                        setPlateMessages([]);
                        setNameMessages([]);
                        setErrorMessages([]);
                        deleteErrors();
                        updateCar(
                          selectedCar.id,
                          carName,
                          carPlate,
                          BOOKING_TYPES.indexOf(selectedPug),
                          carImage,
                        );
                      }
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    ml={3}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    bg={useColorModeValue('#FFFFFF', 'gray.900')}
                    variant="outline"
                    rounded={'xl'}
                    width="150px"
                    onClick={() => {
                      setIsOpenEdit(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Flex>
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
              {!isEmpty(plateMessages) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{plateMessages[0]}</AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setPlateMessages([])}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
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
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CarDetailsModal;
