/* GENERATOR: Import all of your initial state */
import {initialState as global} from './containers/App/reducer';
import {initialState as loginContainer} from './containers/LoginContainer/reducer';
import {initialState as homepageContainer} from './containers/HomepageContainer/reducer';
import {initialState as registerContainer} from './containers/RegisterContainer/reducer';
import {initialState as favouriteStationsContainer} from './containers/FavouriteStationsContainer/reducer';
import {initialState as stationDetailsContainer} from './containers/StationDetailsContainer/reducer';
import {initialState as mapContainer} from './containers/MapContainer/reducer';

export default {
  global,
  loginContainer,
  homepageContainer,
  registerContainer,
  favouriteStationsContainer,
  stationDetailsContainer,
  mapContainer,
};
