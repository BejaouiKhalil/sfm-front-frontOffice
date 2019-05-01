import { gql } from "apollo-boost";

export const GET_ALL_COURSES = gql`
  query {
    courses {
      id
      name
      type
      imageUrl
      classe {
        id
        name
      }
      author {
        name
      }
    }
  }
`;
export const GET_COURSES_BY_CLASSE = null;
export const GET_COURSES_BY_NAME = gql`
  query findCourseByName($name: String!) {
    findCourseByName(name: $name) {
      id
      name
      imageUrl
      type
    }
  }
`;
export const GET_CLASSES_BY_NAME = gql`
  query classByName($name: String!) {
    classByName(name: $name) {
      id
      name
      subscribers {
        id
      }
    }
  }
`;
export const GET_COURSE_BY_ID = gql`
  query course($id: ID!) {
    course(id: $id) {
      id
      name
      type
      contenu
      imageUrl
      classe {
        id
        name
      }
      author {
        name
      }
    }
  }
`;
export const GET_USERS_BY_NAME = gql`
  query findUserByName($name: String!) {
    findUserByName(name: $name) {
      id
      name
    }
  }
`;
