// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Form, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLock } from "@fortawesome/free-solid-svg-icons";
// import Servicedetail from "../pages/user/Servicedetail";
// import VideoPlayer from "../components/Videoplayer";
// import axios from "axios";
// import "../style/user.css";

// const Gallery = () => {
//   // Define the images and videos array
//   const media = [
//     {
//       id: 1,
//       src: "images/games-img1.jpg",
//       type: "image",
//       category: "category1",
//       locked: true,
//     },
//     {
//       id: 2,
//       src: "images/game-img3.jpg",
//       type: "image",
//       category: "category2",
//       locked: false,
//     },
//     {
//       id: 3,
//       src: "images/game-img4.png",
//       type: "image",
//       category: "category2",
//       locked: true,
//     },
//     {
//       id: 4,
//       src: "images/video1.mp4",
//       type: "video",
//       category: "category3",
//       locked: false,
//     },
//     {
//       id: 5,
//       src: "images/video2.mp4",
//       type: "video",
//       category: "category2",
//       locked: true,
//     },
//     {
//       id: 6,
//       src: "https://www.w3schools.com/html/mov_bbb.mp4",
//       type: "video",
//       category: "category3",
//       locked: false,
//     },
//   ];

//   // State to track selected tab and modal visibility
//   const [selectedTab, setSelectedTab] = useState("all");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedMedia, setSelectedMedia] = useState(null);
//   const [galleryNames, setGalleryNames] = useState([]);

//   useEffect(() => {
//     const fetchGalleryNames = async () => {
//       try {
//         const service = "Games"; // Replace with your actual service name
//         const response = await axios.get(
//           `/api/gallery/gallery_names?service=${service}`
//         );
//         setGalleryNames(response.data.galleryNames);
//       } catch (error) {
//         console.error("Error fetching gallery names:", error);
//       }
//     };

//     fetchGalleryNames();
//   }, []);

//   // Function to handle tab selection
//   const handleTabSelect = (tab) => {
//     setSelectedTab(tab);
//   };

//   // Function to handle gallery item click and open modal
//   const handleMediaClick = (media) => {
//     if (!media.locked) {
//       // Navigate to another page
//       window.location.href = `./service-detail`;
//       // setSelectedMedia(media);
//       // setModalVisible(true);
//     } else {
//       // Handle locked media click (e.g., show unlock modal or form)
//       console.log("This media is locked.");
//       setSelectedMedia(media); // Set the selected video even if locked
//       setModalVisible(true); // Open modal
//       // Add your logic to handle locked media click (e.g., show unlock form)
//     }
//   };

//   // Function to handle form submission (you can implement your own logic)
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     console.log("Form submitted!");
//     // Add your logic for handling form submission (e.g., unlock video)
//     // After unlocking, you can close the modal or reload the video
//   };

//   return (
//     <div className="">
//       {/* Filterable tabs */}
//       <ul className="nav nav-tabs">
//         <li className="nav-item">
//           <button
//             className={`nav-link ${selectedTab === "all" ? "active" : ""}`}
//             onClick={() => handleTabSelect("all")}
//           >
//             All
//           </button>
//         </li>
//         {galleryNames.map((galleryName) => (
//           <li key={galleryName} className="nav-item">
//             <button
//               className={`nav-link ${
//                 selectedTab === galleryName ? "active" : ""
//               }`}
//               onClick={() => handleTabSelect(galleryName)}
//             >
//               {galleryName}
//             </button>
//           </li>
//         ))}
//       </ul>
//       {/* Gallery */}
//       <div className="row mt-3">
//         {media.map(
//           (item) =>
//             (selectedTab === "all" || item.category === selectedTab) && (
//               <div key={item.id} className="col-md-4">
//                 <div className="card">
//                   <div
//                     className="media_box position-relative"
//                     onClick={() => handleMediaClick(item)}
//                   >
//                     {item.type === "image" ? (
//                       <>
//                         {item.locked ? (
//                           <div className="locked-media">
//                             <img
//                               src={item.src}
//                               className="card-img-top"
//                               alt={`Image ${item.id}`}
//                             />
//                             <img
//                               src="images/lock-icon.svg"
//                               className="lock_icon"
//                             />
//                             {/* <FontAwesomeIcon icon={faLock} className="lock-icon" /> */}
//                           </div>
//                         ) : (
//                           <img
//                             src={item.src}
//                             className="card-img-top"
//                             alt={`Image ${item.id}`}
//                           />
//                         )}
//                       </>
//                     ) : (
//                       <>
//                         {item.locked ? (
//                           <div className="locked-media">
//                             <VideoPlayer
//                               src={item.src}
//                               type="video/mp4"
//                               className="card-img-top"
//                               controls
//                             />
//                             <img
//                               src="images/lock-icon.svg"
//                               className="lock_icon"
//                             />
//                             {/* <FontAwesomeIcon icon={faLock} className="lock-icon" /> */}
//                           </div>
//                         ) : (
//                           <VideoPlayer
//                             src={item.src}
//                             type="video/mp4"
//                             className="card-img-top"
//                             controls
//                           />
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )
//         )}
//       </div>

