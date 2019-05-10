import React, { Component } from "react";
import { Link } from "react-router-dom";

import PubSub from "pubsub-js";
import "./nav.scss";
import SearshInput from "../searshInput/searshInput";
class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.logoutclick = this.logoutclick.bind(this);
  }
  logoutclick() {
    PubSub.publish("IS_LOGIN", {
      status: false,
      token: window.localStorage.getItem("accessToken"),
      callback: () => {
        this.props.history.push("/login");
      }
    });
  }
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="site-header js-site-header-container">
          <div className="site-header-logo">
            <a
              href="https://www.skillshare.com/?via=header"
              className="site-header-logo-image js-site-header-logo"
            />
          </div>
          <div className="site-header-nav site-header-nav-left">
            <div className="nav-item">
              <a
                href="https://www.skillshare.com/home?via=header"
                className="nav-item-link primary no-bold"
              >
                Home
              </a>
            </div>
            <div className="nav-item">
            <Link to="/events" className="nav-item-link primary no-bold">
                  <span>Events</span>
                </Link>
            </div>
            <div className="nav-item">
            <Link to="/myevents" className="nav-item-link primary no-bold">
                  <span>My Events</span>
                </Link>
            </div>
            <div className="nav-item ">
              <a
                className="nav-item-link no-bold js-nav-link-browse initialized"
                href="https://www.skillshare.com/browse?via=header"
              >
                <Link to="/Courses" className="nav-item-link primary no-bold">
                  <span>Courses</span>
                </Link>
              </a>
              <div className="popover shadow bottom">
                <div className="inner-popover">
                  <div className="arrow left" />
                  <div className="content">
                    <div className="nav-menu-list">
                      <div className="nav-menu-categories">
                        <ul className="nav-menu-category-list">
                          <li className="nav-menu-category">
                            <a
                              className="primary"
                              href="https://www.skillshare.com/browse/creative?via=header"
                            >
                              Creative
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/animation?via=header"
                            >
                              Animation
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/film-production?via=header"
                            >
                              Film Production
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/fine-art?via=header"
                            >
                              Fine Art
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/graphic-design?via=header"
                            >
                              Graphic Design
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/illustration?via=header"
                            >
                              Illustration
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/music-production?via=header"
                            >
                              Music Production
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/photography?via=header"
                            >
                              Photography
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/ui-ux-design?via=header"
                            >
                              UI/UX Design
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/writing?via=header"
                            >
                              Writing
                            </a>
                          </li>
                        </ul>
                        <ul className="nav-menu-category-list">
                          <li className="nav-menu-category">
                            <a
                              className="primary"
                              href="https://www.skillshare.com/browse/business?via=header"
                            >
                              Business
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/accounting?via=header"
                            >
                              Accounting
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/business-analytics?via=header"
                            >
                              Business Analytics
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/entrepreneurship?via=header"
                            >
                              Entrepreneurship
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/finance?via=header"
                            >
                              Finance
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/freelance?via=header"
                            >
                              Freelance
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/leadership?via=header"
                            >
                              Leadership
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/management?via=header"
                            >
                              Management
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/marketing?via=header"
                            >
                              Marketing
                            </a>
                          </li>
                          <li className="nav-menu-subcategory">
                            <a
                              className="primary no-bold"
                              href="https://www.skillshare.com/browse/productivity?via=header"
                            >
                              Productivity
                            </a>
                          </li>
                        </ul>
                        <div className="nav-menu-category-list">
                          <ul className="nav-menu-category-short-list">
                            <li className="nav-menu-category">
                              <a
                                className="primary"
                                href="https://www.skillshare.com/browse/technology?via=header"
                              >
                                Technology
                              </a>
                            </li>
                            <li className="nav-menu-subcategory">
                              <a
                                className="primary no-bold"
                                href="https://www.skillshare.com/browse/data-science?via=header"
                              >
                                Data Science
                              </a>
                            </li>
                            <li className="nav-menu-subcategory">
                              <a
                                className="primary no-bold"
                                href="https://www.skillshare.com/browse/mobile-development?via=header"
                              >
                                Mobile Development
                              </a>
                            </li>
                            <li className="nav-menu-subcategory">
                              <a
                                className="primary no-bold"
                                href="https://www.skillshare.com/browse/product-management?via=header"
                              >
                                Product Management
                              </a>
                            </li>
                            <li className="nav-menu-subcategory">
                              <a
                                className="primary no-bold"
                                href="https://www.skillshare.com/browse/web-development?via=header"
                              >
                                Web Development
                              </a>
                            </li>
                          </ul>
                          <ul className="nav-menu-category-short-list">
                            <li className="nav-menu-category">
                              <a
                                className="primary"
                                href="https://www.skillshare.com/browse/lifestyle?via=header"
                              >
                                Lifestyle
                              </a>
                            </li>
                            <li className="nav-menu-subcategory">
                              <a
                                className="primary no-bold"
                                href="https://www.skillshare.com/browse/crafts?via=header"
                              >
                                Crafts
                              </a>
                            </li>
                            <li className="nav-menu-subcategory">
                              <a
                                className="primary no-bold"
                                href="https://www.skillshare.com/browse/culinary?via=header"
                              >
                                Culinary
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="nav-menu-other">
                        <div className="nav-menu-link">
                          <a
                            className="primary no-bold"
                            href="https://www.skillshare.com/browse?via=header"
                          >
                            All Classes
                          </a>
                        </div>
                        <div className="nav-menu-link">
                          <a
                            className="primary no-bold"
                            href="https://www.skillshare.com/browse/recommended?via=header"
                          >
                            Recommended Classes
                          </a>
                        </div>
                        <div className="nav-menu-link">
                          <a
                            className="primary no-bold"
                            href="https://www.skillshare.com/projects?via=header"
                          >
                            Student Projects
                          </a>
                        </div>
                        <div className="nav-menu-link">
                          <a
                            className="primary no-bold"
                            href="https://www.skillshare.com/groups?via=header"
                          >
                            Groups
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-menu-workshops nav-item">
              <a
                className="nav-item-link no-bold"
                href="https://www.skillshare.com/workshops?via=header"
              >
                Workshops
              </a>
            </div>
            <div className="nav-item nav-search-bar">
              <div className="autocomplete-wrapper js-search-box">
                <div className="search-box">
                  <div className="sc-htpNat kAarkA">
                    <div className="search-box-wrapper">
                      <div className="sc-bdVaJa TJfzH">
                        <svg
                          role="icon"
                          className="search-icon"
                          height={16}
                          width={16}
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M10,17 C13.8659932,17 17,13.8659932 17,10 C17,6.13400675 13.8659932,3 10,3 C6.13400675,3 3,6.13400675 3,10 C3,13.8659932 6.13400675,17 10,17 Z M15.9994165,15.2923098 L21.8535534,21.1464466 C22.0488155,21.3417088 22.0488155,21.6582912 21.8535534,21.8535534 C21.6582912,22.0488155 21.3417088,22.0488155 21.1464466,21.8535534 L15.2923098,15.9994165 C13.8819612,17.2444908 12.0292099,18 10,18 C5.581722,18 2,14.418278 2,10 C2,5.581722 5.581722,2 10,2 C14.418278,2 18,5.581722 18,10 C18,12.0292099 17.2444908,13.8819612 15.9994165,15.2923098 Z"
                            fill="#747777"
                          />
                        </svg>
                      </div>
                      <div
                        className="rbt clearfix open"
                        tabIndex={-1}
                        style={{ position: "relative" }}
                      >
                        <div
                          className="rbt-input-hint-container"
                          style={{ position: "relative" }}
                        >
                          <SearshInput />

                          <div
                            style={{
                              left: "0px",
                              pointerEvents: "none",
                              position: "absolute",
                              top: "0px",
                              display: "inline-block"
                            }}
                          >
                            <div
                              style={{
                                height: "0px",
                                left: "0px",
                                overflow: "scroll",
                                position: "absolute",
                                top: "0px",
                                visibility: "hidden",
                                whiteSpace: "pre",
                                fontSize: "13px",
                                fontFamily: '"proxima nova", arial, sans-serif',
                                fontWeight: 400,
                                fontStyle: "normal",
                                letterSpacing: "normal",
                                textTransform: "none"
                              }}
                            />
                          </div>
                        </div>
                        <div
                          aria-atomic="true"
                          aria-live="polite"
                          className="sr-only rbt-sr-status"
                          role="status"
                        >
                          0 selections
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="site-header-nav site-header-nav-right">
            <div className="nav-item">
              <a
                className="nav-item-link no-bold"
                href="https://www.skillshare.com/teach?via=header"
              >
                Become a Teacher
              </a>
            </div>
            <div className="nav-item">
              <a
                href="https://www.skillshare.com/your-classes?via=header"
                className="nav-item-link primary no-bold"
              >
                My Classes
              </a>
            </div>
            <div className="nav-item nav-menu-notifications js-nav-menu-notifications">
              <div className="nav-item-icon nav-menu-notifications-icon nav-menu-notifications-icon-dark ss-icon-bell js-nav-icon-notifications initialized" />
            </div>
            <div className="nav-item nav-menu-user-avatar js-nav-menu-user-avatar">
              <a
                href="https://www.skillshare.com/profile/ALOUI-Mohamed-Khalil/4864753"
                className="nav-link-user-avatar js-nav-link-user-avatar initialized"
              >
                <div className="user-photo user-img-30 left">
                  <img
                    src="https://static.skillshare.com/assets/images/default-profile-sm.jpg"
                    alt="ALOUI Mohamed Khalil"
                  />{" "}
                </div>
              </a>
              <div className="popover shadow bottom">
                <div className="inner-popover">
                  <div className="arrow right" />
                  <div className="content">
                    <div className="profile-snippet nav-menu-list">
                      <a
                        href="https://www.skillshare.com/profile/ALOUI-Mohamed-Khalil/4864753"
                        className="profile-image user-img-50"
                        style={{
                          backgroundImage:
                            "url(https://static.skillshare.com/assets/images/default-profile-lrg.jpg)"
                        }}
                      />
                      <div className="profile-info">
                        <h5 className="profile-name">
                          <a
                            href="https://www.skillshare.com/profile/ALOUI-Mohamed-Khalil/4864753"
                            className="link-main"
                          >
                            ALOUI Mohamed Khalil
                          </a>
                        </h5>
                        <p className="headline">
                          <a
                            href="https://www.skillshare.com/settings"
                            className="secondary no-headline"
                          >
                            Add a headline
                          </a>
                        </p>
                      </div>
                      <div className="profile-info">
                        <div className="user-stats-information-profile-snippet">
                          <div className="user-stats">
                            <div className="user-stat-row-wrapper">
                              <div className="user-stat-row">
                                <i className="ss-icon-pictures user-stat" />
                                <i className="user-stat">0</i>
                                <span
                                  rel="tooltip"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  data-title="Number of projects that you’ve posted"
                                  data-original-title
                                  title
                                >
                                  {" "}
                                  Projects
                                </span>
                              </div>
                            </div>
                            <div className="user-stat-row-wrapper">
                              <div className="user-stat-row">
                                <i className="ss-icon-empty-comment user-stat" />
                                <i className="user-stat">0</i>
                                <span
                                  rel="tooltip"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  data-title="Number of conversations you’ve participated in"
                                  data-original-title
                                  title
                                >
                                  {" "}
                                  Posts
                                </span>
                              </div>
                            </div>
                            <div className="user-stat-row-wrapper">
                              <div className="user-stat-row">
                                <i className="ss-icon-followers user-stat" />
                                <i className="user-stat">--</i> Followers
                              </div>
                            </div>
                            <div className="user-stat-row-wrapper">
                              <div className="user-stat-row">
                                <i className="ss-icon-following user-stat" />
                                <i className="user-stat">--</i> Following
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="profile-button">
                          <a
                            href="https://www.skillshare.com/profile/ALOUI-Mohamed-Khalil/4864753"
                            className="button medium bordered"
                          >
                            View Profile
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="nav-menu-delimiter" />
                    <div className="nav-menu-list nav-menu-list-bottom">
                      <div className="nav-menu-link">
                        <a
                          href="https://www.skillshare.com/your-classes?via=header-profile"
                          target
                          className="secondary no-underline"
                        >
                          My Classes
                        </a>
                      </div>
                      <div className="nav-menu-link">
                        <a
                          href="https://www.skillshare.com/settings?via=header"
                          target
                          className="secondary no-underline"
                        >
                          Account Settings
                        </a>
                      </div>
                      <div className="nav-menu-link">
                        <a
                          href="https://www.skillshare.com/settings/referrals?via=header"
                          target
                          className="secondary no-underline"
                        >
                          Refer a Friend
                        </a>
                      </div>
                      <div className="nav-menu-link">
                        <a
                          href="https://www.skillshare.com/perks?via=header"
                          target
                          className="secondary no-underline"
                        >
                          Redeem Perks
                        </a>
                      </div>
                      <div className="nav-menu-link">
                        <a
                          href="https://www.skillshare.com/teams?via=header-profile"
                          target
                          className="secondary no-underline"
                        >
                          Team Plans
                        </a>
                      </div>
                      <div className="nav-menu-link">
                        <a
                          href="https://www.skillshare.com/help"
                          target="_blank"
                          className="secondary no-underline"
                        >
                          Help
                        </a>
                      </div>
                      <div className="nav-menu-link">
                        <a
                          href="https://www.skillshare.com/logout"
                          className="secondary no-underline"
                        >
                          Sign Out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-item nav-item-button">
              <a
                href="https://www.skillshare.com/premium?via=header-upgrade"
                className="btn small primary"
              >
                Go Premium
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavMenu;
