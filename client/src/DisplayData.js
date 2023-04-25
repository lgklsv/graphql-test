import React from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetMovies {
    movies {
      name
      year
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      year
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = React.useState('');

  // Create user state
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [age, setAge] = React.useState('');
  const [nationality, setNationality] = React.useState('');

  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  return (
    <div>
      <div>
        <input type='text' placeholder='Name...' onChange={(e) => setName(e.target.value)} />
        <input
          type='text'
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type='number' placeholder='Age...' onChange={(e) => setAge(e.target.value)} />
        <input
          type='text'
          placeholder='Nationality...'
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  username,
                  age: +age,
                  nationality,
                },
              },
            });
            refetch();
          }}>
          Create User
        </button>
      </div>
      {data &&
        data.users.map((item) => {
          return (
            <div>
              <h1>Name: {item.name}</h1>
              <h1>Username: {item.username}</h1>
              <h1>Age: {item.age}</h1>
              <h1>Nationality: {item.nationality}</h1>
            </div>
          );
        })}
      <br />
      {movieData &&
        movieData.movies.map((movie) => {
          return <h1>{movie.name}</h1>;
        })}
      <div>
        <input
          type='text'
          placeholder='Movie title...'
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button
          onClick={() =>
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            })
          }>
          Search
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>Movie name: {movieSearchedData.movie.name}</h1>
              <h1>Movie year: {movieSearchedData.movie.year}</h1>
            </div>
          )}
          {movieError && <h1>There was an error fetching the data</h1>}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
