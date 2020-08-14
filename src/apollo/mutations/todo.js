import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation createTodo($input: NewEntryInput!) {
    createEntry(input: $input) {
      entry {
        id
        body
      }
    }
  }
`;
