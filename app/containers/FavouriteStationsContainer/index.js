import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as FavouriteStationsContainerActionCreators from './actions';
import './index.css';
import { Icon, Input, useDisclosure } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { store } from '../../store';
import StationCard from '../../components/StationCard';
import { selectFavouriteStations } from './selectors';
import StationDetailsModal from '../../components/StationDetailsModal';
import * as S from './selectors';
import BookingDetailsModal from '../../components/BookingDetailsModal';

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const {
      global: { user },
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
      actions.getFavouriteStations({ userId: user.user.id });
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
