import React, { useState, useEffect } from "react";
import Layout from "../../../components/adminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddGallery = () => {
  const [gallery_name, setGalleryName] = useState("");
  const [service_name, setServiceName] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedGallery, setSelectedGallery] = useState("");
  const [galleryNames, setGalleryNames] = useState([]);
  const [media, setMedia] = useState({ iframe: "", file: null });
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const fetchGalleryNames = async () => {
    try {
      const response = await axios({
        method: "GET",
        baseURL: "http://localhost:8000/api/",
        url: `gallery_name/gallerynames?service_name=${selectedService}`,
      });

      console.log("Gallery names response:", response);
      console.log("Gallery names:", galleryNames);

      // setGalleryNames(
      //   response.data.galleryNames.map((gallery) => gallery.name)
      // );
      setGalleryNames(response.data.galleryNames);
    } catch (error) {
      console.error("Error fetching gallery names:", error);
    }
  };

  useEffect(() => {
    // fetchGalleryNames();
    if (selectedService) {
      fetchGalleryNames();
    }
  }, [selectedService]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set isPublic to false if the checkbox is unchecked
      if (!isPublic) {
        setIsPublic(false);
      }

      const formData = new FormData();
      formData.append("gallery_name", selectedGallery);
      formData.append("service_name", selectedService);
      formData.append("isPublic", isPublic); // Include isPublic in the form data

      // Check if either an iFrame URL or a file is provided for the media field
      if (media.iframe && media.iframe.trim()) {
        formData.append("media", media.iframe.trim());
      } else if (media.file) {
        formData.append("media", media.file);
      } else {
        throw new Error(
          "Either a file or a valid URL is required for the media field."
        );
      }

      const access_token = localStorage.getItem("access_token");

      const response = await axios.post(
        "http://localhost:8000/api/gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(response.data.newGallery);
      setTimeout(() => {
        navigate("/admin/gallery");
      }, 2000);
    } catch (error) {
      console.error("Error creating gallery:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Service Gallery</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    fetchGalleryNames();
                  }}
                >
                  <option value="">Select a service</option>
                  <option value="GAMES">GAMES</option>
                  <option value="VFX">VFX</option>
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Gallery Name</label>
                <select
                  value={selectedGallery}
                  onChange={(e) => setSelectedGallery(e.target.value)}
                >
                  <option value="">Select a Gallery</option>
                  {galleryNames.map(
                    (gallery_name) => (
                      console.log("names", gallery_name),
                      (
                        <option key={gallery_name._id} value={gallery_name}>
                          {gallery_name}
                        </option>
                      )
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Media</label>
                <input
                  type="text"
                  name="media"
                  value={media.iframe}
                  placeholder="iFrame URL"
                  onChange={(e) =>
                    setMedia({
                      ...media,
                      iframe: e.target.value,
                      file: null,
                    })
                  }
                />
                <span> OR </span>
                <input
                  type="file"
                  name="media"
                  onChange={(e) =>
                    setMedia({
                      ...media,
                      file: e.target.files[0],
                      iframe: "",
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12">
              <div className="theme-form">
                <button type="submit">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddGallery;
