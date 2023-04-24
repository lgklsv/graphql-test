import { useQuery, gql, useLazyQuery } from '@apollo/client';
import React from 'react';

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

const DisplayData = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [movieSearched, setMovieSearched] = React.useState('');
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  if (data) console.log(data);

  if (error) {
    console.log(error);
  }

  if (movieError) {
    console.log(movieError);
  }

  return (
    <div>
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
