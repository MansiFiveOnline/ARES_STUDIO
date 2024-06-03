// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Layout from "../../components/layout";
// import { useParams, useNavigate } from "react-router-dom";

// const EditTeam = () => {
//   const { id } = useParams(); // Assuming the parameter is named teamId
//   const [team, setTeam] = useState(null);
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

//     const fetchTeam = async () => {
//       try {
//         // const response = await axios.get(`http://localhost:8000/api/team/${teamId}`);
//         const response = await axios({
//           method: "GET",
//           baseURL: "http://localhost:8000/api/",
//           url: `/team/${id}`,
//         });
//         console.log(response.data.team);
//         setTeam(response.data.team);
//         // console.log("Image", formData.image[0].file);
//         console.log("Image", formData.image);

//         const imagePath =
//           response.data.team.image && response.data.team.image[0]
//             ? response.data.team.image[0].filepath
//             : ""; // Default to an empty string if there's no image
//         setFormData({
//           name: response.data.team.name,
//           designation: response.data.team.designation,
//           linkedin_url: response.data.team.linkedin_url,
//           image: imagePath,
//         });
//         console.log("image path:", response.data.team.image[0].filepath);
//         // console.log("image name:", response.data.team.image[0].name);

//         // console.log("image path ");
//         // console.log(formData.image.path);
//       } catch (error) {
//         console.error("Error fetching team:", error);
//       }
//     };

//     fetchTeam();
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
//       //await axios.patch(`http://localhost:8000/api/team/${_id}`, formData);
//       const response = await axios({
//         method: "PATCH",
//         baseURL: "http://localhost:8000/api/",
//         url: `/team/${id}`,
//         data: formData,
//       });
//       // setFormData(prevState => ({
//       //   ...prevState,
//       //   image: { path: response.data.team.image[0].path }
//       // }));

//       const imagePath = formData.image ? formData.image.filepath : "";
//       console.log("image path", imagePath);

//       setTimeout(() => {
//         navigate("/team");
//       }, 2000);
//       console.log(response.data.team);

//       // Handle success, redirect, or show a success message
//     } catch (error) {
//       console.error("Error updating team:", error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="theme-form-header">
//         <h2>Edit team</h2>
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
  const { id } = useParams(); // Assuming the parameter is named teamId
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    linkedin_url: "",
    sequence: "",
    image: "", // Only store the filepath
  });

  useEffect(() => {
    console.log("ID", id);

    const fetchTeam = async () => {
      try {
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: `/team/${id}`,
        });
        console.log(response.data.team);
        setTeam(response.data.team);

        setFormData({
          name: response.data.team.name,
          designation: response.data.team.designation,
          linkedin_url: response.data.team.linkedin_url,
          sequence: response.data.team.sequence,
          image: response.data.team.image?.[0]?.filepath || "", // Ensure the existing image is set
        });
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchTeam();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("designation", formData.designation);
      formDataToSend.append("linkedin_url", formData.linkedin_url);
      formDataToSend.append("sequence", formData.sequence);

      if (formData.image && typeof formData.image === "object") {
        formDataToSend.append("image", formData.image);
      } else if (typeof formData.image === "string") {
        formDataToSend.append("existingImage", formData.image);
      }

      const access_token = localStorage.getItem("access_token");

      const response = await axios({
        method: "PATCH",
        baseURL: "http://localhost:8000/api/",
        url: `/team/${id}`,
        data: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      // setTimeout(() => {
      navigate("/admin/team");
      // }, 2000);
      console.log(response.data.team);
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit team</h2>
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
                <input type="file" name="image" onChange={handleChange} />
                <img
                  className="form-profile"
                  src={
                    typeof formData.image === "object"
                      ? URL.createObjectURL(formData.image)
                      : `http://localhost:8000/${formData.image}`
                  }
                  alt="Profile"
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
