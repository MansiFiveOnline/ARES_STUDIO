// // import React, { useState, useEffect } from "react";
// // import Layout from "../../../components/adminLayout";
// // import { useNavigate, useParams } from "react-router-dom";
// // import axios from "axios";

// // const EditGallery = () => {
// //   const { id } = useParams();
// //   const [gallery, setGallery] = useState(null);
// //   const [galleryNames, setGalleryNames] = useState([]);
// //   const [selectedService, setSelectedService] = useState("");
// //   const [selectedGallery, setSelectedGallery] = useState("");
// //   // const [media, setMedia] = useState({ iframe: "", file: null });
// //   const [isPublic, setIsPublic] = useState(true);
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     service_name: "",
// //     gallery_name: "",
// //     media: {
// //       file: null,
// //       iframe: "",
// //       filepath: "",
// //     },
// //     isPublic: true,
// //   });

// //   useEffect(() => {
// //     const fetchGallery = async () => {
// //       try {
// //         const response = await axios({
// //           method: "GET",
// //           baseURL: "http://localhost:8000/api/",
// //           url: `gallery/${id}`,
// //         });
// //         const galleryData = response.data.gallery;
// //         setGallery(galleryData);
// //         setSelectedService(galleryData.service_name);
// //         setSelectedGallery(galleryData.gallery_name);

// //         // Set media state from galleryData
// //         // setMedia(galleryData.media);

// //         // Set formData based on gallery media type
// //         setFormData({
// //           service_name: galleryData.service_name,
// //           gallery_name: galleryData.gallery_name,
// //           media: {
// //             file: null,
// //             iframe: galleryData.media.iframe || "",
// //             filepath: galleryData.media.filepath || "",
// //           },
// //           isPublic: galleryData.isPublic,
// //         });

// //         // Fetch gallery names based on the selected service
// //         fetchGalleryNames(galleryData.service_name);
// //       } catch (error) {
// //         console.error("Error fetching gallery:", error);
// //       }
// //     };

// //     fetchGallery();
// //   }, [id]);

// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (name === "media") {
// //       if (files && files.length > 0) {
// //         setFormData({
// //           ...formData,
// //           media: {
// //             file: files[0],
// //             filename: files[0].name,
// //             filepath: URL.createObjectURL(files[0]),
// //             iframe: "",
// //           },
// //         });
// //       } else {
// //         setFormData({
// //           ...formData,
// //           media: {
// //             ...formData.media,
// //             iframe: value,
// //           },
// //         });
// //       }
// //     } else {
// //       setFormData({
// //         ...formData,
// //         [name]: value,
// //       });
// //     }
// //   };

// //   const fetchGalleryNames = async (service_name) => {
// //     try {
// //       // const response = await axios({
// //       //   method: "GET",
// //       //   baseURL: "http://localhost:8000/api/",
// //       //   url: `gallery_name/gallerynames?service_name=${selectedService}`,
// //       // });

// //       const response = await axios.get(
// //         `http://localhost:8000/api/gallery_name/gallerynames?service_name=${service_name}`
// //       );

// //       setGalleryNames(response.data.galleryNames);
// //     } catch (error) {
// //       console.error("Error fetching gallery names:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchGalleryNames(selectedService);
// //   }, [selectedService]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const formDataToSend = new FormData();

// //       // if (formData.service_name)
// //       formDataToSend.append("service_name", selectedService);

// //       // if (formData.gallery_name)
// //       formDataToSend.append("gallery_name", selectedGallery);
// //       formDataToSend.append("isPublic", isPublic);

// //       if (formData.media.file) {
// //         formDataToSend.append("media", formData.media.file);
// //       } else if (formData.media.iframe.trim()) {
// //         formDataToSend.append("media", formData.media.iframe.trim());
// //       }

// //       const access_token = localStorage.getItem("access_token");

