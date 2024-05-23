// import React, { useState, useEffect } from "react";
// import Layout from "../../../components/adminLayout";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const EditProject = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [galleryNames, setGalleryNames] = useState([]);
//   const [selectedService, setSelectedService] = useState("");
//   const [selectedGallery, setSelectedGallery] = useState("");
//   // const [media, setMedia] = useState({ iframe: "", file: null, filepath: "" });
//   const [isPublic, setIsPublic] = useState(true);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     service_name: "",
//     gallery_name: "",
//     media: {
//       file: null,
//       iframe: "",
//       filepath: "",
//     },
//     project_name: "",
//     subtitle: "",
//     description: "",
//     isPublic: "",
//   });

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const response = await axios({
//           method: "GET",
//           baseURL: "http://localhost:8000/api/",
//           url: `project/${id}`,
//         });

//         const projectData = response.data.project;
//         setProject(projectData);

//         setSelectedService(projectData.service_name);
//         setSelectedGallery(projectData.gallery_name);
//         // setMedia(projectData.media);

//         setFormData({
//           service_name: projectData.service_name,
//           gallery_name: projectData.gallery_name,
//           project_name: projectData.project_name,
//           subtitle: projectData.subtitle,
//           description: projectData.description,
//           isPublic: projectData.isPublic,
//           media: {
//             file: null,
//             iframe: projectData.media.iframe || "",
//             filepath: projectData.media.filepath || "",
//           },
//         });

//         fetchGalleryNames(projectData.service_name);
//       } catch (error) {
//         console.error("Error fetching project:", error);
//       }
//     };

//     fetchProject();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "media") {
//       if (files && files.length > 0) {
//         setFormData({
//           ...formData,
//           media: {
//             file: files[0],
//             filename: files[0].name,
//             filepath: URL.createObjectURL(files[0]),
//             iframe: "",
//           },
//         });
//       } else {
//         setFormData({
//           ...formData,
//           media: {
//             ...formData.media,
//             iframe: value,
//           },
//         });
//       }
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const fetchGalleryNames = async (service_name) => {
//     try {
//       const response = await axios({
//         method: "GET",
//         baseURL: "http://localhost:8000/api/",
//         url: `gallery_name/gallerynames?service_name=${service_name}`,
//       });

//       setGalleryNames(response.data.galleryNames);
//     } catch (error) {
//       console.error("Error fetching gallery names:", error);
//     }
//   };

//   useEffect(() => {
//     fetchGalleryNames(selectedService);
//   }, [selectedService]);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const formDataToSend = new FormData();

//   //     // Append fields only if they are provided
//   //     if (formData.project_name)
//   //       formDataToSend.append("project_name", formData.project_name);
//   //     if (formData.service_name)
//   //       formDataToSend.append("service_name", formData.service_name);
//   //     if (formData.subtitle)
//   //       formDataToSend.append("subtitle", formData.subtitle);
//   //     if (formData.description)
//   //       formDataToSend.append("description", formData.description);
//   //     if (formData.description)
//   //       formDataToSend.append("gallery_name", formData.gallery_name);

//   //     // Append media file if it exists
//   //     if (formData.media.file) {
//   //       formDataToSend.append("media", formData.media.file);
//   //     } else if (formData.media.iframe.trim()) {
//   //       // Append media URL if it exists
//   //       formDataToSend.append("media", formData.media.iframe.trim());
//   //     }
//   //     console.log("media", formData.media.filepath);

//   //     const access_token = localStorage.getItem("access_token");

//   //     const response = await axios.patch(
//   //       `http://localhost:8000/api/project/${id}`,
//   //       formDataToSend,
//   //       {
//   //         headers: {
//   //           "Content-Type": "multipart/form-data",
//   //           Authorization: `Bearer ${access_token}`,
//   //         },
//   //       }
//   //     );

//   //     console.log("Updated project", response.data.updatedProject);
//   //     navigate("/admin/project");
//   //   } catch (error) {
//   //     console.error("Error updating project:", error);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataToSend = new FormData();

//       // Append all form data
//       Object.keys(formData).forEach((key) => {
//         if (key === "media") {
//           if (formData.media.file) {
//             formDataToSend.append("media", formData.media.file);
//           } else if (formData.media.iframe.trim()) {
//             formDataToSend.append("media", formData.media.iframe.trim());
//           }
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       formDataToSend.append("service_name", selectedService);
//       formDataToSend.append("gallery_name", selectedGallery);
//       formDataToSend.append("isPublic", isPublic);

//       const access_token = localStorage.getItem("access_token");

//       const response = await axios.patch(
//         `http://localhost:8000/api/project/${id}`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${access_token}`,
//           },
//         }
//       );

//       console.log("Updated project", response.data.updatedProject);
//       navigate("/admin/project");
//     } catch (error) {
//       console.error("Error updating project:", error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="theme-form-header">
//         <h2>Edit Project</h2>
//       </div>
//       <div className="form-white-bg">
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Project Name</label>
//                 <input
//                   type="text"
//                   name="project_name"
//                   value={formData.project_name}
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
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Description</label>
//                 <input
//                   type="text"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Service</label>
//                 <select
//                   value={selectedService}
//                   onChange={(e) => {
//                     // setSelectedService(e.target.value);
//                     // fetchGalleryNames(e.target.value);

//                     //   setSelectedService(e.target.value);
//                     //   setFormData({ ...formData, service_name: e.target.value });
//                     //   fetchGalleryNames(e.target.value);
//                     // }}

//                     setSelectedService(e.target.value);
//                     setFormData((prevFormData) => ({
//                       ...prevFormData,
//                       service_name: e.target.value,
//                     }));
//                     fetchGalleryNames(e.target.value);
//                   }}
//                 >
//                   <option value="Games">Games</option>
//                   <option value="VFX">VFX</option>
//                 </select>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Gallery Name</label>
//                 <select
//                   value={selectedGallery}
//                   onChange={(e) => {
//                     //     setSelectedGallery(e.target.value);
//                     //     setFormData({
//                     //       ...formData,
//                     //       gallery_name: e.target.value,
//                     //     });
//                     //   }
//                     //   // setSelectedGallery(e.target.value)
//                     // }
//                     setSelectedGallery(e.target.value);
//                     setFormData((prevFormData) => ({
//                       ...prevFormData,
//                       gallery_name: e.target.value,
//                     }));
//                   }}
//                 >
//                   {galleryNames.map((name) => (
//                     <option key={name._id} value={name._id}>
//                       {name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={isPublic}
//                 onChange={(e) => setIsPublic(e.target.checked)}
//               />
//               Public
//             </label>
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Media</label>
//                 <input
//                   type="text"
//                   name="media"
//                   value={formData.media.iframe}
//                   placeholder="iFrame URL"
//                   onChange={handleChange}
//                 />
//                 <span> OR </span>
//                 <input type="file" name="media" onChange={handleChange} />

//                 {/* {formData.media && */}
//                 {/* formData.media.filepath( */}
//                 <img
//                   className="form-profile"
//                   src={`http://localhost:8000/${formData.media.filepath}`}
//                   alt={`${formData.media.filename}`}
//                 />
//                 {/* )} */}
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

// export default EditProject;

import React, { useState, useEffect } from "react";
import Layout from "../../../components/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [galleryNames, setGalleryNames] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedGallery, setSelectedGallery] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service_name: "",
    gallery_name: "",
    media: {
      file: null,
      iframe: "",
      filepath: "",
    },
    project_name: "",
    subtitle: "",
    description: "",
    isPublic: true,
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/project/${id}`
        );
        const projectData = response.data.project;

        setProject(projectData);
        setSelectedService(projectData.service_name);
        setSelectedGallery(projectData.gallery_name);

        setFormData({
          service_name: projectData.service_name,
          gallery_name: projectData.gallery_name,
          project_name: projectData.project_name,
          subtitle: projectData.subtitle,
          description: projectData.description,
          isPublic: projectData.isPublic,
          media: {
            file: null,
            iframe: projectData.media.iframe || "",
            filepath: projectData.media.filepath || "",
          },
        });

        fetchGalleryNames(projectData.service_name);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media") {
      if (files && files.length > 0) {
        setFormData({
          ...formData,
          media: {
            file: files[0],
            filename: files[0].name,
            filepath: URL.createObjectURL(files[0]),
            iframe: "",
          },
        });
      } else {
        setFormData({
          ...formData,
          media: {
            ...formData.media,
            iframe: value,
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

  const fetchGalleryNames = async (service_name) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/gallery_name/gallerynames?service_name=${service_name}`
      );

      setGalleryNames(response.data.galleryNames);
    } catch (error) {
      console.error("Error fetching gallery names:", error);
    }
  };

  useEffect(() => {
    fetchGalleryNames(selectedService);
  }, [selectedService]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append all form data
      formDataToSend.append("project_name", formData.project_name);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("service_name", selectedService);
      formDataToSend.append("gallery_name", selectedGallery);
      formDataToSend.append("isPublic", isPublic);

      if (formData.media.file) {
        formDataToSend.append("media", formData.media.file);
      } else if (formData.media.iframe.trim()) {
        formDataToSend.append("media", formData.media.iframe.trim());
      }

      const access_token = localStorage.getItem("access_token");

      const response = await axios.patch(
        `http://localhost:8000/api/project/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log("Updated project", response.data.updatedProject);
      navigate("/admin/project");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Project</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Project Name</label>
                <input
                  type="text"
                  name="project_name"
                  value={formData.project_name}
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
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      service_name: e.target.value,
                    }));
                    fetchGalleryNames(e.target.value);
                  }}
                >
                  <option value="GAMES">GAMES</option>
                  <option value="VFX">VFX</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Gallery Name</label>
                <select
                  value={selectedGallery}
                  onChange={(e) => {
                    setSelectedGallery(e.target.value);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      gallery_name: e.target.value,
                    }));
                  }}
                >
                  {galleryNames.map((name) => (
                    <option key={name._id} value={name._id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <label>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Public
            </label>
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

export default EditProject;
