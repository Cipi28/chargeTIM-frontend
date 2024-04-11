import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as LoginContainerActionCreators from './actions';
import { userIsNotAuthenticated } from '../../store';
import { selectIsLoading, selectError } from './selectors';

export function LoginContainer(props) {
  const { actions } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    actions.signInAction({ email, password });
  };

  const ana = email ?? password;

  return (
    <div>
      <h1>Login</h1>
      <br />
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={() => handleLogin()}>Submit</button>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  errorLoading: selectError(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(LoginContainerActionCreators, dispatch),
});

const ConnectedLoginContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(LoginContainer);

export default userIsNotAuthenticated(ConnectedLoginContainer);
