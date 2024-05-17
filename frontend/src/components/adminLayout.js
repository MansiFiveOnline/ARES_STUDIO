import React from "react";
import Header from "./adminHeader";
import SideBar from "./adminSidebar";
import "../style/index.css";

const Layout = ({ children }) => {
  return (
    <div>
      <input type="checkbox" id="nav-toggle" name="" />
      <div className="sidebar">
        <SideBar />
      </div>

      <div className="main-content">
        <Header />
        <main>
          <div className="container">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
