const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    savedLaunches: [Launch]
  }
  
  type Auth {
    token: ID!
    user: User
  }
  
  type Launch {
    launchId: String!
    launch_name: String!
    start_date: String!
    end_date: String!
    location: String!
    videos: [String]
  }

  input LaunchInput {
    launchId: String!
    launch_name: String!
    start_date: String!
    end_date: String!
    location: String!
    videos: [String]
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveLaunch(launchData: LaunchInput!): User
  }
`;

module.exports = typeDefs;
