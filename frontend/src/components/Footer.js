import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import "../style/user.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <Link to="mailto:contact@aresstudio.in">contact@aresstudio.in</Link>
          </div>
          <div className="col-lg-4 text-center">
            <img className="iso-img" src="images/iso-logo.svg" alt="" />
            <p>ISO 2007 :2013</p>
          </div>
          <div className="col-lg-4 text-end">
            <ul className="social_media_icons">
              <li>
                <Link to="">
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
              </li>
              <li>
                <Link to="">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
              </li>
              <li>
                <Link to="">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
