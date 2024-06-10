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
import { BOOKING_STATUS_ACTIVE, BOOKING_STATUS_PENDING } from './constants';
import {
  selectAcceptedSuccessful,
  selectBookings,
  selectRejectedSuccessful,
} from './selectors';
import { isEmpty } from 'lodash';
import ContributorBookingCard from '../../components/ContributorBookingCard';

export function ActiveBookingsContainer(props) {
  const { actions } = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [userInfo, setUserInfo] = useState(null);
  const [activeBookings, setActiveBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [isOpenAcceptAlert, setIsOpenAcceptAlert] = useState(false);
  const [isOpenRejectedAlert, setIsOpenRejectedAlert] = useState(false);

  useEffect(() => {
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
          statuses: [BOOKING_STATUS_ACTIVE, BOOKING_STATUS_PENDING],
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
    setActiveBookings(props.bookings[BOOKING_STATUS_ACTIVE]);
    setPendingBookings(props.bookings[BOOKING_STATUS_PENDING]);
  }, [props.bookings]);

  useEffect(() => {
    setIsOpenAcceptAlert(props.selectAcceptedSuccessful);
    setIsOpenRejectedAlert(props.selectRejectedSuccessful);
  }, [props.selectAcceptedSuccessful, props.selectRejectedSuccessful]);

  const deleteActiveBooking = bookingId => {
    actions.deleteBookingAction({ id: bookingId });
    setActiveBookings(
      activeBookings.filter(booking => booking.id !== bookingId),
    );
  };

  const deletePendingBooking = bookingId => {
    actions.deleteBookingAction({ id: bookingId });
    setPendingBookings(
      pendingBookings.filter(booking => booking.id !== bookingId),
    );
  };

  const updateBookingRequestStatus = (booking, status) => {
    actions.updateBookingStatusAction({ id: booking.id, status });
    setPendingBookings(pendingBookings.filter(el => el.id !== booking.id));
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
                    // make custom component for contributor bookings
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
                <Tab>
                  <Text fontSize={'xl'}>Active</Text>
                </Tab>
                <Tab>
                  <Text fontSize={'xl'}>Pending</Text>
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
                      {!isEmpty(activeBookings) &&
                        activeBookings.map((booking, index) => (
                          <Box p={3} width="400px" mx={10} mb={12} key={index}>
                            <ActiveBookingCard
                              booking={booking}
                              status={BOOKING_STATUS_ACTIVE}
                              deleteBooking={deleteActiveBooking}
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
                      {!isEmpty(pendingBookings) &&
                        pendingBookings.map((booking, index) => (
                          <Box p={3} width="400px" mx={10} mb={12} key={index}>
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
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
  bookings: selectBookings(state),
  selectAcceptedSuccessful: selectAcceptedSuccessful(state),
  selectRejectedSuccessful: selectRejectedSuccessful(state),
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
