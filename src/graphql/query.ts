import { gql } from '@apollo/client';

export const GET_COUNTIRES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      emoji
    }
  }
`;
