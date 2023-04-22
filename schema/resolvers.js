const { UserList } = require('../fakeData');
const _ = require('lodash');

const resolvers = {
  Query: {
    users: () => {
      // Here should be an Api call to the data base to get the results
      return UserList;
    },
    user: (parent, args) => {
      const { id } = args;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
  },
};

module.exports = { resolvers };
