import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as BookingHistoryContainerActionCreators from './actions';

import './index.css';
import { store } from '../../store';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
} from '@chakra-ui/react';
import {
  BOOKING_STATUS_ACTIVE,
  BOOKING_STATUS_ENDED,
  BOOKING_STATUS_REJECTED,
  BOOKING_STATUS_STARTED,
} from './constants';
import { selectBookings, selectRatedSuccessful } from './selectors';
import { cloneDeep, isEmpty } from 'lodash';
import HistoryBookingCard from '../../components/HistoryBookingCard';
import ReviewModal from '../../components/ReviewModal';
import ContributorBookingCard from '../../components/ContributorBookingCard';
import RateModal from '../../components/RateModal';

export function BookingHistoryContainer(props) {
  const { actions } = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [userInfo, setUserInfo] = useState(null);
  const [endedBookings, setEndedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isOpenRatedAlert, setIsOpenRatedAlert] = useState(false);

  useEffect(() => {
    const {
      global: { user },
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
      if (user.user.role) {
        actions.getUserBookingsAction({
          userId: user.user.id,
          statuses: [
            BOOKING_STATUS_ACTIVE,
            BOOKING_STATUS_STARTED,
            BOOKING_STATUS_ENDED,
            BOOKING_STATUS_REJECTED,
          ],
          role: user.user.role,
        });
      } else {
        actions.getUserBookingsAction({
          userId: user.user.id,
          statuses: [BOOKING_STATUS_ENDED, BOOKING_STATUS_REJECTED],
          role: user.user.role,
        });
      }
    }
    // actions.getStationsAction();

    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setEndedBookings(props.bookings[BOOKING_STATUS_ENDED]);
    setRejectedBookings(props.bookings[BOOKING_STATUS_REJECTED]);
    setActiveBookings(props.bookings[BOOKING_STATUS_ACTIVE]);
    setIsOpenRatedAlert(props.ratedSuccessful);
  }, [props.bookings]);

  const openReviewModal = booking => {
    setIsReviewModalOpen(true);
    setSelectedBooking(booking);
  };

  const updateBooking = booking => {
    actions.updateBookingAction(booking);
    const bookings = cloneDeep(endedBookings);
    const updatedBookings = bookings.map((el, index) => {
      if (el.id === booking.id) {
        return booking;
      }
      return el;
    });
    setEndedBookings(updatedBookings);
  };

  const saveReview = review => {
    actions.saveReviewAction({ ...review, userId: userInfo.id });
  };

  const openRateModal = booking => {
    setIsRateModalOpen(true);
    setSelectedBooking(booking);
  };

  const rateUser = (rating, userId, bookingId) => {
    actions.rateUserAction({ rating, userId, role: userInfo, bookingId });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {' '}
      {/* Added justifyContent: 'center' */}
      {showFirstDiv && (
        <div style={{ width: '240px', flexShrink: 0 }}>
          {' '}
          {/* Added flexShrink: 0 */}
          {/* Content for the first div */}
        </div>
      )}
      <div style={{ width: '85%' }}>
        <Box mt={4} ml={7} mr={7}>
          {userInfo?.role ? (
            <Tabs isFitted position="relative" variant="unstyled">
              <TabList>
                <Tab>
                  <Text fontSize={'xl'}>Accepted</Text>
                </Tab>
                <Tab>
                  <Text fontSize={'xl'}>Ended</Text>
                </Tab>
                <Tab>
                  <Text fontSize={'xl'}>Rejected</Text>
                </Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
                width="33.33%"
              />
              <TabPanels>
                <TabPanel>
                  <Box borderRadius="lg" overflow="hidden">
                    <Flex alignItems="center" wrap="wrap">
                      {!isEmpty(endedBookings) &&
                        activeBookings.map((booking, index) => (
                          <Box p={3} width="400px" mx={10} mb={12} key={index}>
                            <ContributorBookingCard
                              booking={booking}
                              status={BOOKING_STATUS_ACTIVE}
                            />
                          </Box>
                        ))}
                    </Flex>
                  </Box>
                </TabPanel>
                <TabPanel>
                  {isOpenRatedAlert && (
                    <Flex justify="center" align="center" mt={7}>
                      <Box>
                        <Alert status="success">
                          <AlertIcon />
                          <Box>
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                              The user has been successfully rated.
                            </AlertDescription>
                          </Box>
                          <CloseButton
                            alignSelf="flex-start"
                            position="relative"
                            right={-1}
                            top={-1}
                            onClick={() => setIsOpenRatedAlert(false)}
                          />
                        </Alert>
                      </Box>
                    </Flex>
                  )}
                  <Box borderRadius="lg" overflow="hidden">
                    <Flex alignItems="center" wrap="wrap">
                      {!isEmpty(endedBookings) &&
                        endedBookings.map((booking, index) => (
                          <Box p={3} width="400px" mx={10} mb={12} key={index}>
                            <ContributorBookingCard
                              booking={booking}
                              status={BOOKING_STATUS_ENDED}
                              openRateModal={openRateModal}
                            />
                          </Box>
                        ))}
                    </Flex>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box
                    // maxW="3xl"
                    // borderWidth="2px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Flex alignItems="center" wrap="wrap">
                      {!isEmpty(rejectedBookings) &&
                        rejectedBookings.map((booking, index) => (
                          <Box p={3} width="400px" mx={10} mb={12} key={index}>
                            <ContributorBookingCard
                              booking={booking}
                              status={BOOKING_STATUS_REJECTED}
                            />
                          </Box>
                        ))}
                    </Flex>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : (
            <Tabs isFitted position="relative" variant="unstyled">
              <TabList>
                <Tab>
                  <Text fontSize={'xl'}>Ended</Text>
                </Tab>
                <Tab>
                  <Text fontSize={'xl'}>Rejected</Text>
                </Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel>
                  <Box borderRadius="lg" overflow="hidden">
                    <Flex alignItems="center" wrap="wrap">
                      {!isEmpty(endedBookings) &&
                        endedBookings.map((booking, index) => (
                          <Box p={3} width="400px" mx={10} mb={12} key={index}>
                            <HistoryBookingCard
                              booking={booking}
                              status={BOOKING_STATUS_ENDED}
                              openReviewModal={openReviewModal}
                            />
                          </Box>
                        ))}
                    </Flex>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box
                    // maxW="3xl"
                    // borderWidth="2px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Flex alignItems="center" wrap="wrap">
                      {!isEmpty(rejectedBookings) &&
                        rejectedBookings.map((booking, index) => (
                          <Box p={3} width="400px" mx={10} mb={12} key={index}>
                            <HistoryBookingCard
                              booking={booking}
                              status={BOOKING_STATUS_REJECTED}
                              index={index}
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
      </div>
      {isReviewModalOpen && (
        <ReviewModal
          booking={selectedBooking}
          setIsOpen={setIsReviewModalOpen}
          saveReview={saveReview}
          updateBooking={updateBooking}
        />
      )}
      {isRateModalOpen && (
        <RateModal
          booking={selectedBooking}
          setIsOpen={setIsRateModalOpen}
          rateUser={rateUser}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
  bookings: selectBookings(state),
  ratedSuccessful: selectRatedSuccessful(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(BookingHistoryContainerActionCreators, dispatch),
});

const ConnectedBookingHistoryContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(BookingHistoryContainer);

export default ConnectedBookingHistoryContainer;
