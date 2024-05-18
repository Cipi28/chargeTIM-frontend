import React, {useState} from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading, Text,
} from '@chakra-ui/react';

function BookingDetailsModal({setIsOpenStationDetails, station}) {


  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={() => {
          setIsOpenStationDetails(false)
        }}
      >
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>EDIT CAR</ModalHeader>
          <ModalCloseButton/>
          <ModalBody pb={6}>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} mb={4}>
              {station.name}
            </Heading>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              Adress: {station.adress}
            </Text>
          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default StationDetailsModal;
