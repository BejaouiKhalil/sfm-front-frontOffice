import React from "react";

export const ActionBar = () => (
  <div className="row" id="details">
    <div className="col-md-8 underline-tabs populated">
      <ul className="list clear">
        <li className="tab left active">
          <a
            href="https://www.skillshare.com/classes/Java-Basics-For-Complete-Beginners-%E2%9C%85/330257664"
            data-text="About"
            data-type=""
          >
            About
          </a>
        </li>
        <li className="tab left">
          <a
            href="https://www.skillshare.com/classes/Java-Basics-For-Complete-Beginners-%E2%9C%85/330257664/reviews"
            className="reviews"
            data-text="Reviews"
            data-type=""
          >
            Reviews <span className="count">137</span>
          </a>
        </li>
        <li className="tab left">
          <a
            href="https://www.skillshare.com/classes/Java-Basics-For-Complete-Beginners-%E2%9C%85/330257664/classNameroom/discussions"
            className="community"
            data-text="Community"
            data-type=""
          >
            Tests <span className="count">10</span>
          </a>
        </li>
        <li className="tab left">
          <a
            href="https://www.skillshare.com/classNamees/Java-Basics-For-Complete-Beginners-%E2%9C%85/330257664/projects"
            data-text="All Projects"
            data-type=""
          >
            Videos <span className="count">19</span>
          </a>
        </li>
      </ul>
      <div className="underline" />
    </div>
    <div className="col-md-4" id="buttons-container">
      <a className="button alt-charcoal-ghost">Save</a>
      <a className="button alt-charcoal-ghost">share</a>
    </div>
  </div>
);

export default ActionBar;
