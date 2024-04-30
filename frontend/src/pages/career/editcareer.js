import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCareer = () => {
  const { id } = useParams(); // Assuming the parameter is named userId
  const [career, setCareer] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    media: "",
  });

  useEffect(() => {
    console.log("ID", id);

    const fetchCareer = async () => {
      try {
        // const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: `/career/${id}`,
        });
        console.log(response.data.career);
        setCareer(response.data.career);
        // console.log("Image", formData.image[0]);
        // console.log("Image", formData.image);

        // const imagePath =
        //   response.data.career.image && response.data.career.image[0]
        //     ? response.data.career.image[0].path
        //     : ""; // Default to an empty string if there's no image
        setFormData({
          title: response.data.career.title,
          subtitle: response.data.career.subtitle,
          media: response.data.career.media,

          // image: { path: imagePath },
        });
        console.log("image path:", response.data.career.media.filepath);
        // console.log("image name:", response.data.career.image[0].name);

        // console.log("image path ");
        // console.log(formData.image.path);
      } catch (error) {
        console.error("Error fetching career:", error);
      }
    };

    fetchCareer();
  }, [id]);

  // const handleChange = (e) => {
  //   if (e.target.name === "image") {

  //     // Handle file upload
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.files[0], // Store the selected file
  //       imageName: e.target.files[0].name, // Update the image name
  //     });
  //   } else {
  //     // Handle other input changes
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media" && files && files.length > 0) {
      setFormData({
        ...formData,
        media: files[0],
      });
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
      formDataToSend.append("media", formData.media);

      //await axios.patch(`http://localhost:8000/api/user/${_id}`, formData);
      const response = await axios({
        method: "PATCH",
        baseURL: "http://localhost:8000/api/",
        url: `/career/${id}`,
        data: formDataToSend,
      });
      // setFormData(prevState => ({
      //   ...prevState,
      //   image: { path: response.data.career.image[0].path }
      // }));

      console.log("Career updated:", response.data.updatedService);

      setTimeout(() => {
        navigate("/career");
      }, 2000);
      console.log(response.data.career);

      // Handle success, redirect, or show a success message
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
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Media</label>
                {/* {formData.media.type === "image" && ( // Check if iframe URL is not null */}

                {/* )} */}

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
                    alt="Media"
                  />
                </>
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

export default EditCareer;
