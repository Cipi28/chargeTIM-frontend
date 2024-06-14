import React, { useEffect, useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Text,
  Flex,
  Box,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { FaCarSide } from 'react-icons/fa';
import { PiChargingStationFill } from 'react-icons/pi';
import { PiPlugChargingFill } from 'react-icons/pi';
import { VscDebugStart } from 'react-icons/vsc';
import { FaStop } from 'react-icons/fa';
import { BOOKING_TYPES } from '../../containers/HomepageContainer/constants';
import { isEmpty, isNil } from 'lodash';

function getFormattedDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
}

function transformDate(inputDate) {
  // Split the date and time parts
  const [datePart, timePart] = inputDate.split(' ');

  // Split the date into year, month, and day
  const [year, month, day] = datePart.split('-');

  // Format the date as MM/DD/YYYY
  const formattedDate = `${month}/${day}/${year}`;

  // Combine the formatted date with the time part
  const result = `${formattedDate} ${timePart.slice(0, 5)}`;

  return result;
}

function BookingDetailsModal({
  setOpenBookingModal,
  cars,
  stations,
  plugs,
  verifyBookingAction,
  saveBookingAction,
  selectedCar = null,
  selectedStation = null,
  selectedPlug = null,
  userId,
  onChangeCar,
  onChangeStation,
  conflictBookings,
  isCurrentBookingVerified,
  setConflictBookings,
  setBookingVerified,
  isBookingSaved,
  setBookingSaved,
}) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [selectedCarId, setSelectedCarId] = useState(
    selectedCar ? selectedCar.id : !isEmpty(cars) ? cars[0].id : null,
  );
  const [selectedStationId, setSelectedStationId] = useState(
    selectedStation
      ? selectedStation.id
      : !isEmpty(stations)
      ? stations[0].id
      : null,
  );
  const [selectedPlugId, setSelectedPlugId] = useState(
    selectedPlug ? selectedPlug.id : !isEmpty(plugs) ? plugs[0].id : null,
  );
  const [selectedStartDate, setSelectedStartDate] = useState(
    getFormattedDate(),
  );
  const [selectedEndDate, setSelectedEndDate] = useState(getFormattedDate());

  const [dateErrorMessage, setDateErrorMessage] = useState(null);
  const [plugErrorMessage, setPlugErrorMessage] = useState(null);
  const [verifyErrorMessage, setVerifyErrorMessage] = useState(null);
  const [allowBooking, setAllowBooking] = useState(false);
  const [successfulValidationMess, setSuccessfulValidationMess] = useState(
    null,
  );
  const [successfulSavedMess, setSuccessfulSavedMess] = useState(null);

  useEffect(() => {
    if (isCurrentBookingVerified) {
      setAllowBooking(true);
      setSuccessfulValidationMess('Booking slot is available!');
    }
  }, [isCurrentBookingVerified]);

  useEffect(() => {
    if (isBookingSaved) {
      setSuccessfulSavedMess('Booking was successfully saved!');
    }
  }, [isBookingSaved]);

  useEffect(() => {
    setSelectedPlugId(
      selectedPlug ? selectedPlug.id : !isEmpty(plugs) ? plugs[0].id : null,
    );
  }, [plugs]);

  useEffect(() => {
    setSelectedCarId(
      selectedCar ? selectedCar.id : !isEmpty(cars) ? cars[0].id : null,
    );
  }, [cars]);

  useEffect(() => {
    if (!isEmpty(conflictBookings)) {
      const message = `Your booking is overlapping with the following bookings: ${conflictBookings
        ?.map(
          (booking, index) =>
            `${index === 0 ? '\n' : ''}Booking ${index +
              1}: from ${transformDate(booking.start_time)} to ${transformDate(
              booking.end_time,
            )}`,
        )
        .join('\n')}`;

      const style = { whiteSpace: 'pre-wrap' };
      const formattedMessage = <div style={style}>{message}</div>;

      setVerifyErrorMessage(formattedMessage);
    }
  }, [conflictBookings]);

  useEffect(() => {
    setSelectedPlugId(
      selectedPlug ? selectedPlug.id : !isEmpty(plugs) ? plugs[0].id : null,
    );
  }, [plugs]);

  const getStatusByStation = stationId => {
    const station = stations.find(station => station.id === stationId);
    if (station.is_public) {
      return 0; //active
    } else {
      return 3; //pending
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={() => {
          setDateErrorMessage(null);
          setPlugErrorMessage(null);
          setVerifyErrorMessage(null);
          setOpenBookingModal(false);
          setConflictBookings([]);
          setBookingVerified(false);
          setSuccessfulValidationMess(null);
          setSuccessfulSavedMess(null);
          setBookingSaved(false);
        }}
      >
        <ModalOverlay />
        <ModalContent maxWidth="700px" width="70%">
          <ModalHeader>MAKE A BOOKING</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex alignItems="center" mb={2}>
              <Box mr={3} mt={3}>
                <FaCarSide size={25} />
              </Box>
              <Text fontSize={'xl'} mt={3}>
                Select a car
              </Text>
            </Flex>
            <Select
              value={selectedCarId}
              onChange={event => {
                onChangeCar(event.target.value, selectedStationId);
                setSelectedCarId(parseInt(event.target.value));
              }}
            >
              {cars.map(car => (
                <option value={car.id}>
                  {car.name} - {BOOKING_TYPES[car.plug_type]}
                </option>
              ))}
            </Select>
            <Flex alignItems="center" mb={2}>
              <Box mr={3} mt={3}>
                <PiChargingStationFill size={25} />
              </Box>
              <Text fontSize={'xl'} mt={3}>
                Select a station
              </Text>
            </Flex>
            <Select
              value={selectedStationId}
              onChange={event => {
                onChangeStation(selectedCarId, event.target.value);
                setSelectedStationId(parseInt(event.target.value));
              }}
            >
              {stations.map(station => {
                const displayValue = !isEmpty(station.plug_types)
                  ? `${station.name} - ${station.plug_types?.map(
                      plugType => BOOKING_TYPES[plugType],
                    )}`
                  : `${station.name} - no plugs currently available`;
                return <option value={station.id}>{displayValue}</option>;
              })}
            </Select>
            <Flex alignItems="center" mb={2}>
              <Box mr={3} mt={3}>
                <PiPlugChargingFill size={25} />
              </Box>
              <Text fontSize={'xl'} mt={3}>
                Select a plug
              </Text>
            </Flex>
            <Select
              placeholder={isEmpty(plugs) && 'No plugs available'}
              value={selectedPlugId}
              onChange={event => {
                setSelectedPlugId(parseInt(event.target.value));
              }}
            >
              {plugs &&
                plugs.map(plug => (
                  <option value={plug.id}>
                    {BOOKING_TYPES[plug.type]} - {plug.kw_power} kW
                  </option>
                ))}
            </Select>
            <Flex justifyContent="space-between" mt={4}>
              <Box width={'44%'}>
                <Flex alignItems="center" mb={2}>
                  <Box mr={3} mt={3}>
                    <VscDebugStart size={25} />
                  </Box>
                  <Text fontSize={'xl'} mt={3}>
                    Select a start time
                  </Text>
                </Flex>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  value={selectedStartDate}
                  onChange={event => {
                    setSelectedStartDate(event.target.value);
                  }}
                />
              </Box>
              <Box width={'44%'}>
                <Flex alignItems="center" mb={2}>
                  <Box mr={3} mt={3}>
                    <FaStop size={25} />
                  </Box>
                  <Text fontSize={'xl'} mt={3}>
                    Select a stop time
                  </Text>
                </Flex>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="datetime-local"
                  value={selectedEndDate}
                  onChange={event => {
                    setSelectedEndDate(event.target.value);
                  }}
                />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Box width="100%">
              <Flex justify="center" width="100%" mb={2}>
                <Box mb={4}>
                  <Button
                    mr={8}
                    rounded={'xl'}
                    width="150px"
                    colorScheme="green"
                    onClick={() => {
                      const date1 = new Date(selectedStartDate);
                      const date2 = new Date(selectedEndDate);

                      let dateMessage = null;
                      let plugMessage = null;

                      if (date2 <= date1) {
                        dateMessage =
                          'The stop time must be after the start time!';
                        setDateErrorMessage(dateMessage);
                      } else {
                        setDateErrorMessage(null);
                      }

                      if (isNil(selectedPlugId)) {
                        plugMessage = 'A plug must be selected!';
                        setPlugErrorMessage(plugMessage);
                      } else {
                        setPlugErrorMessage(null);
                      }

                      if (isNil(dateMessage) && isNil(plugMessage)) {
                        setVerifyErrorMessage(null);
                        setConflictBookings([]);
                        setBookingVerified(false);
                        setAllowBooking(false);
                        setSuccessfulValidationMess(null);
                        setSuccessfulSavedMess(null);
                        setBookingSaved(false);
                        verifyBookingAction({
                          carId: selectedCarId,
                          stationId: selectedStationId,
                          plugId: selectedPlugId,
                          startDate: selectedStartDate,
                          endDate: selectedEndDate,
                          userId: userId,
                          status: 0,
                        });
                      }
                    }}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Verify disponibility
                  </Button>
                  <Button
                    isDisabled={!allowBooking}
                    colorScheme="teal"
                    rounded={'xl'}
                    width="150px"
                    onClick={() => {
                      const date1 = new Date(selectedStartDate);
                      const date2 = new Date(selectedEndDate);

                      let dateMessage = null;
                      let plugMessage = null;

                      if (date2 <= date1) {
                        dateMessage =
                          'The stop time must be after the start time!';
                        setDateErrorMessage(dateMessage);
                      } else {
                        setDateErrorMessage(null);
                      }

                      if (isNil(selectedPlugId)) {
                        plugMessage = 'A plug must be selected!';
                        setPlugErrorMessage(plugMessage);
                      } else {
                        setPlugErrorMessage(null);
                      }

                      if (isNil(dateMessage) && isNil(plugMessage)) {
                        setDateErrorMessage(null);
                        setPlugErrorMessage(null);
                        setVerifyErrorMessage(null);
                        setBookingVerified(false);
                        setSuccessfulValidationMess(null);
                        setSuccessfulSavedMess(null);
                        setAllowBooking(false);
                        setBookingSaved(false);

                        saveBookingAction({
                          carId: selectedCarId,
                          stationId: selectedStationId,
                          plugId: selectedPlugId,
                          startDate: selectedStartDate,
                          endDate: selectedEndDate,
                          userId: userId,
                          status: getStatusByStation(selectedStationId),
                        });
                      }
                    }}
                  >
                    Book
                  </Button>
                </Box>
              </Flex>
              <Flex justify="center" width="100%">
                <Text fontSize={'md'} mb={6}>
                  Verify plug availability before booking
                </Text>
              </Flex>

              {!isEmpty(dateErrorMessage) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{dateErrorMessage}</AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setDateErrorMessage(null)}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(plugErrorMessage) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{plugErrorMessage}</AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setPlugErrorMessage(null)}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(verifyErrorMessage) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="error">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>
                          {verifyErrorMessage}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setVerifyErrorMessage(null)}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(successfulValidationMess) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="success">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                          {successfulValidationMess}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setSuccessfulValidationMess(null)}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
              {!isEmpty(successfulSavedMess) && (
                <Flex justify="center" align="center" mt={7} mx={8} my={4}>
                  <Box width="100%">
                    <Alert status="success">
                      <AlertIcon />
                      <Box flex="1">
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                          {successfulSavedMess}
                        </AlertDescription>
                      </Box>
                      <CloseButton
                        alignSelf="flex-start"
                        position="relative"
                        right={-1}
                        top={-1}
                        onClick={() => setSuccessfulSavedMess(null)}
                      />
                    </Alert>
                  </Box>
                </Flex>
              )}
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BookingDetailsModal;
