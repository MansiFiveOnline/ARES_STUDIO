import React from "react";
import Layout from "../../components/Layout";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "../../style/user.css";

export default function Contact() {
  return (
    <Layout>
      {/* Header banner section start */}
      <div className="service_section position-relative">
        <div className="app">
          <div className="video-list">
            {/* <VideoPlayer src="images/video2.mp4" /> */}
            <img src="images/service-detail.jpg" />
          </div>
        </div>
        <div className="service_title">
          <h1>Let's Work Together</h1>
        </div>
        <div className="arrow_down">
          <a href="#getintouch">
            <div class="sr-arrow sr-bounce"></div>
          </a>
        </div>
      </div>
      {/* Header banner section start */}

      {/* get in touch form section start */}
      <section className="getin_section" id="getintouch">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="getin_touch_title">
                <h2>
                  Let's <span>Get In</span> Touch
                </h2>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="getin_touch_form">
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div class="mb-5">
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputName"
                          aria-describedby="nameHelp"
                          placeholder="Name*"
                        />
                        {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div class="mb-5">
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Email Address*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div class="mb-5">
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputSubject"
                          aria-describedby="subjectHelp"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div class="mb-5">
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div class="text-end">
                        <button type="submit" class="btn">
                          <img src="images/arrow-right.svg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* get in touch form section close */}

      {/* ares address section start */}
      <section className="address_main_section mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <div className="adress_main plr-20">
                <div className="address_box mb-3">
                  <div className="address_icon">
                    <img src="images/map-pin.svg" />
                  </div>
                  <div className="address_info">
                    <p>
                      Hind Nagar, Sector C1, LDA Colony, Uttar Pradesh- 226012
                    </p>
                  </div>
                </div>
                <div className="address_box align-items-center mb-3">
                  <div className="address_icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="address_info">
                    <p>
                      <Link to="mailto:contact@aresstudio.in">
                        contact@aresstudio.in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="adress_main plr-20">
                <div className="address_box mb-3">
                  <div className="address_icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="address_info">
                    <h5>Nik John</h5>
                    <p>Exe Producer</p>
                  </div>
                </div>
                <div className="address_box align-items-center mb-3">
                  <div className="address_icon">
                    <img src="images/call-icon.svg" />
                  </div>
                  <div className="address_info">
                    <p>
                      <Link to="tel:+91 9876543210">+91 9876543210</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="adress_main plr-20">
                <div className="address_box mb-3">
                  <div className="address_icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="address_info">
                    <h5>Nik John</h5>
                    <p>Exe Producer</p>
                  </div>
                </div>
                <div className="address_box align-items-center mb-3">
                  <div className="address_icon">
                    <img src="images/call-icon.svg" />
                  </div>
                  <div className="address_info">
                    <p>
                      <Link to="tel:+91 9876543210">+91 9876543210</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="adress_main plr-20">
                <div className="address_box mb-3">
                  <div className="address_icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="address_info">
                    <h5>Nik John</h5>
                    <p>Exe Producer</p>
                  </div>
                </div>
                <div className="address_box align-items-center mb-3">
                  <div className="address_icon">
                    <img src="images/call-icon.svg" />
                  </div>
                  <div className="address_info">
                    <p>
                      <Link to="tel:+91 9876543210">+91 9876543210</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ares address section close */}

      {/* map section */}
      <section className="map_section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7123.3290274015335!2d80.892633!3d26.786962000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfeacaf028b3d%3A0x56245421a57e1827!2sHind%20Nagar%2C%20Sector%20C1%2C%20LDA%20Colony%2C%20Lucknow%2C%20Uttar%20Pradesh%20226012!5e0!3m2!1sen!2sin!4v1715782044865!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </Layout>
  );
}
