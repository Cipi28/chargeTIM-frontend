import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  Button,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';
import { MdRateReview } from 'react-icons/md';
import StarRatingInteracting from '../StarRaitingInteracting';

function RateModal({ booking, setIsOpen, rateUser }) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [ratingValue, setRatingValue] = useState(0);

  const onStarClick = rating => {
    setRatingValue(rating);
  };
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent maxWidth="700px" width="70%">
          <ModalHeader>
            <Flex alignItems="center">
              <MdRateReview size={30} mt={8} />
              <Box ml={3}>LEAVE A RATING TO THE USER</Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex alignItems="center" justifyContent="center">
              <Box mt={5}>
                <Text fontSize={'md'} mb={3}>
                  Rate how the user behave with your station:
                </Text>
                <Flex alignItems="center" justifyContent="center">
                  <StarRatingInteracting
                    starSize={30}
                    ratingSize={'md'}
                    onStarClick={onStarClick}
                  />
                </Flex>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              ml={3}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color="white"
              rounded="md"
              onClick={() => {
                rateUser(ratingValue, booking.user_info.id, booking.id);
                setIsOpen(false);
              }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RateModal;