import React from 'react';

('use client');

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react';
import { BOOKING_TYPES } from '../../containers/HomepageContainer/constants';

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

export default function CarCard({
  index,
  id,
  plate,
  plugType,
  image,
  name,
  openCarDetails,
  deleteCar,
}) {
  const defaultImage =
    'https://media.istockphoto.com/id/1406257864/vector/electric-car-ev-charge-station-vector-concept-electric-vehicle-charger-energy-background.jpg?s=612x612&w=0&k=20&c=bsjslHp7mE8s2l9eel9eG9fZr5epx65h9U6dfyhdSLs=';

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${
              image ? base64toFile(image, 'image', 'jpeg') : defaultImage
            })`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={image ? base64toFile(image, 'image', 'jpeg') : defaultImage}
            alt="#"
          />
        </Box>
        <Stack pt={7} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Plug Type: {BOOKING_TYPES[plugType]}
          </Text>
          <Text color={'gray.500'} fontSize={'md'} textTransform={'uppercase'}>
            Plate: {plate}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {name}
          </Heading>
          <div>
            <Button
              mt={4}
              mr={3}
              bg={useColorModeValue('#FFFFFF', 'gray.900')}
              variant="outline"
              rounded={'xl'}
              width="120px"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={() => {
                openCarDetails(index);
              }}
            >
              Details
            </Button>
            <Button
              // w={'full'}
              mt={4}
              ml={3}
              rounded={'xl'}
              width="120px"
              bg={useColorModeValue('#b2d8d8', 'gray.900')}
              onClick={() => {
                deleteCar(id);
              }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Delete
            </Button>
          </div>
        </Stack>
      </Box>
    </Center>
  );
}
