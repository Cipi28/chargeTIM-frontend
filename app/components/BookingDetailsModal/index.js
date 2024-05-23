import React, { useState } from 'react';

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
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { FaCarSide } from 'react-icons/fa';
import { PiChargingStationFill } from 'react-icons/pi';
import { PiPlugChargingFill } from 'react-icons/pi';
import { VscDebugStart } from 'react-icons/vsc';
import { FaStop } from 'react-icons/fa';
import { formatConnectorType } from '../Utils';

function BookingDetailsModal({
  setOpenBookingModal,
  cars,
  stations,
  plugs,
  saveBookingAction,
  selectedCar = null,
  selectedStation = null,
  selectedPlug = null,
}) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [selectedCarId, setSelectedCarId] = useState(
    selectedCar ? selectedCar.id : null,
  );
  const [selectedStationId, setSelectedStationId] = useState(
    selectedStation ? selectedStation.id : null,
  );
  const [selectedPlugId, setSelectedPlugId] = useState(
    selectedPlug ? selectedPlug.id : null,
  );
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={true}
        onClose={() => {
          setOpenBookingModal(false);
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
              placeholder="empty"
              value={selectedCarId}
              onChange={event => {
                setSelectedCarId(parseInt(event.target.value));
              }}
            >
              {cars.map(car => (
                <option value={car.id}>
                  {car.name} - {car.plug_type}
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
              placeholder="empty"
              value={selectedStationId}
              onChange={event => {
                setSelectedStationId(parseInt(event.target.value));
              }}
            >
              {stations.map(station => (
                <option value={station.id}>{station.name}</option>
              ))}
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
              placeholder="empty"
              value={selectedPlugId}
              onChange={event => {
                setSelectedPlugId(parseInt(event.target.value));
              }}
            >
              {plugs &&
                plugs.map(plug => (
                  <option value={plug.id}>
                    {formatConnectorType(plug.type)} - {plug.kw_power} kW
                  </option>
                ))}
            </Select>
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
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              ml={3}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color="white"
              rounded="md"
              onClick={() => {
                saveBookingAction({
                  carId: selectedCarId,
                  stationId: selectedStationId,
                  plugId: selectedPlugId,
                  startDate: selectedStartDate,
                  endDate: selectedEndDate,
                });
              }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Book now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BookingDetailsModal;
