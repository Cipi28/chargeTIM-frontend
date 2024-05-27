import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as ActiveBookingsContainerActionCreators from './actions';

import './index.css';
import { store } from '../../store';
import {
  Box,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import ActiveBookingCard from '../../components/ActiveBookingCard';
import { BOOKING_STATUS_BOOKED, BOOKING_STATUS_PENDING } from './constants';
import { selectBookings } from './selectors';
import { isEmpty } from 'lodash';

export function ActiveBookingsContainer(props) {
  const { actions } = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [userInfo, setUserInfo] = useState(null);
  const [activeBookings, setActiveBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    const {
      global: { user },
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
      actions.getUserBookingsAction({
        userId: user.user.id,
        statuses: [BOOKING_STATUS_BOOKED, BOOKING_STATUS_PENDING],
      });
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
    setActiveBookings(props.bookings[BOOKING_STATUS_BOOKED]);
    setPendingBookings(props.bookings[BOOKING_STATUS_PENDING]);
  }, [props.bookings]);

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
                      activeBookings.map(booking => (
                        <Box p={3} width="400px" mx={10} mb={12}>
                          <ActiveBookingCard
                            booking={booking}
                            status={BOOKING_STATUS_BOOKED}
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
                      pendingBookings.map(booking => (
                        <Box p={3} width="400px" mx={10} mb={12}>
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
        </Box>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
  bookings: selectBookings(state),
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
