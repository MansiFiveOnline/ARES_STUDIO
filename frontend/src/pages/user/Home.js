import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import VideoPlayer from "../../components/Videoplayer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home_banner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="video_box position-relative">
                <Link to="/service">
                  <div className="app">
                    <div className="video-list">
                      <VideoPlayer src="images/video1.mp4" />
                      {/* <VideoPlayer src="images/video2.mp4" /> */}
                    </div>
                  </div>
                  <div className="video_title">
                    <div className="text-center">
                      <h2>Games</h2>
                      <Link to="/service" className="btn-link">
                        Read More
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="video_box position-relative">
                <Link to="/service">
                  <div className="app">
                    <div className="video-list">
                      {/* <VideoPlayer src="images/video1.mp4" /> */}
                      <VideoPlayer src="images/video2.mp4" />
                    </div>
                  </div>
                  <div className="video_title">
                    <div className="text-center">
                      <h2>vfx</h2>
                      <Link to="/service" className="btn-link">
                        Read More
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
