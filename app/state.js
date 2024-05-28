/* GENERATOR: Import all of your initial state */
import { initialState as global } from './containers/App/reducer';
import { initialState as loginContainer } from './containers/LoginContainer/reducer';
import { initialState as homepageContainer } from './containers/HomepageContainer/reducer';
import { initialState as registerContainer } from './containers/RegisterContainer/reducer';
import { initialState as favouriteStationsContainer } from './containers/FavouriteStationsContainer/reducer';
import { initialState as mapContainer } from './containers/MapContainer/reducer';
import { initialState as activeBookingsContainer } from './containers/ActiveBookingsContainer/reducer';
import { initialState as bookingHistoryContainer } from './containers/BookingHistoryContainer/reducer';
import { initialState as profileContainer } from './containers/ProfileContainer/reducer';

export default {
  global,
  loginContainer,
  homepageContainer,
  registerContainer,
  favouriteStationsContainer,
  mapContainer,
  activeBookingsContainer,
  bookingHistoryContainer,
  profileContainer,
};
