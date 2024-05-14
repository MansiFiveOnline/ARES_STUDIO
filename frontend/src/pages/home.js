import React, { useState, useEffect } from "react";
// import Register from "./register";
// import Login from "./login";
import Layout from "../components/layout";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [usersCount, setUsersCount] = useState("0");
  const [serviceCount, setServiceCount] = useState("0");
  const [projectCount, setProjectCount] = useState("0");
  const [opportunityCount, setOpportunityCount] = useState("0");
  const [applicationCount, setApplicationCount] = useState("0");
  const [galleryCount, setGalleryCount] = useState("0");
  const [galleryNameCount, setGalleryNameCount] = useState("0");
  const [contactCount, setContactCount] = useState("0");
  const [careerCount, setCareerCount] = useState("0");

  useEffect(() => {
    // Fetch service count
    axios
      .get("/api/service")
      .then((response) => {
        const count = response.data.count;
        console.log(response.data.count);
        setServiceCount(count); // Update serviceCount state with count
      })
      .catch((error) => console.error("Error fetching service count:", error));

    axios
      .get("/api/user")
      .then((response) => {
        const count = response.data.count;
        console.log(response.data.count);
        setUsersCount(count); // Update serviceCount state with count
      })
      .catch((error) => console.error("Error fetching service count:", error));

    axios
      .get("/api/project")
      .then((response) => {
        const count = response.data.count;
        console.log(response.data.count);
        setProjectCount(count); // Update serviceCount state with count
      })
      .catch((error) => console.error("Error fetching service count:", error));

    axios
      .get("/api/opportunity")
      .then((response) => {
        const count = response.data.count;
        console.log(response.data.count);
        setOpportunityCount(count); // Update serviceCount state with count
      })
      .catch((error) => console.error("Error fetching service count:", error));

    axios
      .get("/api/jobapplication")
      .then((response) => {
        const count = response.data.count;
        console.log(response.data.count);
        setApplicationCount(count); // Update serviceCount state with count
      })
      .catch((error) => console.error("Error fetching service count:", error));

    axios
      .get("/api/gallery_name")
      .then((response) => {
        const count = response.data.count;
        console.log(response.data.count);
        setGalleryNameCount(count); // Update serviceCount state with count
      })
      .catch((error) => console.error("Error fetching service count:", error));

    axios
      .get("/api/gallery")
      .then((response) => {
        const count = response.data.count;
        console.log(response.data.count);
        setGalleryCount(count); // Update serviceCount state with count
      })
      .catch((error) => console.error("Error fetching service count:", error));

    axios
      .get("/api/contact")
      .then((response) => {
        const count = response.data.count;
        console.log(response.data.count);
        setContactCount(count); // Update serviceCount state with count
      })
      .catch((error) => console.error("Error fetching service count:", error));

    axios
      .get("/api/career")
      .then((response) => {
        const count = response.data.count;
        console.log(response.data.count);
        setCareerCount(count); // Update serviceCount state with count
      })
      .catch((error) => console.error("Error fetching service count:", error));
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <NavLink to="/team" title="View Team Members">
              <div className="dashboardcard">
                <h2>
                  {usersCount}
                  <span>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Team Members</h6>
              </div>
            </NavLink>
          </div>

          <div className="col-md-3">
            <NavLink to="/applications" title="View Appllications">
              <div className="dashboardcard">
                <h2>
                  {applicationCount}
                  <span>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Applications</h6>
              </div>
            </NavLink>
          </div>
          <div className="col-md-3">
            <NavLink to="/contact" title="View Contacts">
              <div className="dashboardcard">
                <h2>
                  {contactCount}
                  <span>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Contacts</h6>
              </div>
            </NavLink>
          </div>

          <div className="col-md-3">
            <NavLink to="/gallery" title="View Service Gallery">
              <div className="dashboardcard">
                <h2>
                  {galleryCount}
                  <span>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Service Galleries</h6>
              </div>
            </NavLink>
          </div>

          <div className="col-md-3">
            <NavLink to="/gallery_name" title="View Service Gallery Names">
              <div className="dashboardcard">
                <h2>
                  {galleryNameCount}
                  <span>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Service Gallery Names</h6>
              </div>
            </NavLink>
          </div>

          <div className="col-md-3">
            <NavLink to="/opportunities" title="View Opportunities">
              <div className="dashboardcard">
                <h2>
                  {opportunityCount}
                  <span>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Opportunities</h6>
              </div>
            </NavLink>
          </div>

          <div className="col-md-3">
            <NavLink to="/career" title="View Careers">
              <div className="dashboardcard">
                <h2>
                  {careerCount}
                  <span>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Careers</h6>
              </div>
            </NavLink>
          </div>

          <div className="col-md-3">
            <NavLink to="/services" title="View Services">
              <div className="dashboardcard">
                <h2>
                  {serviceCount}
                  <span>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Services</h6>
              </div>
            </NavLink>
          </div>

          <div className="col-md-3">
            <NavLink to="/project" title="View Projects">
              <div className="dashboardcard">
                <h2>
                  {projectCount}
                  <span>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Projects</h6>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default Home;
