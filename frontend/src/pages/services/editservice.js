// import React, { useState, useEffect } from "react";
// import Layout from "../../components/layout";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const EditService = () => {
//   const { id } = useParams(); // Assuming the parameter is named userId
//   const [service, setService] = useState(null);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     url: "",
//     title: "",
//     subtitle: "",
//     description: "",
//     media: "",
//     metaTitle: "",
//     metaDescription: "",
//   });

//   useEffect(() => {
//     console.log("ID", id);

//     const fetchUser = async () => {
//       try {
//         // const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
//         const response = await axios({
//           method: "GET",
//           baseURL: "http://localhost:8000/api/",
//           url: `/service/${id}`,
//         });
//         console.log(response.data.service);
//         setService(response.data.service);
//         // console.log("Image", formData.image[0]);
//         // console.log("Image", formData.image);

//         // const imagePath =
//         //   response.data.service.image && response.data.service.image[0]
//         //     ? response.data.service.image[0].path
//         //     : ""; // Default to an empty string if there's no image
//         setFormData({
//           name: response.data.service.name,
//           url: response.data.service.url,
//           title: response.data.service.title,
//           subtitle: response.data.service.subtitle,
//           description: response.data.service.description,
//           media: response.data.service.media,
//           metaTitle: response.data.service.metaTitle,
//           metaDescription: response.data.service.metaDescription,

//           // image: { path: imagePath },
//         });
//         console.log("image path:", response.data.service.media.filepath);
//         // console.log("image name:", response.data.service.image[0].name);

//         // console.log("image path ");
//         // console.log(formData.image.path);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, [id]);

//   // const handleChange = (e) => {
//   //   const { name, value, files } = e.target;
//   //   // if (name === "metaTitle" || name === "metaDescription") {
//   //   //   // Handle metaTitle and metaDescription fields separately
//   //   //   setFormData({
//   //   //     ...formData,
//   //   //     [name]: value,
//   //   //   });
//   //   if (name === "media" && files && files.length > 0) {
//   //     setFormData({
//   //       ...formData,
//   //       media: files[0], // Set the media field to the selected file
//   //     });
//   //   }
//   //   // If the value is an object, it means it's already an uploaded file
//   //   if (typeof value === "object") {
//   //     setFormData({
//   //       ...formData,
//   //       media: {
//   //         ...formData.media,
//   //         filename: value.name,
//   //         filepath: URL.createObjectURL(value), // Set path to a local URL
//   //       },
//   //       // [name]: value,
//   //     });
//   //   } else {
//   //     // Otherwise, it's a URL input or other input change
//   //     setFormData({
//   //       ...formData,
//   //       [name]: value,
//   //     });
//   //   }
//   // };

//   // const handleChange = (e) => {
//   //   const { name, value, files } = e.target;

//   //   if (name === "media" && files && files.length > 0) {
//   //     // If files are provided, it means it's an image upload
//   //     setFormData({
//   //       ...formData,
//   //       media: files[0], // Set the media field to the selected file
//   //     });
//   //   } else {
//   //     // If it's not an image upload, handle other types of media inputs
//   //     if (typeof value === "object") {
//   //       // If the value is an object, it means it's already an uploaded file
//   //       setFormData({
//   //         ...formData,
//   //         media: {
//   //           ...formData.media,
//   //           filename: value.name,
//   //           filepath: URL.createObjectURL(value), // Set path to a local URL
//   //         },
//   //       });
//   //     } else {
//   //       // Otherwise, it's a URL input or other input change
//   //       setFormData({
//   //         ...formData,
//   //         [name]: value,
//   //       });
//   //     }
//   //   }
//   // };

//   // const handleChange = (e) => {
//   //   const { name, value, files } = e.target;

//   //   if (name === "media" && files && files.length > 0) {
//   //     // If files are provided, it means it's an image upload
//   //     setFormData({
//   //       ...formData,
//   //       media: files[0], // Set the media field to the selected file
//   //       // Ensure to clear iframe URL if image is uploaded
//   //       media: {
//   //         ...formData.media,
//   //         iframe: null,
//   //       },
//   //     });
//   //   } else {
//   //     // If it's not an image upload, handle other types of media inputs
//   //     if (typeof value === "object") {
//   //       // If the value is an object, it means it's already an uploaded file
//   //       setFormData({
//   //         ...formData,
//   //         media: {
//   //           ...formData.media,
//   //           filename: value.name,
//   //           filepath: URL.createObjectURL(value), // Set path to a local URL
//   //         },
//   //       });
//   //     } else {
//   //       // Otherwise, it's a URL input or other input change
//   //       setFormData({
//   //         ...formData,
//   //         [name]: value,
//   //       });
//   //     }
//   //   }
//   // };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "media" && files && files.length > 0) {
//       // If files are provided, it means it's an image upload
//       setFormData({
//         ...formData,
//         media: files[0], // Set the media field to the selected file
//         type: "image", // Set the type to "image"
//         // Ensure to clear iframe URL if an image is uploaded
//         iframe: null,
//       });
//     } else if (value.startsWith("https://")) {
//       // If it's not an image upload, it's an iframe URL input
//       setFormData({
//         ...formData,
//         media: { iframe: value }, // Set the media field to the iframe URL
//         type: "video", // Assuming URLs are videos, adjust accordingly if needed
//       });
//     } else if (name === "media") {
//       // If it's not an image upload or a URL starting with "http", assume it's a file without type
//       setFormData({
//         ...formData,
//         media: value,
//         type: "video", // Set the type to empty
//       });
//     } else {
//       // For other inputs, update formData normally
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("url", formData.url);
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("subtitle", formData.subtitle);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("media", formData.media);
//       formDataToSend.append("metaTitle", formData.metaTitle);
//       formDataToSend.append("metaDescription", formData.metaDescription);

