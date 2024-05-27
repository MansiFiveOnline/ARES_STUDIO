import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import HorizontalTabs from "../../components/HorizontalTabs";
import "../../style/user.css";
import axios from "axios";
import VideoPlayer from "../../components/Videoplayer";

export default function Career() {
  const [careerData, setCareerData] = useState(null);
  const [opportunities, setOpportunities] = useState(null);
  const [opportunityTitles, setOpportunityTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_no: "",
    location: "",
    position: "",
    message: "",
    document: null,
  });

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await axios.get(`/api/career`);
        setCareerData(response.data.careers);
        console.log(response.data.careers);
        console.log("title", response.data.careers[0].title);

        // console.log("filepath", response.data.careers.media[0].filepath);
        if (response.data.careers && response.data.careers.length > 0) {
          console.log("filepath", response.data.careers[0].media.filepath);
        }
      } catch (error) {
        console.error("Error fetching careers details:", error);
      }
    };

    fetchCareer();
  }, []);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/opportunity/title"
        );
        setOpportunityTitles(response.data.opportunityTitles);
      } catch (error) {
        console.error("Error fetching opportunity titles:", error);
      }
    };

    fetchTitle();
  }, []);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(`/api/opportunity`);
        setOpportunities(response.data.opportunities);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    };

    fetchOpportunities();
  }, []);

  if (!opportunities && !careerData) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, document: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://localhost:8000/api/jobapplication",
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      alert("Application submitted successfully");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application");
    }
  };

  return (
    <Layout>
      {/* Header banner section start */}
      <div className="service_section position-relative">
        <div className="app">
          <div className="video-list">
            {/* <VideoPlayer src="images/video2.mp4" /> */}
            {/* <img src="images/service-detail.jpg" /> */}

            {/* {careerData.media && careerData.media.iframe ? (
              <VideoPlayer src={careerData.media.iframe} />
            ) : (
              <img
                src={`http://localhost:8000/${careerData.media.filepath}`}
                alt="Media"
              />
            )} */}

            {careerData[0]?.media && careerData[0]?.media.iframe ? (
              <VideoPlayer src={careerData[0].media.iframe} />
            ) : careerData[0]?.media && careerData[0]?.media.filepath ? (
              <img
                src={`http://localhost:8000/${careerData[0].media.filepath}`}
                alt="Media"
              />
            ) : (
              <div>No media available</div>
            )}
          </div>
        </div>
        <div className="service_title">
          <h1>{careerData[0].title}</h1>
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
        <HorizontalTabs opportunities={opportunities} />
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
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div class="mb-5">
                        <input
                          type="text"
                          class="form-control"
                          name="name"
                          value={formData.name}
                          placeholder="Name*"
                          onChange={handleInputChange}
                        />
                        {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div class="mb-5">
                        <input
                          type="email"
                          class="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div class="mb-5">
                        <input
                          type="tel"
                          class="form-control"
                          name="phone_no"
                          value={formData.phone_no}
                          onChange={handleInputChange}
                          placeholder="Phone Number*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div class="mb-5">
                        <input
                          type="text"
                          class="form-control"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Location*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div class="mb-5">
                        <select
                          class="form-select"
                          // aria-label="Default select example"
                          alue={selectedTitle}
                          onChange={(e) => setSelectedTitle(e.target.value)}
                        >
                          <option selected>Select Position</option>
                          {opportunityTitles.map((opportunityTitle, index) => (
                            <option key={index} value={opportunityTitle}>
                              {opportunityTitle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div class="mb-5">
                        <input
                          class="form-control"
                          type="file"
                          name="document"
                          // value={formData.document}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div class="mb-5">
                        <textarea
                          class="form-control"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={3}
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