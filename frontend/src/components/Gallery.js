import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Servicedetail from "../pages/user/Servicedetail";
import VideoPlayer from "../components/Videoplayer";
import "../style/user.css";

const Gallery = () => {
  // Define the images and videos array
  const media = [
    {
      id: 1,
      src: "images/games-img1.jpg",
      type: "image",
      category: "category1",
      locked: true,
    },
    {
      id: 2,
      src: "images/game-img3.jpg",
      type: "image",
      category: "category2",
      locked: false,
    },
    {
      id: 3,
      src: "images/game-img4.png",
      type: "image",
      category: "category2",
      locked: true,
    },
    {
      id: 4,
      src: "images/video1.mp4",
      type: "video",
      category: "category3",
      locked: false,
    },
    {
      id: 5,
      src: "images/video2.mp4",
      type: "video",
      category: "category2",
      locked: true,
    },
    {
      id: 6,
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      type: "video",
      category: "category3",
      locked: false,
    },
  ];

  // State to track selected tab and modal visibility
  const [selectedTab, setSelectedTab] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Function to handle tab selection
  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  // Function to handle gallery item click and open modal
  const handleMediaClick = (media) => {
    if (!media.locked) {
      // Navigate to another page
      window.location.href = `./service-detail`;
      // setSelectedMedia(media);
      // setModalVisible(true);
    } else {
      // Handle locked media click (e.g., show unlock modal or form)
      console.log("This media is locked.");
      setSelectedMedia(media); // Set the selected video even if locked
      setModalVisible(true); // Open modal
      // Add your logic to handle locked media click (e.g., show unlock form)
    }
  };

  // Function to handle form submission (you can implement your own logic)
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    // Add your logic for handling form submission (e.g., unlock video)
    // After unlocking, you can close the modal or reload the video
  };

  return (
    <div className="">
      {/* Filterable tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${selectedTab === "all" ? "active" : ""}`}
            onClick={() => handleTabSelect("all")}
          >
            All
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              selectedTab === "category1" ? "active" : ""
            }`}
            onClick={() => handleTabSelect("category1")}
          >
            Category 1
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              selectedTab === "category2" ? "active" : ""
            }`}
            onClick={() => handleTabSelect("category2")}
          >
            Category 2
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              selectedTab === "category3" ? "active" : ""
            }`}
            onClick={() => handleTabSelect("category3")}
          >
            Category 3
          </button>
        </li>
      </ul>

      {/* Gallery */}
      <div className="row mt-3">
        {media.map(
          (item) =>
            (selectedTab === "all" || item.category === selectedTab) && (
              <div key={item.id} className="col-md-4">
                <div className="card">
                  <div
                    className="media_box position-relative"
                    onClick={() => handleMediaClick(item)}
                  >
                    {item.type === "image" ? (
                      <>
                        {item.locked ? (
                          <div className="locked-media">
                            <img
                              src={item.src}
                              className="card-img-top"
                              alt={`Image ${item.id}`}
                            />
                            <img
                              src="images/lock-icon.svg"
                              className="lock_icon"
                            />
                            {/* <FontAwesomeIcon icon={faLock} className="lock-icon" /> */}
                          </div>
                        ) : (
                          <img
                            src={item.src}
                            className="card-img-top"
                            alt={`Image ${item.id}`}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {item.locked ? (
                          <div className="locked-media">
                            <VideoPlayer
                              src={item.src}
                              type="video/mp4"
                              className="card-img-top"
                              controls
                            />
                            <img
                              src="images/lock-icon.svg"
                              className="lock_icon"
                            />
                            {/* <FontAwesomeIcon icon={faLock} className="lock-icon" /> */}
                          </div>
                        ) : (
                          <VideoPlayer
                            src={item.src}
                            type="video/mp4"
                            className="card-img-top"
                            controls
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      <Modal
        className="media_modal locked_modal"
        show={modalVisible}
        onHide={() => setModalVisible(false)}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Media Details</Modal.Title> */}
        </Modal.Header>
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
                      />
                    </div>
                    <div>
                      <h2 className="mb-5">
                        Enter Password to Access this Area
                      </h2>
                    </div>
                    <div className="lock-form">
                      <div className="lock-ic">
                        <img src="images/lock-form-icon.svg" />
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
                  {selectedMedia.type === "video" ? (
                    <VideoPlayer
                      src={selectedMedia.src}
                      type="video/mp4"
                      className="w-100"
                      controls
                    />
                  ) : (
                    <img
                      src={selectedMedia.src}
                      className="w-100"
                      alt={`Image ${selectedMedia.id}`}
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
