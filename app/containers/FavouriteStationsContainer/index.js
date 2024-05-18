import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import * as FavouriteStationsContainerActionCreators from './actions';
import './index.css';
import {Icon, Input, useDisclosure} from '@chakra-ui/react';
import {FiSearch} from 'react-icons/fi';
import {store} from '../../store';
import StationCard from "../../components/StationCard";

export function FavouriteStationsContainer(props) {
  const stationss = [
    {name: "Tesla Supercharger", adress: "Bulevardul Revoluției din 1989 Nr 2A, Timișoara"},
    {name: "Tesla2 Supercharger", adress: "Bulevardul Revoluției din 1989 Nr 2A, Timișoara"},
    {name: "Tesla3 Supercharger", adress: "Bulevardul Revoluției din 1989 Nr 2A, Timișoara"},
    {name: "Tesla3 Supercharger", adress: "Bulevardul Revoluției din 1989 Nr 2A, Timișoara"},
  ];

  const {actions} = props;
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);
  const [stations, setStations] = useState(stationss);
  const [searchField, setSearchField] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isOpenStationDetails, setIsOpenStationDetails] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    const {
      global: {user},
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
      // actions.getUserCars({userId: user.user.id});
    }

    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openStationDetails = index => {
    setSelectedStation(stations[index]);
    setIsOpenStationDetails(true);
  };

  function base64toFile(base64String, filename, contentType) {
    const byteCharacters = atob(base64String); // Decode base64 string
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const file = new File([byteArray], filename, {type: contentType});
    return URL.createObjectURL(file);
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {' '}
      {/* Added justifyContent: 'center' */}
      {showFirstDiv && (
        <div style={{width: '240px', flexShrink: 0}}>
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
                  stationss.filter(carItem =>
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
                  adress={station.adress}
                  // image={base64toFile(station.image, 'carImage', 'jpeg')}
                  name={station.name}
                  openStationDetails={openStationDetails}
                  // goToStationDetails={goToStationDetails}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/*{(isOpenStationDetails && selectedStation) && <BookingDetailsModal*/}
      {/*  setIsOpenStationDetails={setIsOpenStationDetails}*/}
      {/*  station={selectedStation}*/}
      {/*/>}*/}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(FavouriteStationsContainerActionCreators, dispatch),
});

const ConnectedFavouriteStationsContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(FavouriteStationsContainer);

export default ConnectedFavouriteStationsContainer;
