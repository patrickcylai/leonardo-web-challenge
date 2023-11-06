import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export type Country = {
  code: string;
  name: string;
  capital: string;
  emoji: string;
};

export default function CountriesTable({
  countries,
}: {
  countries: Country[];
}) {
  return (
    <TableContainer p="20">
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Code</Th>
            <Th>Capital</Th>
            <Th>Emoji</Th>
          </Tr>
        </Thead>
        <Tbody>
          {countries.map((country, index) => (
            <Tr key={index}>
              <Td>{country.name}</Td>
              <Td>{country.code}</Td>
              <Td>{country.capital}</Td>
              <Td>{country.emoji}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
