import { Flex, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import React from 'react';

const StarRatingDisplay = ({ rating, ratingSize, starSize }) => {
  return (
    <Flex alignItems="center">
      <Text fontSize={ratingSize} textTransform={'uppercase'} mr={3}>
        {rating}
      </Text>
      <FaStar
        cursor={'pointer'}
        size={starSize}
        transition="color 200ms"
        color={rating >= 1 ? 'ffc107' : 'e4e5e9'}
      />
      <FaStar
        cursor={'pointer'}
        size={starSize}
        transition="color 200ms"
        color={rating >= 2 ? 'ffc107' : 'e4e5e9'}
      />
      <FaStar
        cursor={'pointer'}
        size={starSize}
        transition="color 200ms"
        color={rating >= 3 ? 'ffc107' : 'e4e5e9'}
      />
      <FaStar
        cursor={'pointer'}
        size={starSize}
        transition="color 200ms"
        color={rating >= 4 ? 'ffc107' : 'e4e5e9'}
      />
      <FaStar
        cursor={'pointer'}
        size={starSize}
        transition="color 200ms"
        color={rating >= 5 ? 'ffc107' : 'e4e5e9'}
      />
    </Flex>
  );
};

export default StarRatingDisplay;
