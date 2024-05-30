import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as FavouriteStationsContainerActionCreators from './actions';
import './index.css';
import { Button, Flex, Icon, Input, useDisclosure } from '@chakra-ui/react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { store } from '../../store';
import StationCard from '../../components/StationCard';
import { selectFavouriteStations } from './selectors';
import StationDetailsModal from '../../components/StationDetailsModal';
import * as S from './selectors';
import BookingDetailsModal from '../../components/BookingDetailsModal';
import AddStationModal from '../../components/AddStationModal';

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
  }, [
    props.favouriteStations,
    props.selectedPlugs,
    props.selectedReviews,
    props.userCars,
  ]);

  const openStationDetails = index => {
    actions.getPlugsAction({ stationId: stations[index].id });
    actions.getReviewsAction({ stationId: stations[index].id });
    setOpenStationDetailsModal(stations[index]);
    setSelectedStation(stations[index]);
  };

  const handleBookButton = () => {
    actions.getUserCarsAction({
      userId: userInfo.id,
    });
    actions.getPlugsAction({
      stationId: selectedStation.id,
    });
    actions.getPlugsAction({ stationId: selectedStation.id });
    setSelectedStation(selectedStation);
    setOpenBookingModal(true);
  };

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
    price,
    address,
    phoneNumber,
    image,
    selectedDays,
  ) => {
    actions.addStation({
      name,
      price,
      address,
      phoneNumber,
      image,
      selectedDays,
      website_URL: websiteLink,
      maps_URL: null,
      is_public: false,
      latitude: 45.7698818,
      longitude: 21.2220122,
      public_id: null,
      open_periods: null,
      user_id: userInfo.id,
    });

    const newStation = {
      name,
      price,
      address,
      phoneNumber,
      image,
      selectedDays,
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
      <div className="car-list-container">
        <div className="car-list">
          <div className="input-wrapper">
            {' '}
            {/* Added wrapper div for Input */}
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
              className="search-bar"
              placeholder="Search Car"
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
            {userInfo?.role && (
              <Flex justifyContent="center" alignItems="center" ml={20}>
                <Button
                  fontSize="sm"
                  rounded="full"
                  bg="blue.400"
                  color="white"
                  boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                  _hover={{
                    bg: 'blue.500',
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
              </Flex>
            )}
          </div>
          {stations.map((station, index) => (
            <React.Fragment key={index}>
              <div className="car-card">
                <StationCard
                  index={index}
                  id={station.id}
                  adress={station.adress}
                  image={station.image}
                  name={station.name}
                  openStationDetails={openStationDetails}
                  handleBookButton={handleBookButton}
                  role={userInfo.role}
                  deleteStation={deleteStation}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
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
      {openBookingModal && (
        <BookingDetailsModal
          setOpenBookingModal={setOpenBookingModal}
          cars={currentCars}
          stations={stations}
          plugs={currentPlugs}
          saveBookingAction={actions.saveBookingAction}
          selectedStation={selectedStation}
          userId={userInfo.id}
        />
      )}
      {isAddStationModalOpen && (
        <AddStationModal
          addStation={addStation}
          setIsAddStationModalOpen={setIsAddStationModalOpen}
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
