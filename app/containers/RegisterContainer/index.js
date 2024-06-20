import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as RegisterContainerActionCreators from './actions';
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
  Switch,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { isEmpty } from 'lodash';
import { selectErrorMessages } from './selectors';

export function RegisterContainer(props) {
  const { actions } = props;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState('User');
  const [errorMessages, setErrorMessages] = useState([]);
  const [emailMessages, setEmailMessages] = useState([]);
  const [passwordMessages, setPasswordMessages] = useState([]);
  const [nameMessages, setNameMessages] = useState([]);
  const [addressMessages, setAddressMessages] = useState([]);

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
    setAddressMessages(
      !isEmpty(props.errorMessages?.address)
        ? props.errorMessages?.address
        : [],
    );
    setNameMessages(
      !isEmpty(props.errorMessages?.name) ? props.errorMessages?.name : [],
    );
  }, [props]);

  const handleRegister = () => {
    setPasswordMessages([]);
    setEmailMessages([]);
    setErrorMessages([]);
    setNameMessages([]);
    setAddressMessages([]);
    actions.registerAction({
      username,
      email,
      password,
      address,
      role: isChecked ? 1 : 0,
    });
  };
  const handleToggle = () => {
    setRole(isChecked ? 'User' : 'Contributor');
    setIsChecked(!isChecked);
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
          'https://autovista24.autovistagroup.com/wp-content/uploads/sites/5/2022/08/GettyImages-1396668729.jpg',
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
            Create an account
          </Heading>
          <Text fontSize={'lg'} color={'gray.900'} fontWeight={'bold'}>
            to start using charging stations the good way ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="userName" isRequired>
              <FormLabel width={'60rem'}>Username</FormLabel>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel width={'60rem'}>Email address</FormLabel>
              <Input
                placeholder="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
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
            <FormControl id="address">
              <FormLabel width={'60rem'}>Address</FormLabel>
              <Input
                placeholder="address"
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                mb={3}
              />
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel width={'60rem'}>Role</FormLabel>
              <Flex direction="row" justify="space-between" align="center">
                <Text align={'center'} fontSize={'xl'}>
                  {role}
                </Text>
                <Switch
                  colorScheme="teal"
                  size="lg"
                  id="isChecked"
                  isChecked={isChecked}
                  onChange={handleToggle}
                />
              </Flex>
            </FormControl>
            <Text>
              change now to a contributor account to start adding your own
              stations for usage!
            </Text>
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
                onClick={() => handleRegister()}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already have an account?{' '}
                <Link
                  color={'blue.400'}
                  as="a"
                  href="#"
                  onClick={() => window.history.pushState({}, '', '/login')}
                >
                  Login here
                </Link>
              </Text>
            </Stack>
          </Stack>
          {!isEmpty(nameMessages) && (
            <Flex justify="center" align="center" mt={7}>
              <Box width="100%">
                <Alert status="error">
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{nameMessages[0]}</AlertDescription>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={() => setNameMessages([])}
                  />
                </Alert>
              </Box>
            </Flex>
          )}
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
          {!isEmpty(addressMessages) && (
            <Flex justify="center" align="center" mt={7}>
              <Box width="100%">
                <Alert status="error">
                  <AlertIcon />
                  <Box flex="1">
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{addressMessages[0]}</AlertDescription>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={() => setAddressMessages([])}
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
  isLoading: false,
  errorMessages: selectErrorMessages(state),
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
