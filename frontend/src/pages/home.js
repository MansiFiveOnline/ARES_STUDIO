import React from "react";
// import Register from "./register";
// import Login from "./login";
import Layout from "../components/layout";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <Layout>
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <NavLink to="/team" title="View Team Members">
              <div class="dashboardcard">
                <h2>
                  2{" "}
                  <span>
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Team Members</h6>
              </div>
            </NavLink>
          </div>

          <div class="col-md-3">
            <NavLink to="/applications" title="View Appllications">
              <div class="dashboardcard">
                <h2>
                  12{" "}
                  <span>
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Applications</h6>
              </div>
            </NavLink>
          </div>
          <div class="col-md-3">
            <NavLink to="/contact" title="View Contacts">
              <div class="dashboardcard">
                <h2>
                  3{" "}
                  <span>
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </h2>
                <h6>Total Contacts</h6>
              </div>
            </NavLink>
          </div>
          {/* <div class="col-md-3">
					<div class="dashboardcard">
						<h2>3 <span><a href="certificates.php" title="View Certificates"><i class="fa fa-eye" aria-hidden="true"></i></a></span></h2>
						<h6>Total Certificates</h6>
					</div> */}
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default Home;
