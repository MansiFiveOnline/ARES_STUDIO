import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout";
import { useParams, useNavigate } from "react-router-dom";

const About = () => {
  const { id } = useParams(); // Assuming the parameter is named aboutId
  const [about, setAbout] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    about_description: "",
    // media: { path: "" },
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
        console.log("About", response.data);
        setAbout(response.data);
        // console.log("Image", formData.image[0]);
        // console.log("Image", formData.image);

        // const imagePath =
        //   response.data.about.image && response.data.about.image[0]
        //     ? response.data.about.image[0].path
        //     : ""; // Default to an empty string if there's no image
        setFormData({
          title: response.data.title,
          subtitle: response.data.subtitle,
          description: response.data.description,
          about_description: response.data.about_description,

          // image: { path: imagePath },
        });
        console.log("image path:", response.data.about.image[0].path);
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
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await axios.patch(`http://localhost:8000/api/about/${_id}`, formData);
      const response = await axios({
        method: "PATCH",
        baseURL: "http://localhost:8000/api/",
        url: `/about/${id}`,
        data: formData,
      });
      // setFormData(prevState => ({
      //   ...prevState,
      //   image: { path: response.data.about.image[0].path }
      // }));

      // const imagePath = formData.image ? formData.image.path : "";
      // console.log("image path", imagePath);

      setTimeout(() => {
        navigate("/edit/about");
      }, 2000);
      console.log(response.data.about);

      // Handle success, redirect, or show a success message
    } catch (error) {
      console.error("Error updating about:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit About</h2>
      </div>
      <div className="form-white-bg">
        <form>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  // onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  // value={Description}
                  // onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Descripiton</label>
                <input
                  type="text"
                  name="description"
                  // value={Qualification}
                  // onChange={(e) => setImage(e.target.files[0])}
                  required
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
                  // value={Qualification}
                  // onChange={(e) => setImage(e.target.files[0])}
                  required
                />
                {/* <img className="form-profile" src="src/img/about-icon-img.png" /> */}
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
