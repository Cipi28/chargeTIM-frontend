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
} from '@chakra-ui/react';

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
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [image, setImage] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const defaultImage =
    'https://static.vecteezy.com/system/resources/previews/006/683/801/non_2x/electric-vehicle-sport-car-charging-parking-at-the-charger-station-with-a-plug-in-cable-charging-in-the-top-side-of-car-to-battery-isolated-flat-illustration-on-white-background-vector.jpg';

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleChange = value => {
    setSelectedDays(value);
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
                    placeholder="Website Link"
                    variant="flushed"
                    value={websiteLink}
                    onChange={e => {
                      setWebsiteLink(e.target.value);
                    }}
                  />
                </Box>
              </Flex>
              <Flex justifyContent="space-between" mt={7}>
                <Box width={'44%'}>
                  <Input
                    placeholder="Price RON/h"
                    variant="flushed"
                    value={price}
                    onChange={e => {
                      const value = e.target.value;
                      const digitsOnly = value.replace(/\D/g, '');
                      setPrice(digitsOnly);
                    }}
                  />
                </Box>
                <Box width={'44%'}>
                  <Input
                    placeholder="Phone Number"
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
              <Box width={'100%'} mt={7} mb={5}>
                <Input
                  placeholder="Address"
                  variant="flushed"
                  value={address}
                  onChange={e => {
                    setAddress(e.target.value);
                  }}
                />
              </Box>
              {/*<Text fontSize="md" mb={4} mt={6}>*/}
              {/*  Select Workdays*/}
              {/*</Text>*/}
              {/*<CheckboxGroup*/}
              {/*  colorScheme="green"*/}
              {/*  // value={selectedDays}*/}
              {/*  // onChange={handleChange}*/}
              {/*>*/}
              {/*  <Stack direction="column">*/}
              {/*    <Checkbox value="Monday">Monday</Checkbox>*/}
              {/*    <Checkbox value="Tuesday">Tuesday</Checkbox>*/}
              {/*    <Checkbox value="Wednesday">Wednesday</Checkbox>*/}
              {/*    <Checkbox value="Thursday">Thursday</Checkbox>*/}
              {/*    <Checkbox value="Friday">Friday</Checkbox>*/}
              {/*    <Checkbox value="Saturday">Saturday</Checkbox>*/}
              {/*    <Checkbox value="Sunday">Sunday</Checkbox>*/}
              {/*  </Stack>*/}
              {/*</CheckboxGroup>*/}
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
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addStation(
                  name,
                  websiteLink,
                  price,
                  address,
                  phoneNumber,
                  image,
                  selectedDays,
                );
                setIsAddStationModalOpen(false);
              }}
            >
              Add
            </Button>
            <Button onClick={() => setIsAddStationModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddStationModal;
