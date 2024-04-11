/* eslint-disable import/no-cycle */
/* GENERATOR: Import all of your sagas */
import loginContainer from './containers/LoginContainer/saga';
import homepageContainer from './containers/HomepageContainer/saga';
import registerContainer from './containers/RegisterContainer/saga';

const sagas = [
/* GENERATOR: Compile all of your sagas */
  loginContainer,
  homepageContainer,
  registerContainer,
];

export default sagas;
