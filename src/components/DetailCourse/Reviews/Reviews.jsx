import React, { Component } from "react";
import "./Reviews.css";
import Rating from "react-rating";

class Reviews extends Component {
  state = {
    newNote: 0,
    Note: null
  };
  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-8">
            <h1>liste des reviews :</h1>
          </div>
          <div className="col-md-4" id="moy-review">
            <h1> Moyenne :</h1>
            <Rating
              emptySymbol="far fa-star fa-2x"
              fullSymbol="fas fa-star fa-2x"
              initialRating={3.5}
              readonly
            />
          </div>
        </div>
        <div className="row col-md-8" id="new_review">
          <img
            src="https://www.flynz.co.nz/wp-content/uploads/profile-placeholder.png"
            className="float-left"
            alt=""
          />
          <div className="col-md-9">
            <label>Note: </label>
            <Rating
              emptySymbol="far fa-star fa-1x"
              fullSymbol="fas fa-star fa-1x"
              fractions={2}
              onChange={Rate => {
                this.state.newNote = Rate;
                console.log(this.state.newNote);
              }}
            />
            <br />
            <label>commentaire :</label>
            <textarea />
            <a className="button alt-charcoal-ghost float-right">Envoyer</a>
          </div>
        </div>
      </>
    );
  }
}

export default Reviews;