//       console.log("meta", formData.metaTitle, formData.metaDescription);

//       //await axios.patch(`http://localhost:8000/api/user/${_id}`, formData);
//       const response = await axios({
//         method: "PATCH",
//         baseURL: "http://localhost:8000/api/",
//         url: `/service/${id}`,
//         data: formDataToSend,
//       });
//       // setFormData(prevState => ({
//       //   ...prevState,
//       //   image: { path: response.data.service.image[0].path }
//       // }));

//       console.log("Service updated:", response.data.updatedService);

//       setTimeout(() => {
//         navigate("/services");
//       }, 2000);
//       console.log(response.data.service);

//       // Handle success, redirect, or show a success message
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="theme-form-header">
//         <h2>Edit Service</h2>
//       </div>
//       <div className="form-white-bg">
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>name</label>
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
//                 <label>URL</label>
//                 <input
//                   type="text"
//                   name="url"
//                   value={formData.url}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Subtitle</label>
//                 <input
//                   type="text"
//                   name="subtitle"
//                   value={formData.subtitle}
//                   onChange={handleChange}
//                 />
//                 {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Descripiton</label>
//                 <input
//                   type="text"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                 />
//                 {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 {/* Display a message if media field has a value before submitting */}
//                 {formData.media.iframe || formData.media.file ? (
//                   <p>Media field has a value.</p>
//                 ) : (
//                   <p>Media field is empty.</p>
//                 )}
//                 <label>Media</label>
//                 {/* {formData.media.type === "image" && ( // Check if iframe URL is not null */}

//                 {/* )} */}

//                 <>
//                   <input
//                     type="text"
//                     name="media"
//                     value={formData.media.iframe}
//                     placeholder="iFrame URL"
//                     onChange={handleChange}
//                   />
//                   <span> OR </span>
//                 </>
//                 <>
//                   <input
//                     type="file"
//                     name="media"
//                     //value={formData.media.filename}
//                     onChange={handleChange}
//                   />
//                   <img
//                     className="form-profile"
//                     src={`http://localhost:8000/${formData.media.filepath}`} // Display image
//                     alt="Media"
//                   />
//                 </>
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Meta Title</label>
//                 <input
//                   type="text"
//                   name="metaTitle"
//                   value={formData.metaTitle}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Meta Description</label>
//                 <input
//                   type="text"
//                   name="metaDescription"
//                   value={formData.metaDescription}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="col-12">
//               <div className="theme-form">
//                 {/* <input type="button" value="Save" onClick={handleSubmit}/> */}
//                 <button type="submit">Save</button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default EditService;

import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditService = () => {
  const { id } = useParams(); // Assuming the parameter is named userId
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    title: "",
    subtitle: "",
    description: "",
    media: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/service/${id}`
        );
        setService(response.data.service);
        setFormData({
          name: response.data.service.name,
          url: response.data.service.url,
          title: response.data.service.title,
          subtitle: response.data.service.subtitle,
          description: response.data.service.description,
          media: response.data.service.media,
          metaTitle: response.data.service.metaTitle,
          metaDescription: response.data.service.metaDescription,
        });
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [id]);

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
      formDataToSend.append("name", formData.name);
      formDataToSend.append("url", formData.url);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("media", formData.media);
      formDataToSend.append("metaTitle", formData.metaTitle);
      formDataToSend.append("metaDescription", formData.metaDescription);

      const response = await axios.patch(
        `http://localhost:8000/api/service/${id}`,
        formDataToSend
      );
      console.log("Service updated:", response.data.updatedService);

      navigate("/services"); // Navigate after successful update
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Service</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>name</label>
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
                <label>URL</label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                <label>Descripiton</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                {/* Display a message if media field has a value before submitting */}
                {/* {formData.media.iframe || formData.media.file ? (
                  <p>Media field has a value.</p>
                ) : (
                  <p>Media field is empty.</p>
                )} */}
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
                    //value={formData.media.filename}
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

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Meta Description</label>
                <input
                  type="text"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
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

export default EditService;
