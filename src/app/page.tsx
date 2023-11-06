'use client';

import WelcomeModal from '@/components/welcomeForm/welcomeModal';
import { useEffect, useState } from 'react';
import Menubar from '@/components/menubar';
import { useUser } from '@/providers/UserProvider';
import { useQuery } from '@apollo/client';
import { GET_COUNTIRES } from '@/graphql/query';
import client from '@/graphql/client';
import CountriesTable from '@/components/countriesTable';
import { hasSetupAccount } from '@/util/utils';
import {
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function App() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin');
    },
  });
  const { data, loading, error } = useQuery(GET_COUNTIRES, {
    client,
  });
  const { username, jobTitle } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!hasSetupAccount()) {
      setOpenModal(true);
    }
  }, []);

  if (status === 'loading') {
    return (
      <Flex
        width="100vw"
        height="100vh"
        alignContent="center"
        justifyContent="center"
      >
        <Center>
          <Spinner size="xl" />
        </Center>
      </Flex>
    );
  }

  return (
    <>
      <WelcomeModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          localStorage.setItem('hasSetupAccount', 'true');
          toast({
            title: 'Finish setting up your account',
            description: 'Your username and job title has been set.',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'bottom-right',
          });
        }}
      />
      <Menubar
        heading="List of Countries"
        username={username}
        jobTitle={jobTitle}
      />
      <Text mt="10" pl="10">
        Here is a list of countries in the world data is sourced from
        https://countries.trevorblades.com graphql API.
      </Text>
      {data && <CountriesTable countries={data.countries} />}
      <Flex
        width="100vw"
        height="100vh"
        alignContent="center"
        justifyContent="center"
      >
        {error && (
          <Heading>An error occurred while fetching countries data.</Heading>
        )}
        {loading && (
          <Center>
            <VStack>
              <Heading>Loading countries...</Heading>
              <Spinner />
            </VStack>
          </Center>
        )}
      </Flex>
    </>
  );
}
