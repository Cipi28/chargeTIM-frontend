/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import LoginContainer from 'containers/LoginContainer/Loadable';
import HomepageContainer from 'containers/HomepageContainer/Loadable';
import MapContainer from 'containers/MapContainer/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegistereContainer from 'containers/RegisterContainer/Loadable';
import FavouriteStationsContainer from 'containers/FavouriteStationsContainer/Loadable';
import ActiveBookingsContainer from 'containers/ActiveBookingsContainer/Loadable';
import BookingHistoryContainer from 'containers/BookingHistoryContainer/Loadable';
import ProfileContainer from 'containers/ProfileContainer/Loadable';
import NavBar from 'components/NavBar';
import store from '../../store';

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const {
      global: { user },
    } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
    }
  }, []);

  return (
    <>
      <Helmet titleTemplate="%s - ChargeTIM" defaultTitle="ChargeTIM">
        <meta name="description" content="Electric Station Booking App" />
      </Helmet>
      <Route
        render={({ location }) =>
          !['/login', '/register'].includes(location.pathname) && <NavBar />
        }
      />
      <Switch>
        <Route exact path="/" component={HomepageContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route path="/register" component={RegistereContainer} />
        <Route exact path="/map" component={MapContainer} />
        <Route exact path="/bookings" component={ActiveBookingsContainer} />
        <Route
          exact
          path="/order-history"
          component={BookingHistoryContainer}
        />
        <Route
          exact
          path={userInfo?.role ? '/my-stations' : '/favourites'}
          component={FavouriteStationsContainer}
        />
        <Route exact path="/profile" component={ProfileContainer} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </>
  );
}
