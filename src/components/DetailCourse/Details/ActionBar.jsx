import React from "react";
import "./Details.css";

export const ActionBar = ({ handleTab }) => (
  <div className="container">
    <div className="row" id="details">
      <div className="col-md-8 underline-tabs populated">
        <ul className="list clear">
          <li className="tab left" onClick={e => handleTab(e)}>
            About
          </li>
          <li className="tab left" onClick={e => handleTab(e)}>
            Reviews
          </li>
          <li className="tab left" onClick={e => handleTab(e)}>
            Tests
          </li>
          <li className="tab left" onClick={e => handleTab(e)}>
            Videos
          </li>
        </ul>
        <div className="underline" />
      </div>
      <div className="col-md-4" id="buttons-container">
        <a className="button alt-charcoal-ghost">Save</a>
        <span> </span>
        <a className="button alt-charcoal-ghost">share</a>
      </div>
    </div>
  </div>
);

export default ActionBar;
