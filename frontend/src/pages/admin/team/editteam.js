// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Layout from "../../components/layout";
// import { useParams, useNavigate } from "react-router-dom";

// const EditTeam = () => {
//   const { id } = useParams(); // Assuming the parameter is named userId
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     designation: "",
//     linkedin_url: "",
//     // image: { path: "" },
//     image: "",
//   });

//   useEffect(() => {
//     console.log("ID", id);

//     const fetchUser = async () => {
//       try {
//         // const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
//         const response = await axios({
//           method: "GET",
//           baseURL: "http://localhost:8000/api/",
//           url: `/user/${id}`,
//         });
//         console.log(response.data.user);
//         setUser(response.data.user);
//         // console.log("Image", formData.image[0].file);
//         console.log("Image", formData.image);

//         const imagePath =
//           response.data.user.image && response.data.user.image[0]
//             ? response.data.user.image[0].filepath
//             : ""; // Default to an empty string if there's no image
//         setFormData({
//           name: response.data.user.name,
//           designation: response.data.user.designation,
//           linkedin_url: response.data.user.linkedin_url,
//           image: imagePath,
//         });
//         console.log("image path:", response.data.user.image[0].filepath);
//         // console.log("image name:", response.data.user.image[0].name);

//         // console.log("image path ");
//         // console.log(formData.image.path);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   // const handleChange = (e) => {
//   //   if (e.target.name === "image") {

//   //     // Handle file upload
//   //     setFormData({
//   //       ...formData,
//   //       [e.target.name]: e.target.files[0], // Store the selected file
//   //       imageName: e.target.files[0].name, // Update the image name
//   //     });
//   //   } else {
//   //     // Handle other input changes
//   //     setFormData({
//   //       ...formData,
//   //       [e.target.name]: e.target.value,
//   //     });
//   //   }
//   // };

//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       // Handle file upload
//       const file = e.target.files[0];
//       setFormData({
//         ...formData,
//         image: {
//           filename: file.name,
//           filepath: URL.createObjectURL(file), //`uploads/teams/${file.name}`,  // Set path to a local URL
//           file: file, // Store the selected file object
//         },
//       });
//     } else {
//       // Handle other input changes
//       setFormData({
//         ...formData,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       //await axios.patch(`http://localhost:8000/api/user/${_id}`, formData);
//       const response = await axios({
//         method: "PATCH",
//         baseURL: "http://localhost:8000/api/",
//         url: `/user/${id}`,
//         data: formData,
//       });
//       // setFormData(prevState => ({
//       //   ...prevState,
//       //   image: { path: response.data.user.image[0].path }
//       // }));

//       const imagePath = formData.image ? formData.image.filepath : "";
//       console.log("image path", imagePath);

//       setTimeout(() => {
//         navigate("/team");
//       }, 2000);
//       console.log(response.data.user);

//       // Handle success, redirect, or show a success message
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="theme-form-header">
//         <h2>Edit User</h2>
//       </div>
//       <div className="form-white-bg">
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Designation</label>
//                 <input
//                   type="text"
//                   name="designation"
//                   value={formData.designation}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>LinkedIn URL</label>
//                 <input
//                   type="text"
//                   name="linkedin_url"
//                   value={formData.linkedin_url}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Sequence</label>
//                 <input
//                   type="text"
//                   name="sequence"
//                   value={formData.sequence}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Image</label>
//                 <input
//                   type="file"
//                   name="image"
//                   // value={formData.image.name}
//                   onChange={handleChange}
//                 />
//                 {/* <span>{formData.imageName || "No file chosen"}</span>{" "}
//                 {/* Display the selected file name
//                 {formData.image && (
//                   <img
//                     className="form-profile"
//                     src={URL.createObjectURL(formData.image)}
//                     alt={formData.imageName}
//                   />
//                 )} */}
//                 {/* <span>{formData.imageName || "No file chosen"}</span> {/* Display the selected file name
//                 {formData.image && (
//                 <img className="form-profile" src={formData.image ? URL.createObjectURL(formData.image) : `http://localhost:8000/${formData.image.path}`} alt={formData.imageName} />
//                 )} */}
//                 <img
//                   className="form-profile"
//                   src={`http://localhost:8000/${formData.image.filepath}`}
//                   alt={formData.image.filename}
//                 />
//               </div>
//             </div>

//             <div className="col-12">
//               <div className="theme-form">
//                 <button type="submit">Save</button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default EditTeam;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../components/adminLayout";
import { useParams, useNavigate } from "react-router-dom";

const EditTeam = () => {
  const { id } = useParams(); // Assuming the parameter is named userId
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    linkedin_url: "",
    // image: { path: "" },
    image: "",
  });

  useEffect(() => {
    console.log("ID", id);

    const fetchUser = async () => {
      try {
        // const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: `/user/${id}`,
        });
        console.log(response.data.user);
        setUser(response.data.user);
        console.log("Image", formData.image[0]);
        console.log("Image", formData.image);

        const imagePath =
          response.data.user.image && response.data.user.image[0]
            ? response.data.user.image[0].filepath
            : ""; // Default to an empty string if there's no image
        setFormData({
          name: response.data.user.name,
          designation: response.data.user.designation,
          linkedin_url: response.data.user.linkedin_url,
          image: imagePath,
        });
        console.log("image path:", response.data.user.image[0].filepath);
        console.log("image path1:", formData.image[0].filepath);

        // console.log("image name:", response.data.user.image[0].name);

        // console.log("image path ");
        // console.log(formData.image.path);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
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
    if (e.target.name === "image") {
      // Handle file upload
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: {
          filename: file.name,
          filepath: URL.createObjectURL(file), //`uploads/teams/${file.name}`,  // Set path to a local URL
          file: file, // Store the selected file object
        },
      });
    } else {
      // Handle other input changes
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await axios.patch(`http://localhost:8000/api/user/${_id}`, formData);
      const response = await axios({
        method: "PATCH",
        baseURL: "http://localhost:8000/api/",
        url: `/user/${id}`,
        data: formData,
      });
      // setFormData(prevState => ({
      //   ...prevState,
      //   image: { path: response.data.user.image[0].path }
      // }));

      // Extract the filepath from formData.image if it exists
      const imagePath = formData.image ? formData.image.filepath : "";
      // const imagePath = formData.image ? formData.image.filepath : "";
      console.log("image path", imagePath);

      setTimeout(() => {
        navigate("/team");
      }, 2000);
      console.log(response.data.user);

      // Handle success, redirect, or show a success message
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit User</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Sequence</label>
                <input
                  type="text"
                  name="sequence"
                  value={formData.sequence}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  // value={formData.image.name}
                  onChange={handleChange}
                />
                {/* <span>{formData.imageName || "No file chosen"}</span>{" "}
                {/* Display the selected file name 
                {formData.image && (
                  <img
                    className="form-profile"
                    src={URL.createObjectURL(formData.image)}
                    alt={formData.imageName}
                  />
                )} */}
                {/* <span>{formData.imageName || "No file chosen"}</span> {/* Display the selected file name 
                {formData.image && (
                <img className="form-profile" src={formData.image ? URL.createObjectURL(formData.image) : `http://localhost:8000/${formData.image.path}`} alt={formData.imageName} />
                )} */}
                <img
                  className="form-profile"
                  src={
                    typeof formData.image === "object"
                      ? URL.createObjectURL(formData.image.file)
                      : `http://localhost:8000/${formData.image}`
                  }
                  alt={formData.image.filename}
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

export default EditTeam;
