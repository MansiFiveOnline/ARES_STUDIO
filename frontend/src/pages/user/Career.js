import React from "react";
import Layout from "../../components/Layout";
import HorizontalTabs from "../../components/HorizontalTabs";

export default function Career() {
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
          <h1>Work With Us</h1>
        </div>
        <div className="arrow_down">
          <a href="#career">
            <div class="sr-arrow sr-bounce"></div>
          </a>
        </div>
      </div>
      {/* Header banner section start */}

      {/* Horizontal scrollin tabs section start */}
      <section className="horizontal_tabs_section" id="career">
        <HorizontalTabs />
      </section>
      {/* Horizontal scrollin tabs section close */}

      {/* get in touch form section start */}
      <section className="getin_section">
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
                    <div className="col-lg-6">
                      <div class="mb-5">
                        <input
                          type="tel"
                          class="form-control"
                          id="exampleInputTel"
                          aria-describedby="telHelp"
                          placeholder="Phone Number*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div class="mb-5">
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputLocation"
                          aria-describedby="locationHelp"
                          placeholder="Location*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div class="mb-5">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Select Position</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div class="mb-5">
                        <input class="form-control" type="file" id="formFile" />
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
    </Layout>
  );
}