//       <Modal
//         className="media_modal locked_modal"
//         show={modalVisible}
//         onHide={() => setModalVisible(false)}
//       >
//         <Modal.Header closeButton>
//           {/* <Modal.Title>Media Details</Modal.Title> */}
//         </Modal.Header>
//         <Modal.Body>
//           {selectedMedia && (
//             <>
//               {selectedMedia.locked ? (
//                 <Form onSubmit={handleFormSubmit}>
//                   <Form.Group controlId="formUnlockCode">
//                     <div>
//                       <img
//                         className="lock-pop"
//                         src="images/lock-popup-icon.svg"
//                       />
//                     </div>
//                     <div>
//                       <h2 className="mb-5">
//                         Enter Password to Access this Area
//                       </h2>
//                     </div>
//                     <div className="lock-form">
//                       <div className="lock-ic">
//                         <img src="images/lock-form-icon.svg" />
//                       </div>
//                       <div className="lock-paswd">
//                         <Form.Control type="text" placeholder="Password" />
//                       </div>
//                     </div>
//                   </Form.Group>
//                   <Button variant="primary" type="submit">
//                     Submit
//                   </Button>
//                   <div className="get_paswd">
//                     <a href="#">Click here to get password</a>
//                   </div>
//                 </Form>
//               ) : (
//                 <>
//                   {selectedMedia.type === "video" ? (
//                     <VideoPlayer
//                       src={selectedMedia.src}
//                       type="video/mp4"
//                       className="w-100"
//                       controls
//                     />
//                   ) : (
//                     <img
//                       src={selectedMedia.src}
//                       className="w-100"
//                       alt={`Image ${selectedMedia.id}`}
//                     />
//                   )}
//                 </>
//               )}
//             </>
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default Gallery;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import VideoPlayer from "../components/Videoplayer";
import { useParams } from "react-router-dom";
import "../style/user.css";

