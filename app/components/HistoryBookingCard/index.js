import React from 'react';

('use client');

import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { FaCarSide } from 'react-icons/fa';
import { PiChargingStationFill, PiPlugChargingFill } from 'react-icons/pi';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { formatConnectorType } from '../Utils';
import { BOOKING_STATUS_BOOKED } from '../../containers/ActiveBookingsContainer/constants';
import moment from 'moment';
import { BOOKING_STATUS_ENDED } from '../../containers/BookingHistoryContainer/constants';

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

export default function HistoryBookingCard({
  booking,
  status,
  openReviewModal,
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
              status === BOOKING_STATUS_ENDED
                ? useColorModeValue('green.50', 'green.900')
                : useColorModeValue('red.50', 'red.900')
            }
            p={2}
            px={3}
            color={status === BOOKING_STATUS_ENDED ? 'green.500' : 'red.500'}
            rounded={'full'}
          >
            {status === BOOKING_STATUS_ENDED
              ? 'Booking Ended'
              : 'Booking Rejected'}
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
                  Car:
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
                  {formatConnectorType(booking.plug_type)}
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
            {status === BOOKING_STATUS_ENDED && (
              <Button
                isDisabled={booking.is_reviewed}
                mt={10}
                w="full"
                bg={'green.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                onClick={() => openReviewModal(booking)}
                _hover={{
                  bg: 'green.500',
                }}
                _focus={{
                  bg: 'green.500',
                }}
              >
                {booking.is_reviewed ? 'Already reviewed' : 'Leave a review'}
              </Button>
            )}
          </Flex>
        </Box>
      </Box>
    </Center>
  );
}
