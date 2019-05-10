import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_COURSE_BY_ID, GET_COURSE_NOTE } from "../../graphql/coursesQL";
import Loading from "../Loading/Loading";
import { Details } from "./Details/Details";
import "./DetailCourse.css";
import ActionBar from "./Details/ActionBar";
import Reviews from "./Reviews/Reviews";
class DetailCourse extends Component {
  state = {
    tab: "home",
    id: this.props.match.params.id,
    content: <Details />
  };

  handleTab = async e => {
    console.log("clicked");
    console.log(e.target.innerHTML);
    switch (e.target.innerHTML) {
      case "Reviews":
        this.setState({ content: <Reviews id={this.state.id} /> });
        break;
      case "About":
        this.setState({ content: <Details /> });
        break;
      default:
        break;
    }
    await this.setState({ tab: "reveiw" });
  };
  render() {
    const id = this.state.id;

    return (
      <>
        <Query query={GET_COURSE_BY_ID} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <p>error :D</p>;
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
                      <ul />
                    </div>
                    <div className="col-md-4 offset-md-2" id="followers">
                      <p>
                        <span className="highlight">
                          {classe && classe.subscribers.length}{" "}
                          <i className="fas fa-eye" />{" "}
                        </span>
                        are subscribed to this classe
                      </p>
                    </div>
                  </div>
                  <ActionBar handleTab={e => this.handleTab(e)} />
                  <div className="container">{this.state.content}</div>
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
