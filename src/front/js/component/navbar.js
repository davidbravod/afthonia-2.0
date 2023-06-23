import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/styles.css"
import "../../styles/nice-select.css"
import "../../styles/jstable.css"
import contact1 from "../../images/contact1.png"
import contact2 from "../../images/contact2.png"
import contact3 from "../../images/contact3.png"
import avatar from "../../images/avatar.png"
import githubImage from "../../images/github.png"
import bitbucketImage from "../../images/bitbucket.png"
import dribbleImage from "../../images/dribbble.png"
import dropboxImage from "../../images/dropbox.png"
import mailchimpImage from "../../images/mail_chimp.png"
import slackImage from "../../images/slack.png"
import { Link, useLocation } from "react-router-dom";

export const Navbar = ({handleNavbarClick}) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
	const location = useLocation()
  const [userData, setUserData] = useState(null);

	if (
		location.pathname === "/login" ||
		location.pathname === "/signup" ||
		location.pathname === "/signup-business" ||
		location.pathname === "/signup-owners" ||
		location.pathname === "/signup-agent" ||
		location.pathname === "/signup-ein") {
		return null;
	  }
  
    const handleLogout = async () => {
      const { response } = await actions.logout();
      if (response.ok) {
        navigate("/login");
      }
    };

    useEffect(() => {
      setUserData(store.userData);
  }, [store.userData]);

	return (
		<nav
          className="navbar navbar-expand-lg py-lg-3 px-2 px-lg-4 d-flex fixed-top justify-content-between"
        >
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center" onClick={handleNavbarClick}>
              <span
                className="material-symbols-outlined menu-toggle"
                id="menu-toggle"
              >
                menu
              </span>
            </div>
          </div>

          <div
            className="d-flex gap-2 p-lg-2 p-lg-0 align-items-center justify-content-end"
          >

            <div className="dropdown">
              <Link
                className="nav-icon"
                to="#"
                id="navbarDropdown1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="material-symbols-outlined d-flex">
                  grid_view
                </span>
              </Link>
              <div
                className="dropdown-menu apps p-2 rounded border-0 shadow"
                aria-labelledby="navbarDropdown1"
                
              >
                <div
                  className="d-flex justify-content-between align-items-center bottom-border"
                >
                  <h5>Apps</h5>
                  <Link to="#">View All Apps</Link>
                </div>
                <div className="d-flex flex-wrap justify-content-center pt-3">
                  <div
                    className="d-flex flex-column apps_box justify-content-center align-items-center gap-2"
                  >
                    <img src={githubImage} alt="" />
                    <span>GitHub</span>
                  </div>
                  <div
                    className="d-flex flex-column apps_box justify-content-center align-items-center gap-2"
                  >
                    <img src={bitbucketImage} alt="" />
                    <span>Bitbucket</span>
                  </div>
                  <div
                    className="d-flex flex-column apps_box justify-content-center align-items-center gap-2"
                  >
                    <img src={dribbleImage} alt="" />
                    <span>Dribble</span>
                  </div>
                  <div
                    className="d-flex flex-column apps_box justify-content-center align-items-center gap-2"
                  >
                    <img src={dropboxImage} alt="" />
                    <span>Dropbox</span>
                  </div>
                  <div
                    className="d-flex flex-column apps_box justify-content-center align-items-center gap-2"
                  >
                    <img src={mailchimpImage} alt="" />
                    <span>Mailchimp</span>
                  </div>
                  <div
                    className="d-flex flex-column apps_box justify-content-center align-items-center gap-2"
                  >
                    <img src={slackImage} alt="" />
                    <span>Slack</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown">
              <Link
                className="nav-icon"
                to="#"
                id="navbarDropdown2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="material-symbols-outlined d-flex">
                  notifications_active
                </span>
              </Link>
             <div className="dropdown-menu notification border-0 shadow pb-0" aria-labelledby="navbarDropdown2">
                <div className="d-flex align-items-center justify-content-between bottom-border px-3 py-2">
                  <h6 className="mb-0">Notifications</h6>
                  <Link to="notification.html">View All</Link>
                </div>
                <ul className="p-0">
                  <li className="d-flex gap-2 align-items-start px-3 py-2 bottom-border">
                    <img src={contact1} alt=""/>
                    <div>
                      <h6 className="mb-0">Your order is placed</h6>
                      <p className="mb-0">You have ordered Nokia...</p>
                      <span>3 min ago</span>
                    </div>
                  </li>
                  <li className="d-flex gap-2 align-items-start px-3 py-2 bottom-border">
                    <img src={contact2} alt=""/>
                    <div>
                      <h6 className="mb-0">New blog published</h6>
                      <p className="mb-0">Kholil wrote in technology ...</p>
                      <span>5 min ago</span>
                    </div>
                  </li>
                  <li className="d-flex gap-2 align-items-start px-3 py-2 bottom-border">
                    <img src={contact3} alt=""/>
                    <div>
                      <h6 className="mb-0">Alex sent you Link file</h6>
                      <p className="mb-0">filename.pdf click here to open</p>
                      <span>2 hour ago</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="nav-item dropdown">
              <Link
                className="d-flex gap-2 align-items-center"
                to="#"
                id="navbarDropdown4"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={avatar} alt="user" />
                <div className="d-flex flex-column d-none d-xl-block">
                  <p className="mb-0">{userData == null ? "" : `${userData.first_name} ${userData.last_name}`}</p>
                  <span className="small">Account Settings</span>
                </div>
                <span className="material-symbols-outlined d-none d-lg-block">
                  expand_more
                </span>
              </Link>
             <ul
              className="dropdown-menu dropdown-menu-end user shadow border-0"
              aria-labelledby="navbarDropdown4"
            >
              <li><span className="px-3 d-inline-block">Welcome {userData == null ? "" : `${userData.first_name}`}!</span></li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2"
                  to="profile_details_1.html"
                >
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                  Profile</Link
                >
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2"
                  to="#"
                >
                  <span className="material-symbols-outlined"> chat </span>
                  Message</Link
                >
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2"
                  to="tasks.html"
                >
                  <span className="material-symbols-outlined">
                    event_available
                  </span>
                  Taskboard</Link
                >
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2"
                  to="#"
                >
                  <span className="material-symbols-outlined"> support </span>
                  Support</Link
                >
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2"
                  to="account_settings.html"
                >
                  <span className="material-symbols-outlined"> settings </span>
                  Settings</Link
                >
              </li>
              <li>
                <button
                  type="button" className="dropdown-item d-flex align-items-center gap-1"
                  onClick={handleLogout}
                >
                  <span className="material-symbols-outlined"> logout </span>
                  Log Out</button
                >
              </li>
            </ul>
            </div>
          </div>
        </nav>
	);
};