// //       const response = await axios({
// //         method: "PATCH",
// //         baseURL: "http://localhost:8000/api/",
// //         url: `gallery/${id}`,
// //         formDataToSend, // Pass form data directly
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //           Authorization: `Bearer ${access_token}`,
// //         },
// //       });
// //       // setGallery(response.data.updatedGallery);
// //       console.log("Gallery updated:", response.data.updatedGallery);
// //       setTimeout(() => {
// //         navigate("/admin/gallery");
// //       }, 2000);
// //     } catch (error) {
// //       console.error("Error updating gallery:", error);
// //     }
// //   };

// //   return (
// //     <Layout>
// //       <div className="theme-form-header">
// //         <h2>Edit Service Gallery</h2>
// //       </div>
// //       <div className="form-white-bg">
// //         <form onSubmit={handleSubmit}>
// //           <div className="row">
// //             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
// //               <div className="theme-form">
// //                 <label>Service</label>
// //                 <select
// //                   value={selectedService}
// //                   onChange={(e) => {
// //                     // setSelectedService(e.target.value);
// //                     // fetchGalleryNames(e.target.value);
// //                     setSelectedService(e.target.value);
// //                     setFormData((prevFormData) => ({
// //                       ...prevFormData,
// //                       service_name: e.target.value,
// //                     }));
// //                     fetchGalleryNames(e.target.value);
// //                   }}
// //                 >
// //                   <option value="Games">Games</option>
// //                   <option value="VFX">VFX</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
// //               <div className="theme-form">
// //                 <label>Gallery Name</label>
// //                 <select
// //                   value={selectedGallery}
// //                   onChange={(e) =>
// //                     // setSelectedGallery(e.target.value)
// //                     {
// //                       setSelectedGallery(e.target.value);
// //                       setFormData((prevFormData) => ({
// //                         ...prevFormData,
// //                         gallery_name: e.target.value,
// //                       }));
// //                     }
// //                   }
// //                 >
// //                   {galleryNames.map((name) => (
// //                     <option key={name._id} value={name._id}>
// //                       {name}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 {/* <div>{gallery && gallery.gallery_name}</div> */}
// //               </div>
// //             </div>

// //             <label>
// //               <input
// //                 type="checkbox"
// //                 checked={isPublic}
// //                 onChange={(e) => setIsPublic(e.target.checked)}
// //               />
// //               Public
// //             </label>
// //             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
// //               <div className="theme-form">
// //                 <label>Media</label>
// //                 <input
// //                   type="text"
// //                   name="media"
// //                   value={formData.media.iframe || ""}
// //                   placeholder="iFrame URL"
// //                   onChange={handleChange}
// //                 />
// //                 <span> OR </span>
// //                 <input type="file" name="media" onChange={handleChange} />

// //                 {formData.media.filepath && (
// //                   <img
// //                     className="form-profile"
// //                     src={`http://localhost:8000/${formData.media.filepath}`}
// //                     alt={`${formData.media.filename}`}
// //                   />
// //                 )}
// //               </div>
// //             </div>

// //             <div className="col-12">
// //               <div className="theme-form">
// //                 <button type="submit">Save</button>
// //               </div>
// //             </div>
// //           </div>
// //         </form>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default EditGallery;

// import React, { useState, useEffect } from "react";
// import Layout from "../../../components/adminLayout";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const EditGallery = () => {
//   const { id } = useParams();
//   const [gallery, setGallery] = useState(null);
//   const [galleryNames, setGalleryNames] = useState([]);
//   const [selectedService, setSelectedService] = useState("");
//   const [selectedGallery, setSelectedGallery] = useState("");
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
//     isPublic: true,
//   });

//   useEffect(() => {
//     const fetchGallery = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/gallery/${id}`
//         );
//         const galleryData = response.data.gallery;

//         setGallery(galleryData);
//         setSelectedService(galleryData.service_name);
//         setSelectedGallery(galleryData.gallery_name);

