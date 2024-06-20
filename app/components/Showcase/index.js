// Chakra imports
import {
  Box,
  Button,
  Text,
  Flex,
  Link,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';

export default function HoursSpent(props) {
  const { children, ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('brand.400', 'white');
  return (
    <Flex direction="column" align="center" {...rest}>
      <Box w="100%">{children}</Box>

      <Text
        color={textColor}
        fontWeight="500"
        mx="auto"
        w="max-content"
        mt="50px"
      >
        This bar chart is a component from{' '}
        <Link
          mx="3px"
          color={textColorSecondary}
          href="https://www.horizon-ui.com?ref=codesandbox"
          target="_blank"
          fontWeight="700"
        >
          Horizon UI Dashboard.
        </Link>{' '}
      </Text>
      <Button w="max-content" mt="16px" size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </Flex>
  );
}
