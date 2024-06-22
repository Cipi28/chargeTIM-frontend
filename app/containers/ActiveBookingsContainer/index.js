import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as ActiveBookingsContainerActionCreators from './actions';

import './index.css';
import { store } from '../../store';
import {
  AlertDescription,
  AlertIcon,
  Alert,
  Box,
  CloseButton,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  AlertTitle,
} from '@chakra-ui/react';
import ActiveBookingCard from '../../components/ActiveBookingCard';
import {
  BOOKING_STATUS_ACTIVE,
  BOOKING_STATUS_PENDING,
  BOOKING_STATUS_REJECTED,
  BOOKING_STATUS_STARTED,
} from './constants';
import {
  selectAcceptedSuccessful,
  selectBookings,
  selectDeleteError,
  selectDeleteSuccessful,
  selectRejectedSuccessful,
} from './selectors';
import { isEmpty } from 'lodash';
import ContributorBookingCard from '../../components/ContributorBookingCard';
import emailjs from '@emailjs/browser';

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

export function ActiveBookingsContainer(props) {
  const { actions } = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [userInfo, setUserInfo] = useState(null);
  const [startedBookings, setStartedBookings] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [isOpenAcceptAlert, setIsOpenAcceptAlert] = useState(false);
  const [isOpenRejectedAlert, setIsOpenRejectedAlert] = useState(false);
  const [isDeletedSuccess, setIsDeletedSuccess] = useState(false);
  const [isNotCancelledAlert, setIsNotCancelledAlert] = useState(null);

  useEffect(() => {
    emailjs.init('_oITw2nA-QrpG8wQH');

    setIsDeletedSuccess(false);
    setIsNotCancelledAlert(null);
    const {
      global: { user },
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
      if (user.user.role) {
        actions.getUserBookingsAction({
          userId: user.user.id,
          statuses: [BOOKING_STATUS_PENDING],
          role: user.user.role,
        });
      } else {
        actions.getUserBookingsAction({
          userId: user.user.id,
          statuses: [
            BOOKING_STATUS_ACTIVE,
            BOOKING_STATUS_PENDING,
            BOOKING_STATUS_STARTED,
          ],
        });
      }
    }

    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setActiveBookings(props.bookings[BOOKING_STATUS_ACTIVE]);

    setPendingBookings(props.bookings[BOOKING_STATUS_PENDING]);
    setStartedBookings(props.bookings[BOOKING_STATUS_STARTED]);
  }, [props.bookings]);

  useEffect(() => {
    setIsDeletedSuccess(props.deleteSuccess);
  }, [props.deleteSuccess]);

  useEffect(() => {
    setIsOpenAcceptAlert(props.selectAcceptedSuccessful);
    setIsOpenRejectedAlert(props.selectRejectedSuccessful);
  }, [props.selectAcceptedSuccessful, props.selectRejectedSuccessful]);

  useEffect(() => {
    setIsDeletedSuccess(false);
    setIsNotCancelledAlert(null);
    setIsOpenRejectedAlert(false);
    setIsOpenAcceptAlert(false);
  }, [location]);

  useEffect(() => {
    setIsNotCancelledAlert(props.deleteError);
  }, [props.deleteError]);

  const deleteActiveBooking = bookingId => {
    setIsDeletedSuccess(false);
    setIsNotCancelledAlert(null);
    actions.deleteBookingAction({ id: bookingId });
    if (userInfo.role) {
      actions.getUserBookingsAction({
        userId: userInfo.id,
        statuses: [BOOKING_STATUS_PENDING],
        role: userInfo.role,
      });
    } else {
      actions.getUserBookingsAction({
        userId: userInfo.id,
        statuses: [
          BOOKING_STATUS_ACTIVE,
          BOOKING_STATUS_PENDING,
          BOOKING_STATUS_STARTED,
        ],
      });
    }
  };

  const deletePendingBooking = bookingId => {
    setIsDeletedSuccess(false);
    setIsNotCancelledAlert(null);
    actions.deleteBookingAction({ id: bookingId });
    if (userInfo.role) {
      actions.getUserBookingsAction({
        userId: userInfo.id,
        statuses: [BOOKING_STATUS_PENDING],
        role: userInfo.role,
      });
    } else {
      actions.getUserBookingsAction({
        userId: userInfo.id,
        statuses: [
          BOOKING_STATUS_ACTIVE,
          BOOKING_STATUS_PENDING,
          BOOKING_STATUS_STARTED,
        ],
      });
    }
  };

  const handleSubmit = async (name, toMail, fromName, message) => {
    const serviceId = 'service_up4yv27';
    const templateId = 'template_0pllfii';
    try {
      await emailjs.send(serviceId, templateId, {
        name: name,
        to_mail: toMail,
        to_name: name,
        from_name: fromName,
        message: message,
      });
      alert(
        'an email notifying your response to the booking request has been successfully sent to the user.',
      );
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const updateBookingRequestStatus = (booking, status) => {
    let message = '';

    if (status === BOOKING_STATUS_ACTIVE) {
      message = `Your booking request for station ${
        booking.station_name
      } has been accepted. The booking will start on ${transformDate(
        booking.start_time,
      )} and end on ${transformDate(booking.end_time)}.`;
    } else if (status === BOOKING_STATUS_REJECTED) {
      message = `Your booking request for station ${
        booking.station_name
      } from ${transformDate(booking.start_time)} to ${transformDate(
        booking.end_time,
      )} has been rejected.`;
    }

    handleSubmit(
      booking.user_info.name,
      booking.user_info.email,
      userInfo.name,
      message,
    );
    setIsDeletedSuccess(false);
    setIsNotCancelledAlert(null);
    setIsOpenRejectedAlert(false);
    setIsOpenAcceptAlert(false);
    actions.updateBookingStatusAction({ id: booking.id, status });
    setPendingBookings(pendingBookings.filter(el => el.id !== booking.id));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {showFirstDiv && <div style={{ width: '240px', flexShrink: 0 }} />}
      <div style={{ width: '85%' }}>
        <Box
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          _before={{
            paddingLeft: '240px',
            content: '""',
            position: 'absolute',
            top: 0,
            left: '10%', // Adjust this value to set the left margin
            width: '90%', // Adjust this value to account for the left margin
            height: '100%',
            bgImage:
              'https://static.vecteezy.com/system/resources/previews/012/848/255/non_2x/electric-vehicle-icon-set-of-ev-illustration-such-as-electric-car-bus-motorcycle-and-other-vector.jpg',
            bgSize: '90%',
            bgPosition: 'calc(50% + 120px) calc(50% - 30px)',
            bgRepeat: 'no-repeat',
            bgAttachment: 'fixed',
            opacity: 0.2,
            zIndex: -999,
          }}
          zIndex={-999}
        >
          <Box mt={4} ml={7} mr={7}>
            {userInfo?.role ? (
              <>
                <Flex
                  justify="center"
                  align="center"
                  mt={3}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                >
                  <Box>
                    <Text fontSize={'3xl'}>Request</Text>
                  </Box>
                </Flex>
                {(isOpenAcceptAlert || isOpenRejectedAlert) && (
                  <Flex justify="center" align="center" mt={7}>
                    <Box>
                      <Alert status="success">
                        <AlertIcon />
                        <Box>
                          <AlertTitle>Success!</AlertTitle>
                          <AlertDescription>
                            {isOpenAcceptAlert
                              ? 'The request has been successfully accepted.'
                              : 'The request has been successfully rejected.'}
                          </AlertDescription>
                        </Box>
                        <CloseButton
                          alignSelf="flex-start"
                          position="relative"
                          right={-1}
                          top={-1}
                          onClick={() => setIsOpenAcceptAlert(false)}
                        />
                      </Alert>
                    </Box>
                  </Flex>
                )}
                <Box borderRadius="lg" overflow="hidden">
                  <Flex alignItems="center" wrap="wrap">
                    {!isEmpty(pendingBookings) &&
                      pendingBookings.map((booking, index) => (
                        <Box p={3} width="400px" mx={10} mb={12} key={index}>
                          <ContributorBookingCard
                            booking={booking}
                            status={BOOKING_STATUS_PENDING}
                            updateBookingRequestStatus={
                              updateBookingRequestStatus
                            }
                          />
                        </Box>
                      ))}
                  </Flex>
                </Box>
              </>
            ) : (
              <Tabs isFitted position="relative" variant="unstyled">
                <TabList>
                  <Tab
                    onClick={() => {
                      setIsDeletedSuccess(false);
                      setIsNotCancelledAlert(null);
                    }}
                  >
                    <Text fontSize={'xl'}>Active</Text>
                  </Tab>
                  <Tab
                    onClick={() => {
                      setIsDeletedSuccess(false);
                      setIsNotCancelledAlert(null);
                    }}
                  >
                    <Text fontSize={'xl'}>Pending</Text>
                  </Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="blue.500"
                  borderRadius="1px"
                />
                {isDeletedSuccess && (
                  <Flex justify="center" align="center" mt={7}>
                    <Box>
                      <Alert status="success">
                        <AlertIcon />
                        <Box>
                          <AlertTitle>Success!</AlertTitle>
                          <AlertDescription>
                            The booking has successfully been cancelled.
                          </AlertDescription>
                        </Box>
                        <CloseButton
                          alignSelf="flex-start"
                          position="relative"
                          right={-1}
                          top={-1}
                          onClick={() => setIsDeletedSuccess(false)}
                        />
                      </Alert>
                    </Box>
                  </Flex>
                )}
                {isNotCancelledAlert && (
                  <Flex justify="center" align="center" mt={7}>
                    <Box>
                      <Alert status="error">
                        <AlertIcon />
                        <Box>
                          <AlertTitle>Error!</AlertTitle>
                          <AlertDescription>
                            {isNotCancelledAlert}
                          </AlertDescription>
                        </Box>
                        <CloseButton
                          alignSelf="flex-start"
                          position="relative"
                          right={-1}
                          top={-1}
                          onClick={() => setIsNotCancelledAlert(false)}
                        />
                      </Alert>
                    </Box>
                  </Flex>
                )}
                <TabPanels>
                  <TabPanel>
                    <Box borderRadius="lg" overflow="hidden">
                      <Flex alignItems="center" wrap="wrap">
                        {!isEmpty(startedBookings) &&
                          startedBookings.map((booking, index) => (
                            <Box
                              p={3}
                              width="400px"
                              mx={10}
                              mb={12}
                              key={index}
                            >
                              <ActiveBookingCard
                                booking={booking}
                                status={booking.status}
                                deleteBooking={deleteActiveBooking}
                              />
                            </Box>
                          ))}
                        {!isEmpty(activeBookings) &&
                          activeBookings.map((booking, index) => (
                            <Box
                              p={3}
                              width="400px"
                              mx={10}
                              mb={12}
                              key={index}
                            >
                              <ActiveBookingCard
                                booking={booking}
                                status={booking.status}
                                deleteBooking={deleteActiveBooking}
                              />
                            </Box>
                          ))}
                      </Flex>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box borderRadius="lg" overflow="hidden">
                      <Flex alignItems="center" wrap="wrap">
                        {!isEmpty(pendingBookings) &&
                          pendingBookings.map((booking, index) => (
                            <Box
                              p={3}
                              width="400px"
                              mx={10}
                              mb={12}
                              key={index}
                            >
                              <ActiveBookingCard
                                booking={booking}
                                status={BOOKING_STATUS_PENDING}
                                deleteBooking={deletePendingBooking}
                              />
                            </Box>
                          ))}
                      </Flex>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  bookings: selectBookings(state),
  selectAcceptedSuccessful: selectAcceptedSuccessful(state),
  selectRejectedSuccessful: selectRejectedSuccessful(state),
  deleteError: selectDeleteError(state),
  deleteSuccess: selectDeleteSuccessful(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActiveBookingsContainerActionCreators, dispatch),
});

const ConnectedActiveBookingsContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ActiveBookingsContainer);

export default ConnectedActiveBookingsContainer;
