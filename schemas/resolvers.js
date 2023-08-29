const { User, Launch } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    }
  }, 

  Mutation: {
    addUser: async(parent, args) => {
      return await User.create(args);
    }
  }
};

module.exports = resolvers;