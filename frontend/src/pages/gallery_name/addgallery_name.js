import React, { useState } from "react";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddGalleryName = () => {
  const [service_name, setServiceName] = useState("");
  const [gallery_name, setGalleryName] = useState("");
  //const [selectedService, setSelectedService] = useState(""); // Define selectedService state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Selected Service:", service_name);
    try {
      const formData = {
        service_name,
        gallery_name,
      };

      const response = await axios.post(
        "http://localhost:8000/api/gallery_name",
        formData
      );

      console.log(response.data.galleryNames);
      //   console.log(service_name);
      setTimeout(() => {
        navigate("/gallery_name");
      }, 2000);
    } catch (error) {
      console.error("Error creating gallery name:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Service Gallery Name</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Service Name</label>
                <select
                  value={service_name}
                  onChange={(e) => setServiceName(e.target.value)}
                >
                  <option value="">Select a service</option>{" "}
                  {/* Empty option */}
                  <option value="Games">Games</option>
                  <option value="VFX">VFX</option>
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Gallery Name</label>
                <input
                  type="text"
                  name="gallery_name"
                  value={gallery_name}
                  onChange={(e) => setGalleryName(e.target.value)}
                />
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
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

export default AddGalleryName;
