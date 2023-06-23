import React, { Component, useState } from "react";
import "../../styles/styles.css"
import "../../styles/nice-select.css"
import "../../styles/jstable.css"
import logo from "../../img/2.png"
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
    const location = useLocation()

	if (
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/signup-business" ||
        location.pathname === "/signup-owners" ||
        location.pathname === "/signup-agent" ||
        location.pathname === "/signup-ein") {
		return null;
	  }

      const [settingsExpanded, setSettingsExpanded] = useState(false);
      const [utilityExpanded, setUtilityExpanded] = useState(false);
    
      const handleSettingsClick = () => {
        setSettingsExpanded((prevExpanded) => !prevExpanded);
      };
    
      const handleUtilityClick = () => {
        setUtilityExpanded((prevExpanded) => !prevExpanded);
      };
    

return (
    <div id="sidebar-wrapper" className="sidebar-wrapper">
      <div className="sidebar-heading">
        <Link to="/user/backoffice">
          <img id="logo" src={logo} alt="" style={{"height":"70px", "width":"210px"}}/>
        </Link>
      </div>
      <nav className="sidebar py-2 mb-4">
        <ul className="nav flex-column" id="nav_accordion1">
          <li className="nav-item has-submenu">
            <Link
              className="nav-link d-flex justify-content-between align-items-center"
              to="/user/dashboard"
            >
              <span className="d-flex gap-1 align-items-center">
                <span className="material-symbols-outlined"> home </span>
                Dashboard
              </span>
            </Link>
          </li>
          <li className="nav-item has-submenu">
            <Link
              className="nav-link d-flex justify-content-between align-items-center"
              to="/user/maildocuments"
            >
              <span className="d-flex gap-1 align-items-center">
                <span className="material-symbols-rounded"> star </span> Mail
              </span>
              
            </Link>
          </li>
          <li className="nav-item has-submenu">
            <Link
              className="nav-link d-flex justify-content-between align-items-center"
              to="/user/backoffice"
            >
              <span className="d-flex gap-1 align-items-center">
                <span className="material-symbols-outlined"> group </span> User
                Profile
              </span>
            </Link>
          </li>
          <li className="nav-item has-submenu">
            <Link
              className="nav-link d-flex justify-content-between align-items-center"
              to="/user/mycompany"
            >
              <span className="d-flex gap-1 align-items-center">
                <span className="material-symbols-outlined"> request_quote</span>
                My Company
              </span>
            </Link>
          </li>
          <li className="nav-item has-submenu">
            <Link
              className="nav-link d-flex justify-content-between align-items-center"
              to="#"
            >
              <span className="d-flex gap-1 align-items-center">
                <span className="material-symbols-outlined"> power </span>
                Integrations
              </span>
            </Link>
          </li>
        </ul>
        <div className="divider"></div>
        <ul className="nav flex-column" id="nav_accordion">
          <li className="nav-item has-submenu">
            <Link
              className="nav-link d-flex justify-content-between align-items-center"
              to="#"
              onClick={handleSettingsClick}
            >
              <span className="d-flex gap-1 align-items-center">
                <span className="material-symbols-outlined"> settings </span>
                Settings
              </span>
              <span className="material-symbols-outlined"> expand_more </span>
            </Link>
            <ul className={`submenu collapse ${settingsExpanded ? "show" : ""}`}>
              <li>
                <Link className="nav-link" to="all_settings.html">All Pages</Link>
              </li>
              <li>
                <Link className="nav-link" to="account_settings.html"
                  >Settings v1</Link
                >
              </li>
              <li>
                <Link className="nav-link" to="account_settings_2.html"
                  >Settings v2</Link
                >
              </li>
              <li>
                <Link className="nav-link" to="account_settings_3.html"
                  >Settings v3</Link
                >
              </li>
            </ul>
          </li>
          <li className="nav-item has-submenu">
            <Link
              className="nav-link d-flex justify-content-between align-items-center"
              to="#"
              onClick={handleUtilityClick}
            >
              <span className="d-flex gap-1 align-items-center">
                <span className="material-symbols-outlined"> build </span> Utility
                Pages
              </span>
              <span className="material-symbols-outlined"> expand_more </span>
            </Link>
            <ul className={`submenu collapse ${utilityExpanded ? "show" : ""}`}>
              <li>
                <Link className="nav-link" to="all_utility.html">All Pages</Link>
              </li>
              <li><Link className="nav-link" to="signup.html">Sign up</Link></li>
              <li><Link className="nav-link" to="login.html">Log in</Link></li>
              <li>
                <Link className="nav-link" to="verify_email.html"
                  >Email Confirmation</Link
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
)};

export default Sidebar;