import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Loading from "./Loading/Loading";

const GetCategories = ({ handleCategories }) => (
  <Query
    query={gql`
      query {
        classes {
          id
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <p>Error :(</p>;

      return data.classes.map(({ id, name }) => (
        <li key={id} onClick={() => handleCategories(id)}>
          <a>{name}</a>
        </li>
      ));
    }}
  </Query>
);

export default GetCategories;
