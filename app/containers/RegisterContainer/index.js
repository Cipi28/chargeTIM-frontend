import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as RegisterContainerActionCreators from './actions';

export function RegisterContainer(props) {
  const { actions } = props;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    actions.registerAction({ username, email, password });
  };

  return (
    <div>
      <h1>Register</h1>
      <br />
      <label>
        Username:
        <input
          type="text"
          name="email"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
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
      <button onClick={() => handleRegister()}>Submit</button>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: false,
  // errorLoading: selectError(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(RegisterContainerActionCreators, dispatch),
});

const ConnectedRegisterContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(RegisterContainer);

export default ConnectedRegisterContainer;
