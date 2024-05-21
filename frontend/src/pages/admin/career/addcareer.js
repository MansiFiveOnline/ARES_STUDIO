import React, { useState } from "react";
import Layout from "../../../components/adminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCareer = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [media, setMedia] = useState({ iframe: "", file: null });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);

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

      const access_token = localStorage.getItem("access_token");

      const response = await axios({
        method: "POST",
        baseURL: "http://localhost:8000/api/",
        url: `career`,
        data: formData, // Pass formData directly as the data parameter
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log(response.data.newCareer);
      setTimeout(() => {
        navigate("/admin/career");
      }, 2000);
    } catch (error) {
      console.error("Error creating career:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Career</h2>
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
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

export default AddCareer;
