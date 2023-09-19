import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
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
