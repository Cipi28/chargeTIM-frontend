import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as LoginContainerActionCreators from './actions';
import { userIsNotAuthenticated } from '../../store';
import { selectIsLoading, selectError } from './selectors';
import {
  Flex,
  Heading,
  Input,
  Button,
} from '@chakra-ui/react';

export function LoginContainer(props) {
  const { actions } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    actions.signInAction({ email, password });
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg="gray.100"
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6} ml={14}>Log In</Heading>
        <Input
          placeholder="email"
          type="email"
          variant="filled"
          value={email}
          onChange={e => setEmail(e.target.value)}
          mb={3}
        />
        <Input
          placeholder="password"
          type="password"
          variant="filled"
          value={password}
          onChange={e => setPassword(e.target.value)}
          mb={6}
        />
        <Button
          colorScheme="teal"
          mb={8}
          onClick={() => handleLogin()}
        >
          Log In
        </Button>
      </Flex>
    </Flex>
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

// export default userIsNotAuthenticated(ConnectedLoginContainer);
export default ConnectedLoginContainer;
