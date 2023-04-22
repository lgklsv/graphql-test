const { UserList, MovieList } = require('../fakeData');
const _ = require('lodash');

const resolvers = {
  Query: {
    // User resolvers
    users: () => {
      // Here should be an Api call to the data base to get the results
      return UserList;
    },
    user: (parent, args) => {
      const { id } = args;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    // Movie resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const { name } = args;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
};

module.exports = { resolvers };
