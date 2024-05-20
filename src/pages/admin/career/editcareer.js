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
      filepath: null,
      filename: null,
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
        console.log("media", response.data.career.media);
        console.log("media", response.data.career.media);
        setFormData({
          title: response.data.career.title,
          subtitle: response.data.career.subtitle,
          // media: response.data.career.media,
          media: response.data.career.media.iframe
            ? response.data.career.media.iframe
            : response.data.career.media.filepath, // Set media to iFrame URL if available, otherwise empty string
          media: response.data.career.media,
        });
        console.log("iframe", formData.media.iframe);
        console.log("filepath", formData.media.filepath);
      } catch (error) {
        console.error("Error fetching career:", error);
      }
    };

    fetchCareer();
  }, [id]);

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  // if (name === "media") {
  //   if (files && files.length > 0) {
  //     setFormData({
  //       ...formData,
  //       media: files[0], // If a file is provided, set media to the file
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       media: value, // If no file is provided, set media to the URL
  //       //media: { ...formData.media, iframe: value },
  //     });
  //   }
  // } else {
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // }
  //   if (name === "media" && files && files.length > 0) {
  //     const file = files[0];
  //     setFormData({
  //       ...formData,
  //       media: files[0],
  //       filepath: URL.createObjectURL(file),
  //       filename: file.name,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media") {
      if (files && files.length > 0) {
        const file = files[0];
        setFormData({
          ...formData,
          media: {
            file,
            filepath: URL.createObjectURL(file),
            filename: file.name,
          },
        });
      } else {
        setFormData({
          ...formData,
          media: {
            iframe: value,
            filepath: null,
            filename: null,
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
    console.log("Media URL:", formData.media.iframe);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      // formDataToSend.append("media", formData.media);

      if (formData.media.file) {
        formDataToSend.append("media", formData.media.file);
      } else {
        formDataToSend.append("media", formData.media.iframe);
      }

      const access_token = localStorage.getItem("access_token");
      console.log("Access token:", access_token); // Log access token

      const response = await axios({
        method: "PATCH",
        baseURL: "http://localhost:8000/api/",
        url: `/career/${id}`,
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

            {/* <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Media</label>
                {formData.media instanceof File ? (
                  <>
                    <input type="file" name="media" onChange={handleChange} />
                    <img
                      className="form-profile"
                      src={URL.createObjectURL(formData.media.filepath)}
                      alt="Media"
                    />
                  </>
                ) : (
                  <input
                    type="text"
                    name="media"
                    value={formData.media.iframe}
                    placeholder="iFrame URL"
                    onChange={handleChange}
                  />
                )}
              </div>
            </div> */}

            {/* <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Media</label>
                {/* {formData.media.type === "image" && ( // Check if iframe URL is not null */}

            {/* )} 

                <>
                  <input
                    type="text"
                    name="media"
                    value={formData.media.iframe}
                    placeholder="iFrame URL"
                    onChange={handleChange}
                  />
                  <span> OR </span>
                </>
                <>
                  <input
                    type="file"
                    name="media"
                    // value={formData.media.filename}
                    onChange={handleChange}
                  />
                  <img
                    className="form-profile"
                    src={`http://localhost:8000/${formData.media.filepath}`} // Display image
                    alt={`${formData.media.filename}`}
                  />
                </>
              </div>
            </div> */}

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Media</label>
                {/* Input field for iFrame URL */}
                <input
                  type="text"
                  name="media"
                  value={formData.media.iframe}
                  placeholder="iFrame URL"
                  onChange={handleChange}
                />
                <span> OR </span>
                {/* Input field for image upload */}
                <input type="file" name="media" onChange={handleChange} />
                {/* Display uploaded image if available */}
                {formData.media.filepath && (
                  <img
                    className="form-profile"
                    src={`http://localhost:8000/${formData.media.filepath}`}
                    alt={`${formData.media.filename}`}
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
