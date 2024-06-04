// import React from "react";
// import Header from "../../components/header";
// import { Link } from "react-router-dom";
// import VideoPlayer from "../../components/Videoplayer";
// import "../../style/user.css";

// const Home = () => {
//   return (
//     <>
//       <Header />
//       <div className="home_banner">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-lg-6">
//               <div className="video_box position-relative">
//                 <Link to="/service">
//                   <div className="app">
//                     <div className="video-list">
//                       <VideoPlayer src="images/video1.mp4" />
//                       {/* <VideoPlayer src="images/video2.mp4" /> */}
//                     </div>
//                   </div>
//                   <div className="video_title">
//                     <div className="text-center">
//                       <h2>Games</h2>
//                       <Link to="/service" className="btn-link">
//                         Read More
//                       </Link>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//             <div className="col-lg-6">
//               <div className="video_box position-relative">
//                 <Link to="/service">
//                   <div className="app">
//                     <div className="video-list">
//                       {/* <VideoPlayer src="images/video1.mp4" /> */}
//                       <VideoPlayer src="images/video2.mp4" />
//                     </div>
//                   </div>
//                   <div className="video_title">
//                     <div className="text-center">
//                       <h2>vfx</h2>
//                       <Link to="/service" className="btn-link">
//                         Read More
//                       </Link>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import VideoPlayer from "../../components/Videoplayer";
import axios from "axios";
import "../../style/user.css";
import { Helmet } from "react-helmet";

const Home = () => {
  const [gamesData, setGamesData] = useState(null);
  const [vfxData, setVfxData] = useState(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const gamesResponse = await axios.get(
          "https://ares-studio.onrender.com/api/service/servicename?service_name=GAMES"
        );
        const vfxResponse = await axios.get(
          "https://ares-studio.onrender.com/api/service/servicename?service_name=VFX"
        );
        setGamesData(gamesResponse.data.service);
        setVfxData(vfxResponse.data.service);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    };

    fetchServicesData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | ARES STUDIO</title>
      </Helmet>

      <>
        <Header />
        <div className="home_banner">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div className="video_box position-relative">
                  <Link to="/service/games">
                    {" "}
                    {/* Pass service name as parameter */}
                    <div className="app">
                      <div className="video-list">
                        {gamesData &&
                        gamesData.media &&
                        gamesData.media.iframe ? (
                          <VideoPlayer src={gamesData.media.iframe} />
                        ) : gamesData &&
                          gamesData.media &&
                          gamesData.media.filepath ? (
                          <img
                            src={`https://ares-studio.onrender.com/${gamesData.media.filepath}`}
                            alt="Games Media"
                          />
                        ) : (
                          <p>Loading...</p>
                        )}
                      </div>
                    </div>
                    <div className="video_title">
                      <div className="text-center">
                        <h2>GAMES</h2>
                        <Link to="/service/games" className="btn-link">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="video_box position-relative">
                  <Link to="/service/vfx">
                    {" "}
                    {/* Pass service name as parameter */}
                    <div className="app">
                      <div className="video-list">
                        {vfxData && vfxData.media && vfxData.media.iframe ? (
                          <VideoPlayer src={vfxData.media.iframe} />
                        ) : vfxData &&
                          vfxData.media &&
                          vfxData.media.filepath ? (
                          <img
                            src={`https://ares-studio.onrender.com/${vfxData.media.filepath}`}
                            alt="VFX Media"
                          />
                        ) : (
                          <p>Loading...</p>
                        )}
                      </div>
                    </div>
                    <div className="video_title">
                      <div className="text-center">
                        <h2>VFX</h2>
                        <Link to="/service/vfx" className="btn-link">
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
    </>
  );
};

export default Home;
