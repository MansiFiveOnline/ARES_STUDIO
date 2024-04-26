import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import "../style/index.css";
import axios from "axios";

// import PeopleIcon from "@mui/icons-material/People";
// import ArticleIcon from "@mui/icons-material/Article";
// import CallIcon from "@mui/icons-material/Call";
// import HowToRegIcon from "@mui/icons-material/HowToReg";
// import LoginIcon from "@mui/icons-material/Login";
// import LogoutIcon from "@mui/icons-material/Logout";

const SideBar = () => {
  const { id } = useParams();
  const [about, setAbout] = useState([]);

  // useEffect(() => {
  //   console.log("ID", id);

  //   const fetchAbout = async () => {
  //     try {
  //       // const response = await axios.get(`http://localhost:8000/api/about/${aboutId}`);
  //       const response = await axios({
  //         method: "GET",
  //         baseURL: "http://localhost:8000/api/",
  //         url: `/about/${id}`,
  //       });
  //       console.log("about", response.data.about);
  //       setAbout(response.data.about);
  //     } catch (error) {
  //       console.error("Error fetching about:", error);
  //     }
  //   };
  //   fetchAbout();
  // }, [id]);
  return (
    <>
      <div className="sidebar-brand">
        <NavLink to="/">ARES Studio</NavLink>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink to="/" className="nav-link" title="Home">
              <span className="las la-home"></span> <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/team" title="Team">
              <span className="las la-user-tie"></span> <span>Team</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/applications" title="Applications">
              <span className="las la-book"></span> <span>Applications</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" title="Contact">
              <span className="las la-users"></span> <span>Contact</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/register" title="Register">
              <span className="las la-certificate"></span> <span>Register</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/gallery" title="Gallery">
              <span className="las la-sign-in-alt"></span> <span>Gallery</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery_name" title="Gallery Name">
              <span className="las la-sign-in-alt"></span>{" "}
              <span>Gallery Name</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/opportunities" title="Opportunities">
              <span className="las la-sign-in-alt"></span>{" "}
              <span>Opportunities</span>
            </NavLink>
          </li>

          {/* {about.map((aboutItem) => ( */}
          <li>
            <NavLink to="/edit/about" title="About">
              <span className="las la-sign-in-alt"></span> <span>About</span>
            </NavLink>
          </li>
          {/* ))} */}

          <li>
            <NavLink to="/career" title="Career">
              <span className="las la-sign-in-alt"></span> <span>Career</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" title="Services">
              <span className="las la-sign-in-alt"></span> <span>Services</span>
            </NavLink>
          </li>

          <li className="logout-menu" title="Logout">
            <NavLink to="/login">
              <span className="las la-sign-out-alt"></span> <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
    // <nav className="navbar bg-body-tertiary fixed-top">
    //   <div className=" container-fluid">
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="offcanvas"
    //       data-bs-target="#offcanvasNavbar"
    //       aria-controls="offcanvasNavbar"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     <NavLink className="navbar-brand" to="/team">
    //       <h2>ARES Studio</h2>
    //     </NavLink>
    //     <div className="user-wrapper dropdown">
    //       <button onclick="myFunction()" className="dropbtn">
    //         <img src="src/img/user-icon-img.png" width="40px" height="40px" />
    //         <small>Super Admin</small>
    //       </button>

    //       <div id="myDropdown" className="dropdown-content">
    //         <NavLink to="" title="Logout">
    //           <i className="las la-sign-out-alt"></i> Logout
    //         </NavLink>
    //       </div>
    //     </div>
    //     <div
    //       className="offcanvas offcanvas-start"
    //       tabIndex="-1"
    //       id="offcanvasNavbar"
    //       aria-labelledby="offcanvasNavbarLabel"
    //     >
    //       <div className="offcanvas-header">
    //         <NavLink className="navbar-brand" to="/team">
    //           <h5>ARES Studio</h5>
    //         </NavLink>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="offcanvas"
    //           aria-label="Close"
    //         ></button>
    //       </div>
    //       <div className="sidebar-menu">
    //         <ul className="sidebar-nav justify-content-start flex-grow-1 pe-3">
    //         <li className="nav-item">
    //             <Link
    //               className="nav-link active"
    //               aria-current="page"
    //               to="/team"
    //             >
    //               <PeopleIcon />
    //               <span>Home</span>
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link
    //               className="nav-link"
    //               aria-current="page"
    //               to="/team"
    //             >
    //               <PeopleIcon />
    //               <span>Team</span>
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/application">
    //               <ArticleIcon /> <span>Application</span>
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/contact">
    //               <CallIcon /> <span>Contact</span>
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/register">
    //               <HowToRegIcon /> <span>Register</span>
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link className="nav-link" to="/login">
    //               <LoginIcon /> <span>Login</span>
    //             </Link>
    //           </li>
    //           <li className="nav-item logout-menu" title="Logout">
    //             <Link to="/logout">
    //               <LogoutIcon />
    //               <span>Logout</span>
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default SideBar;
