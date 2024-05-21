import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../../style/user.css";
import axios from "axios";
import VideoPlayer from "../../components/Videoplayer";
import { Helmet } from "react-helmet";

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [teams, setTeams] = useState([]);
  const [metaData, setMetaData] = useState({
    metaTitle: "",
    metaDescription: "",
  });
  const { id } = useParams(); // Use the correct about ID
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`/api/about`);
        setAboutData(response.data.abouts);
        console.log(response.data.abouts);
      } catch (error) {
        console.error("Error fetching about details:", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get(`/api/team`);
        setTeams(response.data.teams);
        console.log(response.data.teams);
        console.log(response.data.teams.image[0]);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchAboutData();
    fetchTeams();
  }, [id]);

  if (!aboutData || !teams) {
    return <div>Loading...</div>;
  }

  // const { title, subtitle, description, media } = aboutData;
  return (
    <Layout>
      <Helmet>
        {/* Meta tags specific to the About page */}
        <title>{aboutData[0].metaTitle}</title>
        <meta name="title" content={aboutData[0].metaTitle} />
        <meta name="description" content={aboutData[0].metaDescription} />
        {/* Add other meta tags as needed */}
      </Helmet>
      {/* Embark on Epic Adventures section start */}
      <div className="service_section position-relative">
        <div className="app">
          <div className="video-list image-list">
            {aboutData[0].media && aboutData[0].media.iframe ? (
              <VideoPlayer src={aboutData[0].media.iframe} />
            ) : (
              <img
                src={`http://localhost:8000/${aboutData[0].media.filepath}`}
                alt="Media"
              />
            )}
          </div>
        </div>
        <div className="about_title">
          <h1>
            {/* We Reimagine Standards & <span>forge New Creative Paths</span>
             */}
            {aboutData[0].title}
          </h1>
        </div>
        <div className="arrow_down">
          <a href="#about">
            <div className="sr-arrow sr-bounce"></div>
          </a>
        </div>
      </div>

      {/* Embark on Epic Adventures section start */}
      <div className="epic_adventures_section pt-5 mt-5" id="about">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <h2 className="pb-5">
                {/* <strong>Embark on Epic Adventures,</strong>
                <br /> */}
                {/* Dive into Captivating World of Gaming */}
                {aboutData[0].subtitle}
              </h2>
              <p>{aboutData[0].description}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Embark on Epic Adventures section close */}

      {/* Team section start */}

      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section_title">
                <h2 className="pb-3">
                  Our Key <strong>People</strong>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about_team">
        <div className="team_container">
          {teams.map(
            (item, index) => (
              console.log("User item:", item),
              console.log("User image:", item.image[0]),
              (
                <div
                  className="section"
                  key={index}
                  // style={{
                  //   // backgroundImage: `url('http://localhost:8000/${
                  //   //   item.image[0] && item.image[0].filepath
                  //   // }')`,
                  //   backgroundImage: `url(http://localhost:8000/${item.image[0].filepath})`,
                  // }}
                >
                  <div>
                    <img
                      src={`http://localhost:8000/${item.image[0].filepath}`}
                      alt="Media"
                    />
                    <div className="content">
                      <div className="team_name_social">
                        <div className="name">
                          <h5>{item.designation}</h5>
                          <h3>{item.name}</h3>
                        </div>

                        {/* Social Media Icons * */}
                        <div className="social_media_abt">
                          {/* <a
                            href={item.socialMedia.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={faFacebookF}
                              style={{ color: "white" }}
                            />
                          </a>
                          <a
                            href={item.socialMedia.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={faTwitter}
                              style={{ color: "white" }}
                            />
                          </a> */}
                          <a
                            href={item.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={faLinkedinIn}
                              style={{ color: "white" }}
                            />
                          </a>
                          {/* <a
                            href={item.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={faInstagram}
                              style={{ color: "white" }}
                            />
                          </a> */}
                        </div>
                      </div>
                    </div>
                    <div className="overlay"></div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </section>

      {/* Team section close */}
    </Layout>
  );
}
