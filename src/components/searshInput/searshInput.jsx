import React, { Component } from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import {
  GET_CLASSES_BY_NAME,
  GET_COURSES_BY_NAME,
  GET_USERS_BY_NAME
} from "../../graphql/coursesQL";
import Loading from "../Loading/Loading";

import "./searshInput.css";

const Courses = ({ name, handleCourseDetails }) => {
  return (
    <Query query={GET_COURSES_BY_NAME} variables={{ name }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <p>Error :(</p>;
        console.log(data.findCourseByName);
        return data.findCourseByName.map(c => (
          <div
            className="row line"
            key={c.id}
            onClick={() => handleCourseDetails(c.id)}
          >
            <img src={c.imageUrl} alt={c.name} />
            <p>{c.name}</p>
          </div>
        ));
      }}
    </Query>
  );
};

const users = ({ name }) => {
  return (
    <Query query={GET_USERS_BY_NAME} variables={{ name }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <p>Error :(</p>;
        console.log(data.findUserByName);
        return data.findUserByName.map(c => <p key={c.id}>{c.name}</p>);
      }}
    </Query>
  );
};
const Classes = ({ name }) => {
  return (
    <Query query={GET_CLASSES_BY_NAME} variables={{ name }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return <p>Error :(</p>;
        console.log(data.classByName);
        return data.classByName.map(c => (
          <div className="row line" key={c.id}>
            <p className="col-md-8" style={{ right: 70 }}>
              {c.name}
            </p>
            <span className="col">{c.subscribers.length} Followers</span>
          </div>
        ));
      }}
    </Query>
  );
};

class searshInput extends Component {
  state = {
    input: null
  };
  handleChange = e => {
    this.setState({ input: e.target.value });
  };
  handleCourseDetails = id => {
    console.log(this.props);
    this.props.history.push({ pathname: `/CourseDetails/${id}` });
    window.location.reload();
  };
  render() {
    let widget = null;
    if (this.state.input) {
      widget = (
        <div className="res">
          <h3>courses :</h3>

          <Courses
            name={this.state.input}
            handleCourseDetails={id => this.handleCourseDetails(id)}
          />

          <h3>classes :</h3>

          <Classes name={this.state.input} />
        </div>
      );
    }
    return (
      <>
        <div className="col-md-12">
          <input
            type="text"
            placeholder="searsh for courses,classes"
            onChange={this.handleChange}
          />
          {widget}
        </div>
      </>
    );
  }
}
export default withRouter(searshInput);
