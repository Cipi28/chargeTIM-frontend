import React from 'react';

('use client');

import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  Button,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { FaCarSide } from 'react-icons/fa';
import { PiChargingStationFill, PiPlugChargingFill } from 'react-icons/pi';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import {
  BOOKING_STATUS_ACTIVE,
  BOOKING_STATUS_ENDED,
  BOOKING_STATUS_PENDING,
  BOOKING_STATUS_REJECTED,
} from '../../containers/ActiveBookingsContainer/constants';
import moment from 'moment';
import { BOOKING_STATUS } from '../../containers/BookingHistoryContainer/constants';
import { BOOKING_TYPES } from '../../containers/HomepageContainer/constants';
import StarRatingDisplay from '../StarRatingDisplay';

function calculateDuration(date1, date2) {
  // Parse the dates using moment
  const momentDate1 = moment(date1, 'YYYY-MM-DD HH:mm:ss');
  const momentDate2 = moment(date2, 'YYYY-MM-DD HH:mm:ss');

  // Calculate the duration in milliseconds
  const duration = moment.duration(momentDate2.diff(momentDate1));

  // Calculate the total hours, minutes, and seconds
  const totalHours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  // Construct the duration string
  const durationString = `${totalHours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return durationString;
}

export default function ContributorBookingCard({
  booking,
  status,
  updateBookingRequestStatus = null,
  openRateModal = null,
}) {
  return (
    <Center py={6}>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}
        >
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={
              status === BOOKING_STATUS_REJECTED
                ? useColorModeValue('red.50', 'red.900')
                : useColorModeValue('green.50', 'green.900')
            }
            p={2}
            px={3}
            color={status === BOOKING_STATUS_REJECTED ? 'red.500' : 'green.500'}
            rounded={'full'}
          >
            {BOOKING_STATUS[status]}
          </Text>
        </Stack>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              <Flex alignItems="center" mb={2}>
                <Box mr={3} mt={3}>
                  <FaCarSide size={25} />
                </Box>
                <Text fontSize={'md'} mt={3}>
                  User name:
                </Text>
                <Text fontSize={'md'} mt={3} ml="auto" mr={5}>
                  {booking.user_info.name}
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center" mb={2}>
                <Box mr={3} mt={3}>
                  <FaCarSide size={25} />
                </Box>
                <Text fontSize={'md'} mt={3}>
                  User email:
                </Text>
                <Text fontSize={'md'} mt={3} ml="auto" mr={5}>
                  {booking.user_info.email}
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center" mb={2}>
                <Box mr={3} mt={3}>
                  <FaCarSide size={25} />
                </Box>
                <Text fontSize={'md'} mt={3}>
                  User rating:
                </Text>
                <Box mt={3} ml="auto" mr={5}>
                  <StarRatingDisplay
                    rating={booking.user_info.personal_rating}
                    starSize={20}
                    ratingSize={'sm'}
                  />
                </Box>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center" mb={2}>
                <Box mr={3} mt={3}>
                  <FaCarSide size={25} />
                </Box>
                <Text fontSize={'md'} mt={3}>
                  User Car:
                </Text>
                <Text fontSize={'md'} mt={3} ml="auto" mr={5}>
                  {booking.car_name}
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center" mb={2}>
                <Box mr={3} mt={3}>
                  <PiChargingStationFill size={25} />
                </Box>
                <Text fontSize={'md'} mt={3}>
                  Station:
                </Text>
                <Text fontSize={'md'} mt={3} ml="auto" mr={5}>
                  {booking.station_name}
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center" mb={2}>
                <Box mr={3} mt={3}>
                  <PiPlugChargingFill size={25} />
                </Box>
                <Text fontSize={'md'} mt={3}>
                  Plug:
                </Text>
                <Text fontSize={'md'} mt={3} ml="auto" mr={5}>
                  {BOOKING_TYPES[booking.plug_type]}
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center" mb={2}>
                <Box mr={3} mt={3}>
                  <FaCalendarAlt size={22} />
                </Box>
                <Text fontSize={'md'} mt={3}>
                  Date:
                </Text>
                <Text fontSize={'md'} mt={3} ml="auto" mr={5}>
                  {booking.start_time}
                </Text>
              </Flex>
            </ListItem>
            <ListItem>
              <Flex alignItems="center" mb={2}>
                <Box mr={3} mt={3}>
                  <MdOutlineAccessTimeFilled size={23} />
                </Box>
                <Text fontSize={'md'} mt={3}>
                  Duration:
                </Text>
                <Text fontSize={'md'} mt={3} ml="auto" mr={5}>
                  {calculateDuration(booking.start_time, booking.end_time)}
                </Text>
              </Flex>
            </ListItem>
          </List>
          <Flex w="full" justifyContent="space-between">
            {status === BOOKING_STATUS_PENDING && (
              <>
                <Button
                  mt={10}
                  w="47%"
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
                  onClick={() => {
                    updateBookingRequestStatus(booking, BOOKING_STATUS_ACTIVE);
                  }}
                >
                  Accept
                </Button>
                <Button
                  mt={10}
                  w={'47%'}
                  bg={'red.400'}
                  color={'white'}
                  rounded={'xl'}
                  boxShadow={'0 5px 20px 0px rgba(139, 0, 0, 0.43)'}
                  _hover={{
                    bg: 'red.500',
                  }}
                  _focus={{
                    bg: 'red.500',
                  }}
                  onClick={() => {
                    updateBookingRequestStatus(
                      booking,
                      BOOKING_STATUS_REJECTED,
                    );
                  }}
                >
                  Reject
                </Button>
              </>
            )}
            {status === BOOKING_STATUS_ENDED && (
              <>
                <Button
                  isDisabled={booking.is_user_rated}
                  mt={10}
                  w="full"
                  bg={useColorModeValue('#b2d8d8', 'gray.900')}
                  rounded={'xl'}
                  boxShadow={'0 5px 10px 0px #4b907d'}
                  _hover={{
                    bg: '#4b907d',
                  }}
                  onClick={() => {
                    openRateModal(booking);
                  }}
                >
                  {booking.is_user_rated ? 'Already rated' : 'Rate user'}
                </Button>
              </>
            )}
          </Flex>
        </Box>
      </Box>
    </Center>
  );
}
