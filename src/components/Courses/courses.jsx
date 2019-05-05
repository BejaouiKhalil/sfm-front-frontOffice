import React, { Component } from "react";
import { Query } from "react-apollo";
import Categorie from "../categorie";
import Course from "../Course/course";
import { GET_ALL_COURSES } from "../../graphql/coursesQL";
import Loading from "../Loading/Loading";
import "./Courses.css";

class Courses extends Component {
  state = {
    courses: null,
    new: null
  };

  handleCategorie = async id => {
    const coursesList = this.state.courses.filter(
      course => course.classe.id === id
    );
    this.setState({ new: coursesList });
  };
  handleCourseDetails = id => {
    this.props.history.push({ pathname: `/CourseDetails/${id}` });
  };
  handleSubscribe = id => {
    console.log(id);
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3" id="categories" style={{ left: 20 }}>
            <h3>Classes:</h3>
            <Categorie handleCategories={id => this.handleCategorie(id)} />
          </div>
          <div className="col-md-9" id="courses">
            <div className="row">
              <Query query={GET_ALL_COURSES}>
                {({ data, loading, error }) => {
                  if (loading) return <Loading />;
                  if (data.courses.length) {
                    if (!this.state.new) {
                      this.state.courses = data.courses;
                      console.log(this.state.courses);
                      return this.state.courses.map(course => (
                        <Course
                          key={course.id}
                          course={course}
                          handleCourseDetails={id =>
                            this.handleCourseDetails(id)
                          }
                          handleSubscribe={id => this.handleSubscribe(id)}
                        />
                      ));
                    }
                    return this.state.new.map(course => (
                      <Course
                        key={course.id}
                        course={course}
                        handleCourseDetails={id => this.handleCourseDetails(id)}
                        handleSubscribe={id => this.handleSubscribe(id)}
                      />
                    ));
                  }
                  return <h1>Pas encore de cours</h1>;
                }}
              </Query>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Courses;