const Gallery = ({ service_name }) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [galleryNames, setGalleryNames] = useState([]);
  const [media, setMedia] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchGalleryNames = async () => {
      try {
        const response = await axios.get(
          `/api/gallery_name/gallerynames?service_name=${service_name}`
        );
        setGalleryNames(response.data.galleryNames);
        console.log(response.data.galleryNames);
      } catch (error) {
        console.error("Error fetching gallery names:", error);
      }
    };

    if (service_name) {
      fetchGalleryNames();
    }
  }, [service_name]);

  useEffect(() => {
    const fetchGalleryMedia = async () => {
      try {
        let response;
        if (selectedTab === "all") {
          response = await axios.get(
            `/api/gallery/media?service_name=${service_name}&gallery_name=all`
          );
        } else {
          response = await axios.get(
            `/api/gallery/media?service_name=${service_name}&gallery_name=${selectedTab}`
          );
        }

        if (response.data && response.data.media) {
          // Check if media is an object, convert it to an array
          const mediaArray = Array.isArray(response.data.media)
            ? response.data.media
            : [response.data.media];
          setMedia(mediaArray);
        } else {
          console.error("No media data found in response:", response);
        }

        console.log(response.data.media);
      } catch (error) {
        console.error("Error fetching gallery media:", error);
      }
    };

    if (service_name) {
      fetchGalleryMedia();
    }
  }, [selectedTab, service_name]);

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  const handleMediaClick = async (media) => {
    // if (media.isPublic) {
    //   window.location.href = `./service-detail`;
    // } else {
    //   setSelectedMedia(media);
    //   setModalVisible(true);
    // }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/gallery/${id}`
      );
      const mediaDetails = response.data.gallery.media;

      if (mediaDetails.isPublic) {
        window.location.href = `./service-detail`;
      } else {
        setSelectedMedia(mediaDetails);
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching media details:", error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className="">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${selectedTab === "all" ? "active" : ""}`}
            onClick={() => handleTabSelect("all")}
          >
            All
          </button>
        </li>
        {galleryNames.map((galleryName) => (
          <li key={galleryName} className="nav-item">
            <button
              className={`nav-link ${
                selectedTab === galleryName ? "active" : ""
              }`}
              onClick={() => handleTabSelect(galleryName)}
            >
              {galleryName}
            </button>
          </li>
        ))}
      </ul>

      <div className="row mt-3">
        {Array.isArray(media) &&
          media.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="card">
                <div
                  className="media_box position-relative"
                  onClick={() => handleMediaClick(item)}
                >
                  {item.iframe ? (
                    <VideoPlayer
                      src={item.iframe}
                      type="video/mp4"
                      className="card-img-top"
                      controls
                    />
                  ) : (
                    <img
                      src={
                        item.filepath
                          ? `http://localhost:8000/${item.filepath}`
                          : "path_to_placeholder_image"
                      }
                      className="card-img-top"
                      alt={`Media ${index}`}
                    />
                  )}
                  {!item.isPublic && (
                    <div className="locked-media">
                      <img
                        src="images/lock-icon.svg"
                        className="lock_icon"
                        alt="Lock Icon"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* <Modal
        className="media_modal locked_modal"
        show={modalVisible}
        onHide={() => setModalVisible(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {selectedMedia && (
            <>
              {selectedMedia.locked ? (
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formUnlockCode">
                    <div>
                      <img
                        className="lock-pop"
                        src="images/lock-popup-icon.svg"
                        alt="Lock Pop-up Icon"
                      />
                    </div>
                    <div>
                      <h2 className="mb-5">
                        Enter Password to Access this Area
                      </h2>
                    </div>
                    <div className="lock-form">
                      <div className="lock-ic">
                        <img
                          src="images/lock-form-icon.svg"
                          alt="Lock Form Icon"
                        />
                      </div>
                      <div className="lock-paswd">
                        <Form.Control type="text" placeholder="Password" />
                      </div>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <div className="get_paswd">
                    <a href="#">Click here to get password</a>
                  </div>
                </Form>
              ) : (
                <>
                  {selectedMedia.iframe ? (
                    <VideoPlayer
                      src={selectedMedia.iframe}
                      type="video/mp4"
                      className="w-100"
                      controls
                    />
                  ) : (
                    <img
                      src={
                        selectedMedia.filepath
                          ? selectedMedia.filepath
                          : "path_to_placeholder_image"
                      }
                      className="w-100"
                      alt={`Image ${selectedMedia.id}`}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Modal.Body>
      </Modal> */}

      <Modal
        className="media_modal locked_modal"
        show={modalVisible}
        onHide={() => setModalVisible(false)}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {selectedMedia && (
            <>
              {!selectedMedia.isPublic ? (
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="formUnlockCode">
                    <div>
                      <img
                        className="lock-pop"
                        src="images/lock-popup-icon.svg"
                        alt="Lock Pop-up Icon"
                      />
                    </div>
                    <div>
                      <h2 className="mb-5">
                        Enter Password to Access this Area
                      </h2>
                    </div>
                    <div className="lock-form">
                      <div className="lock-ic">
                        <img
                          src="images/lock-form-icon.svg"
                          alt="Lock Form Icon"
                        />
                      </div>
                      <div className="lock-paswd">
                        <Form.Control type="text" placeholder="Password" />
                      </div>
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <div className="get_paswd">
                    <a href="#">Click here to get password</a>
                  </div>
                </Form>
              ) : (
                <>
                  {selectedMedia.iframe ? (
                    <VideoPlayer
                      src={selectedMedia.iframe}
                      type="video/mp4"
                      className="w-100"
                      controls
                    />
                  ) : (
                    <img
                      src={
                        selectedMedia.filepath
                          ? `{http://localhost:8000/${selectedMedia.filepath}}`
                          : "path_to_placeholder_image"
                      }
                      className="w-100"
                      alt={`Media ${selectedMedia.id}`}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Gallery;
