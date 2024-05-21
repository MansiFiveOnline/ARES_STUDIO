import React, { useState, useEffect } from "react";
import Layout from "../../../components/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCareer = () => {
  const { id } = useParams(); // Assuming the parameter is named userId
  const [career, setCareer] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    media: {
      iframe: "",
      file: null,
    },
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const access_token = localStorage.getItem("access_token");

        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: `career/${id}`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        setCareer(response.data.career);
        setFormData({
          title: response.data.career.title,
          subtitle: response.data.career.subtitle,
          media: {
            iframe: response.data.career.media.iframe || "",
            file: null,
          },
          metaTitle: response.data.career.metaTitle || "",
          metaDescription: response.data.career.metaDescription || "",
        });
      } catch (error) {
        console.error("Error fetching career:", error);
      }
    };

    fetchCareer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media") {
      if (files && files.length > 0) {
        const file = files[0];
        setFormData({
          ...formData,
          media: {
            file,
            iframe: "",
          },
        });
      } else {
        setFormData({
          ...formData,
          media: {
            iframe: value,
            file: null,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("metaTitle", formData.metaTitle);
      formDataToSend.append("metaDescription", formData.metaDescription);

      if (formData.media.file) {
        formDataToSend.append("media", formData.media.file);
      } else if (formData.media.iframe) {
        formDataToSend.append("media", formData.media.iframe);
      }

      const access_token = localStorage.getItem("access_token");

      const response = await axios({
        method: "PATCH",
        baseURL: "http://localhost:8000/api/",
        url: `career/${id}`,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("Career updated:", response.data.updatedCareer);

      setTimeout(() => {
        navigate("/admin/career");
      }, 2000);
    } catch (error) {
      console.error("Error updating career:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Career</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Media</label>
                <input
                  type="text"
                  name="media"
                  value={formData.media.iframe}
                  placeholder="iFrame URL"
                  onChange={handleChange}
                />
                <span> OR </span>
                <input type="file" name="media" onChange={handleChange} />
                {formData.media.file && (
                  <img
                    className="form-profile"
                    src={URL.createObjectURL(formData.media.file)}
                    alt="Media Preview"
                  />
                )}
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

export default EditCareer;
