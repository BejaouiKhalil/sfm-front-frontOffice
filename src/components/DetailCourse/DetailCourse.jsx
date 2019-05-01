import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_COURSE_BY_ID } from "../../graphql/coursesQL";
import Loading from "../Loading/Loading";
import { Details } from "./Details/Details";
import "./DetailCourse.css";
class DetailCourse extends Component {
  state = {
    Course: null,
    id: this.props.match.params.id
  };

  render() {
    const id = this.state.id;

    return (
      <>
        <Query query={GET_COURSE_BY_ID} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <p>{Error} :D</p>;
            if (data) {
              const {
                id,
                name,
                imageUrl,
                type,
                contenu,
                classe,
                author
              } = data.course;
              return (
                <>
                  <div className="row" id="video-region">
                    <div className="col-md-4 offset-md-2" id="titles">
                      <h1 className="class-details-header-name">{name}</h1>
                      <h4
                        className="class-details-header-teacher"
                        style={{ opacity: 1 }}
                      >
                        {author.name}
                      </h4>
                    </div>

                    <div className="col-md-5 offset-md-2" id="img-container">
                      <img src={imageUrl} className="img-fluid" alt={name} />
                    </div>
                    <div className="col-md-4" id="content">
                      <ul>
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                      </ul>
                    </div>
                    <div className="col-md-4 offset-md-2" id="followers">
                      <p>
                        {contenu && contenu.length} en train de suivre ce cours
                      </p>
                    </div>
                  </div>
                  <Details />
                </>
              );
            }
          }}
        </Query>
      </>
    );
  }
}

export default DetailCourse;
