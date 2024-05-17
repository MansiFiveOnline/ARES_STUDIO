import React from "react";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function About() {
  const data = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1522205987242-8e22924ab42a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c0f679eb8f15705d46ea90008f39642b&auto=format&fit=crop&w=500&q=60",
      subtitle: "Producer",
      title: "Rachel Bermin",
      socialMedia: {
        facebook: "https://www.facebook.com/profile1",
        twitter: "https://twitter.com/profile1",
        linkedin: "https://www.linkedin.com/profile1",
        instagram: "https://www.instagram.com/profile1",
      },
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fe6b92f88f55824e64a1bae15f5bf52a&auto=format&fit=crop&w=500&q=60",
      subtitle: "Producer",
      title: "Rachel Bermin",
      socialMedia: {
        facebook: "https://www.facebook.com/profile2",
        twitter: "https://twitter.com/profile2",
        linkedin: "https://www.linkedin.com/profile2",
        instagram: "https://www.instagram.com/profile2",
      },
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1517799094725-e3453440724e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=353f3663a9fae75773d2942aeb37c2c8&auto=format&fit=crop&w=500&q=60",
      subtitle: "Producer",
      title: "Rachel Bermin",
      socialMedia: {
        facebook: "https://www.facebook.com/profile2",
        twitter: "https://twitter.com/profile2",
        linkedin: "https://www.linkedin.com/profile2",
        instagram: "https://www.instagram.com/profile2",
      },
    },
    {
      imageUrl: "images/team1.jpg",
      subtitle: "Producer",
      title: "Rachel Bermin",
      socialMedia: {
        facebook: "https://www.facebook.com/profile2",
        twitter: "https://twitter.com/profile2",
        linkedin: "https://www.linkedin.com/profile2",
        instagram: "https://www.instagram.com/profile2",
      },
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1522205987242-8e22924ab42a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c0f679eb8f15705d46ea90008f39642b&auto=format&fit=crop&w=500&q=60",
      subtitle: "Producer",
      title: "Rachel Bermin",
      socialMedia: {
        facebook: "https://www.facebook.com/profile1",
        twitter: "https://twitter.com/profile1",
        linkedin: "https://www.linkedin.com/profile1",
        instagram: "https://www.instagram.com/profile1",
      },
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fe6b92f88f55824e64a1bae15f5bf52a&auto=format&fit=crop&w=500&q=60",
      subtitle: "Producer",
      title: "Rachel Bermin",
      socialMedia: {
        facebook: "https://www.facebook.com/profile2",
        twitter: "https://twitter.com/profile2",
        linkedin: "https://www.linkedin.com/profile2",
        instagram: "https://www.instagram.com/profile2",
      },
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1517799094725-e3453440724e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=353f3663a9fae75773d2942aeb37c2c8&auto=format&fit=crop&w=500&q=60",
      subtitle: "Producer",
      title: "Rachel Bermin",
      socialMedia: {
        facebook: "https://www.facebook.com/profile2",
        twitter: "https://twitter.com/profile2",
        linkedin: "https://www.linkedin.com/profile2",
        instagram: "https://www.instagram.com/profile2",
      },
    },
    // Add more data objects for each box
  ];

  return (
    <Layout>
      {/* Embark on Epic Adventures section start */}
      <div className="service_section position-relative">
        <div className="app">
          <div className="video-list image-list">
            {/* <VideoPlayer src="images/video2.mp4" /> */}
            <img src="images/about-bg.jpg" />
          </div>
        </div>
        <div className="about_title">
          <h1>
            We Reimagine Standards & <span>forge New Creative Paths</span>
          </h1>
        </div>
        <div className="arrow_down">
          <a href="#about">
            <div class="sr-arrow sr-bounce"></div>
          </a>
        </div>
      </div>

      {/* Embark on Epic Adventures section start */}
      <div className="epic_adventures_section pt-5 mt-5" id="about">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 text-center">
              <h2 className="pb-5">
                <strong>Embark on Epic Adventures,</strong>
                <br />
                Dive into Captivating World of Gaming
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque convallis eu nibh ut hendrerit. Mauris quis ex ut
                metus scelerisque efficitur gravida ac metus. Donec fringilla
                nibh et suscipit pellentesque. Curabitur laoreet semper neque
                commodo fringilla. Etiam maximus sem sit amet velit consequat,
                et pulvinar metus egestas. Nam dignissim in lacus ut facilisis.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Fusce mollis ac odio vitae euismod. Maecenas id vehicula turpis.
                Etiam consequat vehicula enim in aliquam.
              </p>
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
          {data.map((item, index) => (
            <div
              className="section"
              key={index}
              style={{ backgroundImage: `url('${item.imageUrl}')` }}
            >
              <div class="content">
                <div className="team_name_social">
                  <div className="name">
                    <h5>{item.subtitle}</h5>
                    <h3>{item.title}</h3>
                  </div>

                  {/* Social Media Icons */}
                  <div className="social_media_abt">
                    <a
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
                    </a>
                    <a
                      href={item.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faLinkedinIn}
                        style={{ color: "white" }}
                      />
                    </a>
                    <a
                      href={item.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        style={{ color: "white" }}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div class="overlay"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Team section close */}
    </Layout>
  );
}
