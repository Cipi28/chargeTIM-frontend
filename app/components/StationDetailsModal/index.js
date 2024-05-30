import React from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa';
import { IoGlobeOutline, IoLocationOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import { IoMdPerson } from 'react-icons/io';
import { TbRecharging } from 'react-icons/tb';
import { isEmpty } from 'lodash';
import StarRatingDisplay from '../StarRatingDisplay';
import moment from 'moment';
import { formatConnectorType } from '../Utils';

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

function StationDetailsModal({
  setOpenStationDetailsModal,
  station,
  plugs,
  reviews,
  handleBookButton,
  role,
}) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const defaultImage =
    'https://static.vecteezy.com/system/resources/previews/006/683/801/non_2x/electric-vehicle-sport-car-charging-parking-at-the-charger-station-with-a-plug-in-cable-charging-in-the-top-side-of-car-to-battery-isolated-flat-illustration-on-white-background-vector.jpg';

  const isStationOpen = open_period => {
    const currentHour = moment();
    const closeHourMoment = moment(
      `${open_period.close.hour}:${open_period.close.minute}`,
      'HH:mm',
    );
    const openHourMoment = moment(
      `${open_period.open.hour}:${open_period.open.minute}`,
      'HH:mm',
    );
    return moment(currentHour, 'HH:mm').isBetween(
      openHourMoment, // open
      closeHourMoment, // close
    );
  };

  const returnOpenPeriods = open_periods => {
    //todo: handle render Open Periods for every case
    if (open_periods.length === 1) {
      return (
        <Flex alignItems="center">
          <LuClock4 size={30} />
          <Accordion defaultIndex={[1]} allowMultiple>
            <AccordionItem>
              <AccordionButton>
                <Flex as="span" flex="1" mt={4} mb={4}>
                  <Text fontSize={'md'}>
                    {isStationOpen(open_periods[0])
                      ? 'Deschis Acum'
                      : 'Inchis Acum'}
                  </Text>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text fontSize={'md'}>
                  Luni :{' '}
                  {`${open_periods[0].open.hour}:${
                    open_periods[0].open.minute
                  }`}{' '}
                  -{' '}
                  {`${open_periods[0].close.hour}:${
                    open_periods[0].close.minute
                  }`}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      );
    } else if (open_periods.length === 5) {
      return (
        <Flex alignItems="center" mt={5} mb={5}>
          <LuClock4 size={30} />
          <Text fontSize={'md'} ml={6}>
            {/*add correct data*/}
            Deschis non-stop
          </Text>
        </Flex>
      );
    } else if (open_periods.length === 7) {
      return (
        <Flex alignItems="center" mt={5} mb={5}>
          <LuClock4 size={30} />
          <Text fontSize={'md'} ml={6}>
            {/*add correct data*/}
            Deschis non-stop
          </Text>
        </Flex>
      );
    }
    return (
      <Flex alignItems="center" mt={5} mb={5}>
        <LuClock4 size={30} />
        <Text fontSize={'md'} ml={6}>
          {/*add correct data*/}
          Deschis non-stop
        </Text>
      </Flex>
    );
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={true}
      onClose={() => {
        setOpenStationDetailsModal(false);
      }}
      motionPreset="slideInBottom"
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent
        position="fixed"
        top="0"
        right="0"
        height="100vh"
        marginRight="0"
        transform="translateY(0%)"
        transition="transform 0.3s ease-out"
      >
        <ModalHeader>{station.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} overflowY="auto">
          <Box
            width="400px"
            height="200px"
            overflow="hidden"
            overflowY="auto"
            rounded={'lg'}
            pos={'relative'}
            boxShadow={'2xl'}
          >
            <Image
              src={
                station.image
                  ? !station.is_public
                    ? base64toFile(station.image, 'image', 'jpeg')
                    : station.image
                  : defaultImage
              }
              rounded={'lg'}
              alt="Staion photo"
              width="100%"
              height="100%"
              objectFit={'cover'}
            />
          </Box>
          <Flex mt={7}>
            {!role && (
              <Button
                ml={3}
                mt={2}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color="white"
                rounded="md"
                onClick={() => handleBookButton()}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Book now
              </Button>
            )}
            <Box ml="auto" mr={2}>
              <StarRatingDisplay
                rating={station.rating}
                ratingSize={'xl'}
                starSize={25}
              />
              <Text fontSize={'md'}>
                {station.rating_count}{' '}
                {station.rating_count === 1 ? 'Rating' : 'Ratings'}
              </Text>
            </Box>
          </Flex>
          <Box
            mt={7}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="gray.200"
            mb={5}
          >
            <Flex alignItems="center" mb={5} mt={5}>
              <IoLocationOutline size={30} />
              <Text fontSize={'md'} ml={6}>
                {station.adress}
              </Text>
            </Flex>
            {station.phone && (
              <Flex alignItems="center" mt={5} mb={5}>
                <FaPhoneAlt size={30} />
                <Text fontSize={'md'} ml={6}>
                  {station.phone}
                </Text>
              </Flex>
            )}
            {station.open_periods &&
              returnOpenPeriods(JSON.parse(station.open_periods))}
            {station.website_URL && (
              <Flex alignItems="center" mt={5} mb={5}>
                <IoGlobeOutline size={30} />
                <Text fontSize={'md'} ml={6}>
                  <Link href={station.website_URL} isExternal>
                    Go to website
                  </Link>
                </Text>
              </Flex>
            )}
            {station.maps_URL && (
              <Flex alignItems="center" mt={5} mb={5}>
                <FaMapMarkedAlt size={30} />
                <Text fontSize={'md'} ml={6}>
                  <Link href={station.maps_URL} isExternal>
                    See on maps
                  </Link>
                </Text>
              </Flex>
            )}
            <Flex alignItems="center" mt={5} mb={5}>
              <IoMdPerson size={30} />
              <Text fontSize={'md'} ml={6}>
                {station.is_public ? 'Public Station' : 'Private Station'}
              </Text>
            </Flex>
          </Box>
          {!isEmpty(plugs) && (
            <Box mt={7} borderBottom="1px solid" borderColor="gray.200" py={4}>
              {plugs.map((plug, index) => (
                <Flex alignItems="center" mb={5}>
                  <TbRecharging size={30} />
                  <Text fontSize={'md'} ml={4}>
                    {formatConnectorType(plug.type)}
                  </Text>
                  <Text color={'gray.500'} fontSize={'sm'} ml={4}>
                    {plug.kw_power} kW
                  </Text>
                  <Text fontSize={'sm'} ml="auto" mr={2}>
                    {plug.status === 1 ? 'Active' : 'Inactive'}
                  </Text>
                </Flex>
              ))}
            </Box>
          )}
          {!isEmpty(reviews) && (
            <Box mb={12}>
              <Accordion defaultIndex={[1]} allowMultiple>
                <AccordionItem>
                  <AccordionButton>
                    <Flex as="span" flex="1" mt={4} mb={6}>
                      <Text fontSize={'xl'}>Reviews - {reviews.length}</Text>
                      <Box ml="auto" mr={2}>
                        <StarRatingDisplay
                          rating={station.rating}
                          ratingSize={'xl'}
                          starSize={25}
                        />
                      </Box>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    {reviews.map((review, index) => (
                      <Box
                        mb={7}
                        borderTop="1px solid"
                        borderColor="gray.200"
                        py={4}
                      >
                        <Flex alignItems="center" mb={5}>
                          <HStack>
                            <Avatar size="md" src={review.reviewer_photo} />
                            <Text fontSize="sm">{review.reviewer_name}</Text>
                          </HStack>
                          <Box ml="auto" mr={2}>
                            <StarRatingDisplay
                              rating={review.rating}
                              ratingSize={'md'}
                              starSize={18}
                            />
                          </Box>
                        </Flex>
                        <Text fontSize="sm" color="gray.600">
                          {review.comment}
                        </Text>
                      </Box>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>{/*<Box mb={10} />*/}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default StationDetailsModal;
