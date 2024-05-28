import React, { useEffect, useState } from 'react';
import {
  FiActivity,
  FiBell,
  FiChevronDown,
  FiBookOpen,
  FiCompass,
  FiHeart,
  FiHome,
  FiLogOut,
  FiMenu,
  FiUser,
} from 'react-icons/fi';
import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import store from '../../store';

function base64toFile(base64String, filename, contentType) {
  const byteCharacters = atob(base64String); // Decode base64 string
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new File([byteArray], filename, { type: contentType });
  return URL.createObjectURL(file);
}

function NavBar() {
  const LinkItems = [
    { name: 'My cars', icon: FiHome, href: '/' },
    { name: 'Favourites', icon: FiHeart, href: '/favourites' },
    { name: 'Map', icon: FiCompass, href: '/map' },
    { name: 'Active Bookings', icon: FiBookOpen, href: '/bookings' },
    { name: 'Booking History', icon: FiActivity, href: '/order-history' },
    { name: 'Profile', icon: FiUser, href: '/profile' },
    { name: 'Log Out', icon: FiLogOut, href: '/login' },
  ];
  const [userInfo, setUserInfo] = useState(null);
  const defaultImage =
    'https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg';

  useEffect(() => {
    const {
      global: { user },
    } = store.getState();

    const { profileContainer } = store.getState();
    if (user && user.user) {
      setUserInfo(user.user);
    }
  }, []);

  const SidebarContent = ({ onClose, ...rest }) => (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          ChargeTIM
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          mt={4}
          key={link.name}
          icon={link.icon}
          onClick={() => window.history.pushState({}, '', link.href)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );

  const NavItem = ({ icon, children, ...rest }) => (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );

  const MobileNav = ({ onOpen, ...rest }) => (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        ChargeTIM
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size="md"
                  src={
                    userInfo?.profile_photo
                      ? base64toFile(userInfo?.profile_photo, 'image', 'jpeg')
                      : defaultImage
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{userInfo?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {userInfo?.role ? 'Contributor' : 'User'}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem
                as="a"
                href="#"
                onClick={() => window.history.pushState({}, '', '/profile')}
              >
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem
                as="a"
                href="#"
                onClick={() => window.history.pushState({}, '', '/login')}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      {/* <Box ml={{ base: 0, md: 60 }} p="4"> */}
      {/*  /!* Content *!/ */}
      {/* </Box> */}
    </Box>
  );
}

export default NavBar;
