import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddGallery = () => {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [selectedService, setSelectedService] = useState("Games"); // Define selectedService state
  const [selectedGallery, setSelectedGallery] = useState(""); // Define selectedGallery state
  const [galleryNames, setGalleryNames] = useState([]); // Initialize galleryNames state as an empty array
  const [media, setMedia] = useState({ iframe: "", file: null });
  const [isPublic, setIsPublic] = useState(true); // Define isPublic state and set default value to true
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("service", service);

      // Check if both media fields are provided
      if (media.iframe && media.file) {
        throw new Error(
          "Please provide either an iFrame URL or an image, not both."
        );
      }

      // Append media based on the provided type
      if (media.iframe) {
        formData.append("media", media.iframe);
      } else if (media.file) {
        formData.append("media", media.file);
      }

      const response = await axios.post(
        "http://localhost:8000/api/gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.newGallery);
      setTimeout(() => {
        navigate("/gallery");
      }, 2000);
    } catch (error) {
      console.error("Error creating gallery:", error);
    }
  };

  useEffect(() => {
    const fetchGalleryNames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/gallery/galleries?service=${selectedService}`
        );
        setGalleryNames(response.data.galleries.map((gallery) => gallery.name));
      } catch (error) {
        console.error("Error fetching gallery names:", error);
      }
    };

    fetchGalleryNames();
  }, [selectedService]);

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Gallery</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="Games">Games</option>
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
                  {galleryNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
              </div>
            </div>

            <label>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Public
            </label>
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
                      file: "",
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
                      // filename: e.target.files[0],
                      // filepath: e.target.files[0],
                      iframe: "",
                    })
                  }
                />
              </div>
            </div>

            <div className="col-12">
              <div className="theme-form">
                {/* <input type="button" value="Save" onClick={handleSubmit}/> */}
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
