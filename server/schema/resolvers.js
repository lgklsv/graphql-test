const { UserList, MovieList } = require('../fakeData');
const _ = require('lodash');

const resolvers = {
  Query: {
    // User resolvers
    users: (parent, args, context, info) => {
      // Here should be an Api call to the data base to get the results
      if (UserList) return { users: UserList };

      return { message: 'There was an error' };
    },
    user: (parent, args, context, info) => {
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
  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => movie.year <= 2010 && movie.year >= 2000);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === +id) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },
    deleteUser: (parent, args) => {
      const { id } = args;
      _.remove(UserList, (user) => user.id === +id);
      return null;
    },
  },

  UsersResult: {
    __resolveType(obj) {
      if (obj.users) {
        return 'UsersSuccessfulResult';
      }

      if (obj.message) {
        return 'UsersErrorResult';
      }
      return null;
    },
  },
};

module.exports = { resolvers };
