import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_LAUNCH = gql`
  mutation saveLaunch($launchData: LaunchInput!) {
    saveLaunch(launchData: $launchData) {
      _id
      username
      email
      savedLaunches {
        launchId
        launch_name
        location
        start_date
        end_date
        videos
      }
    }
  }
`;

export const REMOVE_LAUNCH = gql`
mutation removeLaunch($launchId: ID!) {
  removeLaunch(launchId: $launchId) {
    _id
    username
    email
    savedLaunches {
      launchId
      launch_name
      location
      start_date
      end_date
      videos
    }
  }
}
`