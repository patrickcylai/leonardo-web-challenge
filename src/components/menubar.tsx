import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';

export default function Menubar({
  heading,
  username,
  jobTitle,
}: {
  heading: string;
  username: string;
  jobTitle: string;
}) {
  const handleSignOut = async () => {
    localStorage.removeItem('username');
    localStorage.removeItem('jobTitle');
    localStorage.removeItem('hasSetupAccount');
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box borderRadius="lg" p="2" bg="teal.300">
        <Heading color="white" size="lg">
          Leo Challenge
        </Heading>
      </Box>
      <Box p="2">
        <Heading size="md">{heading}</Heading>
      </Box>
      <Spacer />
      <Box p="2">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {username} - {jobTitle}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
