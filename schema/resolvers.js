const { UserList } = require('../fakeData');

const resolvers = {
  Query: {
    users() {
      // Here should be an Api call to the data base to get the results
      return UserList;
    },
  },
};

module.exports = { resolvers };
