import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../style/user.css";

const SideNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => {
    setIsOpen(true);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <div className="header_section">
      {/* Side navigation */}
      <div id="mySidenav" className={`sidenav ${isOpen ? "open" : ""}`}>
        <div className="container">
          <div className="row">
            {/* Close button */}
            <div className="col-lg-12 text-end">
              <span className="closebtn" onClick={closeNav}>
                <img src="/images/close-icon.svg" alt="" />
              </span>
            </div>

            {/* Navigation content */}
            <div className="col-lg-6 text-start">
              <div className="main_nav">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/service/games">Service</NavLink>
                <NavLink to="/career">Career</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="get_in_touch_header">
                <h4>Get In Touch</h4>
                <ul>
                  <li>
                    <Link to="tel:+91 12345678910">+91 12345678910</Link>
                  </li>
                  <li>
                    <Link to="mailto:contact@aresstudio.com">
                      contact@aresstudio.com
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="get_in_touch_header">
                <h4>Address</h4>
                <ul>
                  <li>
                    Hind Nagar, Sector C1, LDA Colony, Uttar Pradesh- 226012
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <hr />
            </div>
            <div className="col-lg-12">
              <div className="social_media">
                <ul>
                  {/* <li>
                    <Link to="/">Facebook</Link>
                  </li>
                  <li>
                    <Link to="/">Twitter</Link>
                  </li>
                  <li>
                    <Link to="/">Instagram</Link>
                  </li> */}
                  <li>
                    <Link
                      to="https://www.linkedin.com/company/aresstudio/"
                      target="_blank"
                    >
                      Linkedin
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://aresvfxstudio.artstation.com/"
                      target="_blank"
                    >
                      Art Studio
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contianer-fluid">
        <div className="row align-items-center">
          <div className="col-lg-4 col-3">
            {/* Button to open side navigation */}
            <span className="openbtn" onClick={openNav}>
              <div id="icon">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </span>
          </div>
          <div className="col-lg-4 col-6 text-center">
            <div className="ares_logo">
              <Link to="/">
                <img src="/images/logo_small_black_transparent.svg" alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-3 text-center">&nbsp;</div>
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
