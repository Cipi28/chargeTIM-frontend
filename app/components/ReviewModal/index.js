import React, { useState } from 'react';
import moment from 'moment';
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
  Textarea,
  Text,
} from '@chakra-ui/react';
import { MdRateReview } from 'react-icons/md';
import StarRatingDisplay from '../StarRaitingInteracting';
import StarRatingInteracting from '../StarRaitingInteracting';

function ReviewModal({ booking, setIsOpen, saveReview, updateBooking }) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [ratingValue, setRatingValue] = useState(0);
  const [textValue, setTextValue] = useState('');

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
              <Box ml={3}>LEAVE A REVIEW</Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box mt={5}>
              <Text fontSize={'md'} mb={3}>
                Rate this station:
              </Text>
              <StarRatingInteracting
                starSize={30}
                ratingSize={'md'}
                onStarClick={onStarClick}
              />
            </Box>
            <Box mt={10}>
              <Text fontSize={'md'} mb={3}>
                How was your experience?
              </Text>
              <Textarea
                placeholder="Write your review here..."
                height={'9rem'}
                value={textValue}
                onChange={e => setTextValue(e.target.value)}
              />
            </Box>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              rounded={'xl'}
              ml={3}
              width="120px"
              bg={useColorModeValue('#b2d8d8', 'gray.900')}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={() => {
                saveReview({
                  rating: ratingValue,
                  comment: textValue,
                  publishedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                  stationId: booking.station_id,
                  isPublic: false,
                  reviewerPhoto: null,
                  reviewerName: null,
                });
                updateBooking({ ...booking, is_reviewed: true });
                setIsOpen(false);
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

export default ReviewModal;
