import React, { Component } from "react";
import "./Reviews.css";
import Rating from "react-rating";
import { GET_COURSE_NOTE, GET_ALL_RATES } from "../../../graphql/coursesQL";
import { Query } from "react-apollo";
import Loading from "../../Loading/Loading";
import Notif from "../../notif/notif";
class Reviews extends Component {
  state = {
    newNote: 0,
    Notes: null,
    comment: null,
    id: this.props.id,
    notif: null
  };
  handleSubmit = async () => {
    const requestBody = {
      query: `
      mutation {
        addRate(
          input: {
            vote: ${this.state.newNote}
            comment: "${this.state.comment}"
            courseId: "${this.state.id}"
          }
        ) {
          id
        }
      }
        `
    };

    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(res);

    this.setState({
      notif: <Notif message="commentaire ajouté avec succés !" etat="success" />
    });
  };
  handleInput = async event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  };
  closeAlert = () => {
    this.setState({ notif: null });
  };
  render() {
    const id = this.state.id;

    return (
      <>
        <div className="row">
          <div className="col-md-8">
            <h1>Reviews : </h1>
            <div id="list_review">
              <Query query={GET_ALL_RATES} variables={{ course: id }}>
                {({ loading, error, data, refetch }) => {
                  if (loading) return <Loading />;
                  if (error) return <p>aucun review</p>;
                  if (this.state.notif) refetch();
                  return data.rates.map(rate => (
                    <div key={rate.id} className="row">
                      <img
                        src="https://www.flynz.co.nz/wp-content/uploads/profile-placeholder.png"
                        className="float-left"
                        alt=""
                      />
                      <div className="col-md-9">
                        <label>Rate: </label>
                        <Rating
                          emptySymbol="far fa-star fa-1x"
                          fullSymbol="fas fa-star fa-1x"
                          initialRating={rate.vote}
                          readonly
                        />
                        <br />

                        <p>{rate.comment}</p>
                      </div>
                    </div>
                  ));
                }}
              </Query>
            </div>
          </div>
          <div className="col-md-4" id="moy-review">
            <h1> Rate :</h1>
            <Query query={GET_COURSE_NOTE} variables={{ course: id }}>
              {({ loading, error, data, refetch }) => {
                if (loading) return <Loading />;
                if (error) return <p>no reviews</p>;
                if (this.state.notif) refetch();
                return (
                  <Rating
                    emptySymbol="far fa-star fa-2x"
                    fullSymbol="fas fa-star fa-2x"
                    initialRating={data.Moyrates}
                    readonly
                  />
                );
              }}
            </Query>
          </div>
        </div>
        <h1>New comment :</h1>
        <div onClick={this.closeAlert}>{this.state.notif}</div>
        <div className="row col-md-8" id="new_review">
          <img
            src="https://www.flynz.co.nz/wp-content/uploads/profile-placeholder.png"
            className="float-left"
            alt=""
          />
          <div className="col-md-9">
            <label>Rate: </label>
            <Rating
              emptySymbol="far fa-star fa-1x"
              fullSymbol="fas fa-star fa-1x"
              fractions={2}
              initialRating={this.state.newNote}
              onChange={Rate => {
                this.state.newNote = Rate;
                console.log(this.state.newNote);
              }}
            />
            <br />
            <label>comment :</label>
            <textarea name="comment" onChange={e => this.handleInput(e)} />
            <a
              className="button alt-charcoal-ghost float-right"
              onClick={this.handleSubmit}
            >
              Send
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Reviews;
