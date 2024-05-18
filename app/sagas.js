/* eslint-disable import/no-cycle */
/* GENERATOR: Import all of your sagas */
import loginContainer from './containers/LoginContainer/saga';
import homepageContainer from './containers/HomepageContainer/saga';
import registerContainer from './containers/RegisterContainer/saga';
import favouriteStationsContainer from "./containers/FavouriteStationsContainer/saga";
import stationDetailsContainer from "./containers/StationDetailsContainer/saga";
import mapContainer from "./containers/MapContainer/saga";

const sagas = [
  /* GENERATOR: Compile all of your sagas */
  loginContainer,
  homepageContainer,
  registerContainer,
  favouriteStationsContainer,
  stationDetailsContainer,
  mapContainer,
];

export default sagas;