//         setFormData({
//           service_name: galleryData.service_name,
//           gallery_name: galleryData.gallery_name,
//           media: {
//             file: null,
//             iframe: galleryData.media.iframe || "",
//             filepath: galleryData.media.filepath || "",
//           },
//           isPublic: galleryData.isPublic,
//         });

//         fetchGalleryNames(galleryData.service_name);
//       } catch (error) {
//         console.error("Error fetching gallery:", error);
//       }
//     };

//     fetchGallery();
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
//       const response = await axios.get(
//         `http://localhost:8000/api/gallery_name/gallerynames?service_name=${service_name}`
//       );

//       setGalleryNames(response.data.galleryNames);
//     } catch (error) {
//       console.error("Error fetching gallery names:", error);
//     }
//   };

//   useEffect(() => {
//     fetchGalleryNames(selectedService);
//   }, [selectedService]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataToSend = new FormData();

//       formDataToSend.append("service_name", selectedService);
//       formDataToSend.append("gallery_name", selectedGallery);
//       formDataToSend.append("isPublic", isPublic);

//       if (formData.media.file) {
//         formDataToSend.append("media", formData.media.file);
//       } else if (formData.media.iframe.trim()) {
//         formDataToSend.append("media", formData.media.iframe.trim());
//       }

//       const access_token = localStorage.getItem("access_token");

//       const response = await axios.patch(
//         `http://localhost:8000/api/gallery/${id}`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${access_token}`,
//           },
//         }
//       );

//       console.log("Gallery updated:", response.data.updatedGallery);
//       navigate("/admin/gallery");
//     } catch (error) {
//       console.error("Error updating gallery:", error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="theme-form-header">
//         <h2>Edit Service Gallery</h2>
//       </div>
//       <div className="form-white-bg">
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Service</label>
//                 <select
//                   value={selectedService}
//                   onChange={(e) => {
//                     setSelectedService(e.target.value);
//                     setFormData((prevFormData) => ({
//                       ...prevFormData,
//                       service_name: e.target.value,
//                     }));
//                     fetchGalleryNames(e.target.value);
//                   }}
//                 >
//                   <option value="GAMES">GAMES</option>
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

//             <div className="py-3">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={isPublic} // Controlled by isPublic state
//                   onChange={(e) => setIsPublic(e.target.checked)} // Update isPublic state directly
//                 />
//                 Public
//               </label>
//             </div>

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

//                 {formData.media.filepath && (
//                   <img
//                     className="form-profile"
//                     src={`http://localhost:8000/${formData.media.filepath}`}
//                     alt={`${formData.media.filename}`}
//                   />
//                 )}
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

// export default EditGallery;

import React, { useState, useEffect } from "react";
import Layout from "../../../components/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditGallery = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
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
    isPublic: true,
  });

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/gallery/${id}`
        );
        const galleryData = response.data.gallery;

        setGallery(galleryData);
        setSelectedService(galleryData.service_name);
        setSelectedGallery(galleryData.gallery_name);

        setFormData({
          service_name: galleryData.service_name,
          gallery_name: galleryData.gallery_name,
          media: {
            file: null,
            iframe: galleryData.media.iframe || "",
            filepath: galleryData.media.filepath || "",
          },
          isPublic: galleryData.isPublic,
        });

        fetchGalleryNames(galleryData.service_name);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    fetchGallery();
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
        `http://localhost:8000/api/gallery/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log("Gallery updated:", response.data.updatedGallery);
      navigate("/admin/gallery");
    } catch (error) {
      console.error("Error updating gallery:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Service Gallery</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    setSelectedGallery(""); // Reset gallery name when service changes
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      service_name: e.target.value,
                    }));
                    fetchGalleryNames(e.target.value);
                  }}
                >
                  <option value="">Select Service</option>
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
                  <option value="">Select Gallery Name</option>
                  {galleryNames.map((name) => (
                    <option key={name._id} value={name._id}>
                      {name.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="py-3">
              <label>
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                Public
              </label>
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

export default EditGallery;
