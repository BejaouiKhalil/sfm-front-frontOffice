import React from "react";
import "./course.css";

const course = ({ course, handleCourseDetails, handleSubscribe }) => {
  return (
    <>
      <div className="flex-grid-item col-md-4" id="course">
        <div className="ss-card ss-class">
          <div className="ss-card--top-el skillshare-original-gradient" />
          <label className="ss-card--top-el skillshare-original" />
          <a
            className="ss-card__thumbnail js-class-preview"
            onClick={() => handleCourseDetails(course.id)}
          >
            <div
              className="ss-card__thumbnail-img-holder"
              style={{
                backgroundImage: `url(${course.imageUrl})`
              }}
            >
              <div className="play-button ss-icon-nsk-play-arrow-rounded ss-card--top-el" />
            </div>
          </a>
          <div className="ss-card__content">
            <div className="ss-class__stats ">
              <div className="ss-class__stats__duration ss-icon-outline-clock">
                51m
              </div>

              <span className="ss-class__stats__stud-count">
                {course.classe && course.classe.subscribers.length} students
              </span>
            </div>
            <p className="ss-card__title">{course.name}</p>
            <div className="ss-card__teacher-placeholder">
              <div className="user-information small">
                <p className="title ellipsis">
                  {course.author && course.author.name}
                </p>
              </div>
            </div>
            <div
              className="wishlist-button-container"
              onClick={() => handleSubscribe(course.classe.id)}
            >
              save
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default course;
