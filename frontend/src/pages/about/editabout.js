import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout";
import { useParams, useNavigate } from "react-router-dom";

const About = () => {
  // const { id } = useParams(); // Assuming the parameter is named aboutId
  // const [about, setAbout] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    about_description: "",
    media: "",
  });

  useEffect(() => {
    // console.log("ID", id);

    const fetchAbout = async () => {
      try {
        // const response = await axios.get(`http://localhost:8000/api/about/${aboutId}`);
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: `/about`,
        });
        const aboutData = response.data.abouts[0];
        console.log("About", response.data.abouts[0]);
        // setAbout(response.data);
        // console.log("Image", formData.image[0]);
        // console.log("Image", formData.image);

        // const imagePath =
        //   response.data.about.image && response.data.about.image[0]
        //     ? response.data.about.image[0].path
        //     : ""; // Default to an empty string if there's no image
        setFormData({
          title: aboutData.title,
          subtitle: aboutData.subtitle,
          description: aboutData.description,
          about_description: aboutData.about_description,
          media: aboutData.media,
          // image: { path: imagePath },
        });
        console.log("image path:", aboutData.media);
        // console.log("image name:", response.data.about.image[0].name);

        // console.log("image path ");
        // console.log(formData.image.path);
      } catch (error) {
        console.error("Error fetching about:", error);
      }
    };

    fetchAbout();
  }, []);

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

  // const handleChange = (e) => {
  //   if (e.target.name === "image") {
  //     // Handle file upload
  //     const file = e.target.files[0];
  //     setFormData({
  //       ...formData,
  //       image: {
  //         name: file.name,
  //         path: URL.createObjectURL(file), // Set path to a local URL
  //         file: file, // Store the selected file object
  //       },
  //     });
  //   } else {
  //     // Handle other input changes
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });Key people/teams

  //   }
  // };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
    // If the target name is 'media' and files are present, it's a file upload
    if (name === "media" && files && files.length > 0) {
      setFormData({
        ...formData,
        media: files[0], // Set the media field to the selected file
      });
    }
    // If the value is an object, it means it's already an uploaded file
    if (typeof value === "object") {
      setFormData({
        ...formData,
        media: {
          ...formData.media,
          filename: value.name,
          filepath: URL.createObjectURL(value), // Set path to a local URL
        },
      });
    } else {
      // Otherwise, it's a URL input or other input change
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
      formDataToSend.append("description", formData.description);
      formDataToSend.append("about_description", formData.about_description);
      formDataToSend.append("media", formData.media);

      const response = await axios.patch(
        "http://localhost:8000/api/about",
        formDataToSend
      );
      console.log("About updated:", response.data.updatedAbout);
      navigate("/edit/about");
    } catch (error) {
      console.error("Error updating about:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     //await axios.patch(`http://localhost:8000/api/about/${_id}`, formData);
  //     const response = await axios({
  //       method: "PATCH",
  //       baseURL: "http://localhost:8000/api/",
  //       url: `/about/`,
  //       data: formData,
  //     });
  //     // setFormData(prevState => ({
  //     //   ...prevState,
  //     //   image: { path: response.data.about.image[0].path }
  //     // }));

  //     // const imagePath = formData.image ? formData.image.path : "";
  //     // console.log("image path", imagePath);

  //     setTimeout(() => {
  //       navigate("/edit/about");
  //     }, 2000);
  //     console.log(response.data.about);

  //     // Handle success, redirect, or show a success message
  //   } catch (error) {
  //     console.error("Error updating about:", error);
  //   }
  // };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit About</h2>
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
                  // onChange={(e) => setName(e.target.value)}
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
                  // onChange={(e) => setDesignation(e.target.value)}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Descripiton</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  // onChange={(e) => setImage(e.target.files[0])}
                />
                {/* <img className="form-profile" src="src/img/about-icon-img.png" /> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>About Descripiton</label>
                <input
                  type="text"
                  name="about_description"
                  value={formData.about_description}
                  // onChange={(e) => setImage(e.target.files[0])}
                  onChange={handleChange}
                />
                {/* <img className="form-profile" src="src/img/about-icon-img.png" /> */}
              </div>
            </div>

            {/* <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Media</label>
                <input
                  type="file"
                  name="media"
                  // value={Qualification}
                  // onChange={(e) => setImage(e.target.files[0])}
                />
                <span> OR </span>

                <input
                  type="text"
                  name="media"
                  // value={Qualification}
                  // onChange={(e) => setImage(e.target.files[0])}
                />
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> 
              </div>
            </div> */}

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
                    // onChange={(e) => setImage(e.target.files[0])}
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

export default About;