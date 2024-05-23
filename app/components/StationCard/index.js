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

export default function StationCard({
  index,
  id,
  name,
  adress,
  image,
  openStationDetails,
  handleBookButton,
}) {
  const defaultImage =
    'https://static.vecteezy.com/system/resources/previews/006/683/801/non_2x/electric-vehicle-sport-car-charging-parking-at-the-charger-station-with-a-plug-in-cable-charging-in-the-top-side-of-car-to-battery-isolated-flat-illustration-on-white-background-vector.jpg';

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
            backgroundImage: `url(${defaultImage})`,
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
            src={image ? image : defaultImage}
            alt="#"
          />
        </Box>
        <Stack pt={7} align={'center'}>
          <Text
            color={'gray.500'}
            fontSize={'sm'}
            textTransform={'uppercase'}
            textAlign="center"
          >
            Adress: {adress}
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
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={() => openStationDetails(index)}
            >
              Details
            </Button>
            <Button
              mt={4}
              ml={3}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              onClick={() => handleBookButton()}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Book now
            </Button>
          </div>
        </Stack>
      </Box>
    </Center>
  );
}
