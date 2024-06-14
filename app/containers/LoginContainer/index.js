import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as LoginContainerActionCreators from './actions';
import { userIsNotAuthenticated } from '../../store';
import { selectIsLoading, selectError, selectErrorMessages } from './selectors';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  FormControl,
  FormLabel,
  useColorModeValue,
  Stack,
  Box,
  Link,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { isEmpty } from 'lodash';

export function LoginContainer(props) {
  const { actions } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [emailMessages, setEmailMessages] = useState([]);
  const [passwordMessages, setPasswordMessages] = useState([]);

  useEffect(() => {
    setErrorMessages(
      !isEmpty(props.errorMessages?.error) ? props.errorMessages?.error : [],
    );
    setEmailMessages(
      !isEmpty(props.errorMessages?.email) ? props.errorMessages?.email : [],
    );
    setPasswordMessages(
      !isEmpty(props.errorMessages?.password)
        ? props.errorMessages?.password
        : [],
    );
  }, [props]);

  const handleLogin = () => {
    setPasswordMessages([]);
    setEmailMessages([]);
    setErrorMessages([]);
    actions.signInAction({ email, password });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgImage:
          'https://evocharge.com/wp-content/uploads/2021/02/GettyImages-1249775796.jpg',
        bgSize: 'cover',
        bgPosition: 'center',
        bgRepeat: 'no-repeat',
        bgAttachment: 'fixed',
        opacity: 0.5,
      }}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} zIndex={1}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Log in
          </Heading>
          <Text fontSize={'lg'} color={'gray.900'} fontWeight={'bold'}>
            to start using charging station the good way ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel width={'60rem'}>Email address</FormLabel>
              <Input
                placeholder="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                mb={3}
              />
            </FormControl>
            <FormControl id="password" isRequired mb={6}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bgGradient="linear(to-r, green.400,blue.400)"
                color={'white'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                onClick={() => handleLogin()}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't have an account?{' '}
                <Link
                  color={'blue.400'}
                  as="a"
                  href="#"
                  onClick={() => window.history.pushState({}, '', '/register')}
                >
                  Register here
                </Link>
              </Text>
            </Stack>
          </Stack>
          {!isEmpty(emailMessages) && (
            <Flex justify="center" align="center" mt={7}>
              <Box width="100%">
                <Alert status="error">
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{emailMessages[0]}</AlertDescription>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={() => setEmailMessages([])}
                  />
                </Alert>
              </Box>
            </Flex>
          )}
          {!isEmpty(passwordMessages) && (
            <Flex justify="center" align="center" mt={7}>
              <Box width="100%">
                <Alert status="error">
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{passwordMessages[0]}</AlertDescription>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={() => setPasswordMessages([])}
                  />
                </Alert>
              </Box>
            </Flex>
          )}
          {!isEmpty(errorMessages) && (
            <Flex justify="center" align="center" mt={7}>
              <Box width="100%">
                <Alert status="error">
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{errorMessages[0]}</AlertDescription>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={() => setErrorMessages([])}
                  />
                </Alert>
              </Box>
            </Flex>
          )}
        </Box>
      </Stack>
    </Flex>
  );
}

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  errorLoading: selectError(state),
  errorMessages: selectErrorMessages(state),
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
