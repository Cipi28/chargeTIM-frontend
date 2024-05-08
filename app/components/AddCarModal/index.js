import React, { useState } from 'react';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}
function AddCarModal({ isOpen, onClose, addCar }) {


  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [carName, setCarName] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [carPlug, setCarPlug] = useState('');
  const [carImage, setCarImage] = useState('');



  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      const base64Data = base64.split(",")[1];
      setCarImage(base64Data);
    }
  };

  return (
    <>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADD A CAR</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Car Name</FormLabel>
              <Input
                placeholder='Car Name'
                value={carName}
                onChange={(event) => setCarName(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Car Plate</FormLabel>
              <Input
                placeholder='Car Plate'
                value={carPlate}
                onChange={(event) => setCarPlate(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Car Plug</FormLabel>
              <Input
                placeholder='Car plug'
                value={carPlug}
                onChange={(event) => setCarPlug(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Car Image</FormLabel>
              <input
                type="file"
                accept=".jpeg, .png, .jpg"
                placeholder='Car plug'
                onChange={handleFileRead}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => {
                addCar(
                  carName,
                  carPlate,
                  carPlug,
                  carImage,
                );
                onClose();
              }}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCarModal;
