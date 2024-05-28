import { Flex, Text } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import React, { useEffect } from 'react';

const StarRatingInteracting = ({ ratingSize, starSize, onStarClick }) => {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);

  return (
    <Flex alignItems="center">
      <Text fontSize={ratingSize} textTransform={'uppercase'} mr={3}>
        {rating}
      </Text>
      <FaStar
        cursor={'pointer'}
        size={starSize}
        transition="color 200ms"
        color={(hoverRating || rating) >= 1 ? 'ffc107' : 'e4e5e9'}
        onClick={() => {
          setRating(1);
          onStarClick(1);
        }}
        onMouseEnter={() => {
          setHoverRating(1);
        }}
        onMouseLeave={() => {
          setHoverRating(0);
        }}
      />
      <FaStar
        cursor={'pointer'}
        size={starSize}
        transition="color 200ms"
        color={(hoverRating || rating) >= 2 ? 'ffc107' : 'e4e5e9'}
        onClick={() => {
          setRating(2);
          onStarClick(2);
        }}
        onMouseEnter={() => {
          setHoverRating(2);
        }}
        onMouseLeave={() => {
          setHoverRating(0);
        }}
      />
      <FaStar
        cursor={'pointer'}
        size={starSize}
        transition="color 200ms"
        color={(hoverRating || rating) >= 3 ? 'ffc107' : 'e4e5e9'}
        onClick={() => {
          setRating(3);
          onStarClick(3);
        }}
        onMouseEnter={() => {
          setHoverRating(3);
        }}
        onMouseLeave={() => {
          setHoverRating(0);
        }}
      />
      <FaStar
        cursor={'pointer'}
        size={starSize}
        transition="color 200ms"
        color={(hoverRating || rating) >= 4 ? 'ffc107' : 'e4e5e9'}
        onClick={() => {
          setRating(4);
          onStarClick(4);
        }}
        onMouseEnter={() => {
          setHoverRating(4);
        }}
        onMouseLeave={() => {
          setHoverRating(0);
        }}
      />
      <FaStar
        cursor={'pointer'}
        size={starSize}
        transition="color 200ms"
        color={(hoverRating || rating) >= 5 ? 'ffc107' : 'e4e5e9'}
        onClick={() => {
          setRating(5);
          onStarClick(5);
        }}
        onMouseEnter={() => {
          setHoverRating(5);
        }}
        onMouseLeave={() => {
          setHoverRating(0);
        }}
      />
    </Flex>
  );
};

export default StarRatingInteracting;
