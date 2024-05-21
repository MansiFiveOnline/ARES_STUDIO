import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import VideoPlayer from "../components/Videoplayer";
import { useParams, NavLink, useNavigate } from "react-router-dom"; // Import useHistory
import "../style/user.css";

const Gallery = ({ service_name }) => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [galleryNames, setGalleryNames] = useState([]);
  const [media, setMedia] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Access history object

  const { id } = useParams();

  useEffect(() => {
    const fetchGalleryNames = async () => {
      try {
        const response = await axios.get(
          `/api/gallery_name/gallerynames?service_name=${service_name}`
        );
        setGalleryNames(response.data.galleryNames);
      } catch (error) {
        console.error("Error fetching gallery names:", error);
      }
    };

    if (service_name) {
      fetchGalleryNames();
    }
  }, [service_name]);

  useEffect(() => {
    const fetchProjectMedia = async () => {
      try {
        let response;
        if (selectedTab === "all") {
          response = await axios.get(
            `/api/project/project_media?service_name=${service_name}&gallery_name=all`
          );
        } else {
          response = await axios.get(
            `/api/project/project_media?service_name=${service_name}&gallery_name=${selectedTab}`
          );
        }

        if (response.data && response.data.media) {
          const mediaArray = Array.isArray(response.data.media)
            ? response.data.media
            : [response.data.media];
          setMedia(mediaArray);
        } else if (response.data.media.length === 0) {
          setErrorMessage(
            "No media found for the given service and gallery name."
          );
        } else {
          setMedia(response.data.media);
          setErrorMessage("");
        }
      } catch (error) {
        setErrorMessage("Error fetching media.");
        console.error("Error fetching gallery media:", error);
      }
    };

    if (service_name) {
      fetchProjectMedia();
    }
  }, [selectedTab, service_name]);

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  const handleMediaClick = async (media) => {
    try {
      setSelectedMedia(media);
      if (media.isPublic) {
        // If media is public, navigate to the service detail page
        navigate(`/service-detail/${media.projectName}`);
      } else {
        // If media is not public, show modal
        setModalVisible(true);
      }
      console.log("Selected Media:", media);
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
      {errorMessage ? (
        <p className="text-center">{errorMessage}</p>
      ) : (
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
                    <div className="project-name">
                      {item.projectName} {/* Display project name */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {selectedMedia && !selectedMedia.isPublic && (
        <Modal
          className="media_modal locked_modal"
          show={modalVisible}
          onHide={() => setModalVisible(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
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
                  <h2 className="mb-5">Enter Password to Access this Area</h2>
                </div>
                <div className="lock-form">
                  <div className="lock-ic">
                    <img src="images/lock-form-icon.svg" alt="Lock Form Icon" />
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
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Gallery;
