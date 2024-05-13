import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditGalleryName = () => {
  const { id } = useParams(); // Assuming the parameter is named userId
  //   const [gallery_name, setGalleryName] = useState("");
  //   const [service_name, setServiceName] = useState("");
  const [formData, setFormData] = useState({
    service_name: "",
    gallery_name: "",
  });
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  //   const [formData, setFormData] = useState({
  //     service_name: "",
  //     gallery_name: "",
  //   });

  useEffect(() => {
    const fetchGalleryName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/gallery_name/${id}`
        );
        const { service_name, gallery_name } = response.data.galleryName;
        setFormData({
          service_name,
          gallery_name,
        });
        setSelectedService(service_name);
        console.log(formData.gallery_name);
        // setSelectedService(service_name);
      } catch (error) {
        console.error("Error fetching gallery name:", error);
      }
    };

    fetchGalleryName();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   const formData = new FormData();
      //   formData.append("gallery_name", gallery_name);
      //   formData.append("service_name", service_name);
      const response = await axios.patch(
        `http://localhost:8000/api/gallery_name/${id}`,
        formData
      );
      console.log("Gallery name updated:", response.data.updatedGalleryName);
      setTimeout(() => {
        navigate("/gallery_name");
      }, 2000);
    } catch (error) {
      console.error("Error updating gallery name:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Service Gallery Name</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Service Name</label>
                <select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    setFormData({
                      ...formData,
                      service_name: e.target.value,
                    });
                  }}
                >
                  {/* <option value="">Select a service</option>{" "} */}
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
                  value={formData.gallery_name}
                  onChange={handleChange}
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

export default EditGalleryName;
