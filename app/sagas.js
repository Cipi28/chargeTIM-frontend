/* eslint-disable import/no-cycle */
/* GENERATOR: Import all of your sagas */
import loginContainer from './containers/LoginContainer/saga';
import homepageContainer from './containers/HomepageContainer/saga';
import registerContainer from './containers/RegisterContainer/saga';
import favouriteStationsContainer from './containers/FavouriteStationsContainer/saga';
import mapContainer from './containers/MapContainer/saga';
import activeBookingsContainer from './containers/ActiveBookingsContainer/saga';
import bookingHistoryContainer from './containers/BookingHistoryContainer/saga';
import profileContainer from './containers/ProfileContainer/saga';

const sagas = [
  /* GENERATOR: Compile all of your sagas */
  loginContainer,
  homepageContainer,
  registerContainer,
  favouriteStationsContainer,
  mapContainer,
  activeBookingsContainer,
  bookingHistoryContainer,
  profileContainer,
];

export default sagas;
