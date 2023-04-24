import { useQuery, gql } from '@apollo/client';
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

const DisplayData = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }

  if (data) console.log(data);

  if (error) {
    console.log(error);
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
    </div>
  );
};

export default DisplayData;
