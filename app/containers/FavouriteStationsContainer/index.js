import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as FavouriteStationsContainerActionCreators from './actions';
import './index.css';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { store } from '../../store';
import StationCard from '../../components/StationCard';
import { selectFavouriteStations } from './selectors';
import StationDetailsModal from '../../components/StationDetailsModal';
import * as S from './selectors';
import BookingDetailsModal from '../../components/BookingDetailsModal';
import AddStationModal from '../../components/AddStationModal';
import { isEmpty } from 'lodash';

export function FavouriteStationsContainer(props) {
  const { actions } = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [stations, setStations] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [openStationDetailsModal, setOpenStationDetailsModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [currentPlugs, setCurrentPlugs] = useState([]);
  const [currentReviews, setCurrentReviews] = useState([]);
  const [currentCars, setCurrentCars] = useState([]);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [isAddStationModalOpen, setIsAddStationModalOpen] = useState(false);
  const [conflictBookings, setConflictBookings] = useState([]);
  const [bookingVerified, setBookingVerified] = useState(false);
  const [bookingSaved, setBookingSaved] = useState(false);
  const [isFavStationEmpty, setIsFavStationEmpty] = useState(false);

  useEffect(() => {
    setConflictBookings(props.conflictBookings);
  }, [props.conflictBookings]);

  useEffect(() => {
    setBookingVerified(props.isCurrentBookingVerified);
  }, [props.isCurrentBookingVerified]);

  useEffect(() => {
    setBookingSaved(props.isBookingSaved);
  }, [props.isBookingSaved]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const {
      global: { user },
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
      if (user.user.role) {
        actions.getUserStations({ userId: user.user.id });
      } else {
        actions.getFavouriteStations({ userId: user.user.id });
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
    setStations(props.favouriteStations);
    setCurrentPlugs(props.selectedPlugs);
    setCurrentReviews(props.selectedReviews);
    setCurrentCars(props.userCars);

    if (isEmpty(props.favouriteStations) && props.areStationReturned) {
      setIsFavStationEmpty(true);
    }
  }, [
    props.favouriteStations,
    props.selectedPlugs,
    props.selectedReviews,
    props.userCars,
  ]);

  const onChangeCar = (carId, stationId) => {
    const car = props.userCars.find(car => car.id === parseInt(carId));
    actions.getPlugsAfterCarTypeQuietAction({
      stationId: selectedStation.id,
      carPlugType: car.plug_type,
    });
  };

  const onChangeStation = (carId, stationId) => {
    const car = props.userCars.find(car => car.id === parseInt(carId));
    actions.getPlugsAfterCarTypeQuietAction({
      stationId: stationId,
      carPlugType: car.plug_type,
    });
  };

  const openStationDetails = index => {
    actions.getPlugsAction({ stationId: stations[index].id });
    actions.getReviewsAction({ stationId: stations[index].id });
    setOpenStationDetailsModal(stations[index]);
    setSelectedStation(stations[index]);
  };

  const handleBookButton = id => {
    setSelectedStation(stations.find(station => station.id === id));

    actions.getUserCarsAction({
      userId: userInfo.id,
    });
  };

  useEffect(() => {
    if (!isEmpty(props.userCars) && !isEmpty(selectedStation)) {
      actions.getPlugsAfterCarTypeAction({
        stationId: selectedStation.id,
        carPlugType: props.userCars[0]?.plug_type,
      });
      setOpenBookingModal(true);
    }
  }, [props.userCars]);

  const handleOpenAddStationModal = () => {
    setIsAddStationModalOpen(true);
  };

  const deleteStation = stationId => {
    actions.deleteStation({ id: stationId });
    setStations(stations.filter(station => station.id !== stationId));
  };

  const addStation = (
    name,
    websiteLink,
    address,
    phoneNumber,
    openingHours,
    closingHours,
    latitude,
    longitude,
    kwPower,
    costPerKw,
    plug,
    image,
  ) => {
    const stationPlug = {
      kwPower,
      costPerKw,
      plugType: plug,
      status: 1,
    };
    actions.addStation({
      name,
      address,
      phoneNumber,
      image,
      website_URL: websiteLink,
      maps_URL: null,
      is_public: false,
      latitude: latitude,
      longitude: longitude,
      public_id: null,
      open_periods: JSON.stringify([
        {
          open: {
            hour: openingHours,
          },
          close: {
            hour: closingHours,
          },
        },
      ]),
      user_id: userInfo.id,
      stationPlug,
    });

    const newStation = {
      name,
      address,
      phoneNumber,
      image,
      website_URL: websiteLink,
      maps_URL: null,
      is_public: false,
      latitude: 45.7698818,
      longitude: 21.2220122,
      public_id: null,
      open_periods: null,
      user_id: userInfo.id,
    };
    setStations([...stations, newStation]);
    actions.getUserStations({ userId: userInfo.id });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {showFirstDiv && <div style={{ width: '240px', flexShrink: 0 }} />}
      <div style={{ width: '100%' }}>
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
            <Flex justify="center" align="center" mt={10}>
              <Box mb={10}>
                <Icon
                  mr="4"
                  mt="1"
                  fontSize="30"
                  _groupHover={{
                    color: 'white',
                  }}
                  as={FiSearch}
                />
                <Input
                  variant="filled"
                  width={'30rem'}
                  className="search-bar"
                  placeholder="Search Station"
                  value={searchField}
                  onChange={event => {
                    const searchTerm = event.target.value.toLowerCase();
                    setSearchField(event.target.value);
                    setStations(
                      props.favouriteStations.filter(carItem =>
                        carItem.name.toLowerCase().includes(searchTerm),
                      ),
                    );
                  }}
                />
                <Button
                  ml={8}
                  mb={2}
                  hidden={!userInfo?.role}
                  fontSize="sm"
                  rounded="full"
                  bg="blue.300"
                  color="white"
                  boxShadow="lg"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow:
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)',
                  }}
                  _focus={{
                    bg: 'blue.500',
                  }}
                  onClick={() => {
                    handleOpenAddStationModal();
                  }}
                >
                  Register Station
                  <Icon
                    ml="2"
                    title="filterSurveyTags"
                    fontSize="20"
                    _groupHover={{
                      color: 'white',
                    }}
                    as={FiPlus}
                  />
                </Button>
              </Box>
            </Flex>
            <Flex alignItems="center" wrap="wrap">
              {stations.map((station, index) => (
                <Box p={3} mx={3} mb={12} key={index}>
                  <div className="car-card">
                    <StationCard
                      index={index}
                      id={station.id}
                      adress={station.adress}
                      image={station.image}
                      name={station.name}
                      isStationPublic={station.is_public}
                      openStationDetails={openStationDetails}
                      handleBookButton={handleBookButton}
                      role={userInfo.role}
                      deleteStation={deleteStation}
                    />
                  </div>
                </Box>
              ))}
            </Flex>
            {isEmpty(stations) && isFavStationEmpty && (
              <div>
                <Heading
                  mt={12}
                  fontSize={'4xl'}
                  fontFamily={'body'}
                  fontWeight={500}
                  align="center"
                  textAlign={'center'}
                >
                  {userInfo?.role
                    ? 'No stations added yet!'
                    : 'Go to map and add your favourite stations!'}
                </Heading>
              </div>
            )}
          </Box>
        </Box>
      </div>
      {openStationDetailsModal && selectedStation && (
        <StationDetailsModal
          setOpenStationDetailsModal={setOpenStationDetailsModal}
          station={selectedStation}
          plugs={currentPlugs}
          reviews={currentReviews}
          handleBookButton={handleBookButton}
          role={userInfo.role}
        />
      )}
      {openBookingModal && props.plugsRetrieved && (
        <BookingDetailsModal
          setOpenBookingModal={setOpenBookingModal}
          cars={currentCars}
          stations={stations}
          plugs={props.plugsByCarType}
          saveBookingAction={actions.saveBookingAction}
          verifyBookingAction={actions.verifyBookingAction}
          selectedStation={selectedStation}
          userId={userInfo.id}
          onChangeCar={onChangeCar}
          onChangeStation={onChangeStation}
          conflictBookings={conflictBookings}
          isCurrentBookingVerified={bookingVerified}
          isBookingSaved={bookingSaved}
          setConflictBookings={setConflictBookings}
          setBookingVerified={setBookingVerified}
          setBookingSaved={setBookingSaved}
          userName={userInfo.name}
          closeAlertsAction={actions.closeAlertsAction}
        />
      )}
      {isAddStationModalOpen && (
        <AddStationModal
          addStation={addStation}
          setIsAddStationModalOpen={setIsAddStationModalOpen}
          errors={props.errorMessages}
          clearAddStationError={actions.clearAddStationError}
          addedStationSuccess={props.addedStationSuccess}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
  favouriteStations: selectFavouriteStations(state),
  selectedPlugs: S.selectSelectedPlugs(state),
  selectedReviews: S.selectSelectedReviews(state),
  userCars: S.selectUserCars(state),
  plugsByCarType: S.selectPlugsByCarType(state),
  plugsRetrieved: S.selectPlugsRetrieved(state),
  conflictBookings: S.selectConflictBookings(state),
  isCurrentBookingVerified: S.selectIsCurrentBookingVerified(state),
  isBookingSaved: S.selectIsBookingSaved(state),
  areStationReturned: S.selectAreStationReturned(state),
  errorMessages: S.selectErrorMessages(state),
  addedStationSuccess: S.selectAddedStationSuccess(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    FavouriteStationsContainerActionCreators,
    dispatch,
  ),
});

const ConnectedFavouriteStationsContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FavouriteStationsContainer);

export default ConnectedFavouriteStationsContainer;
