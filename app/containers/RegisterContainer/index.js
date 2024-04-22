import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as RegisterContainerActionCreators from './actions';
import {Button, Flex, Heading, Input} from "@chakra-ui/react";

export function RegisterContainer(props) {
  const { actions } = props;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    actions.registerAction({ username, email, password });
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
        <Heading mb={6} ml={10}>Register</Heading>
        <Input
          placeholder="name"
          type="text"
          variant="filled"
          value={username}
          onChange={e => setUsername(e.target.value)}
          mb={3}
        />
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
          onClick={() => handleRegister()}
        >
          Register
        </Button>
      </Flex>
    </Flex>
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
