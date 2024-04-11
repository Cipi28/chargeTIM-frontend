/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import LoginContainer from 'containers/LoginContainer/Loadable';
import HomepageContainer from 'containers/HomepageContainer/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RegistereContainer from 'containers/RegisterContainer/Loadable';
import NavBar from 'components/NavBar';

const AppWrapper = styled.div`
  //max-width: calc(768px + 16px * 2);
  //margin: 0 auto;
  //display: flex;
  //min-height: 100%;
  //padding: 0 16px;
  //flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Route
        render={({ location }) =>
          !['/login', '/register'].includes(location.pathname) && <NavBar />
        }
      />
      <Switch>
        <Route exact path="/login" component={LoginContainer} />
        <Route path="/register" component={RegistereContainer} />
        <Route exact path="/" component={HomepageContainer} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </AppWrapper>
  );
}
