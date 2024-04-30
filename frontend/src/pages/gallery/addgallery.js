// import React, { useState, useEffect } from "react";
// import Layout from "../../components/layout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddGallery = () => {
//   const [name, setName] = useState("");
//   const [service, setService] = useState("");
//   const [selectedService, setSelectedService] = useState("");
//   const [selectedGallery, setSelectedGallery] = useState("");
//   const [galleryNames, setGalleryNames] = useState([]);
//   const [media, setMedia] = useState({ iframe: "", file: null });
//   const [isPublic, setIsPublic] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllGalleryNames = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/api/gallery_name"
//         );
//         setGalleryNames(
//           response.data.galleryNames.map((gallery) => gallery.gallery_name)
//         );
//       } catch (error) {
//         console.error("Error fetching all gallery names:", error);
//       }
//     };

//     fetchAllGalleryNames();
//   }, []);

//   useEffect(() => {
//     const fetchGalleryNames = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/gallery_name?service=${selectedService}`
//         );
//         setGalleryNames(
//           response.data.galleryNames.map((gallery) => gallery.gallery_name)
//         );
//       } catch (error) {
//         console.error("Error fetching gallery names:", error);
//       }
//     };

//     fetchGalleryNames();
//   }, [selectedService]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("service", service);

//       if (media.iframe && media.file) {
//         throw new Error(
//           "Please provide either an iFrame URL or an image, not both."
//         );
//       }

//       if (media.iframe) {
//         formData.append("media", media.iframe);
//       } else if (media.file) {
//         formData.append("media", media.file);
//       }

//       const response = await axios.post(
//         "http://localhost:8000/api/gallery",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log(response.data.newGallery);
//       setTimeout(() => {
//         navigate("/gallery");
//       }, 2000);
//     } catch (error) {
//       console.error("Error creating gallery:", error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="theme-form-header">
//         <h2>Add Gallery</h2>
//       </div>
//       <div className="form-white-bg">
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Service</label>
//                 <select
//                   value={selectedService}
//                   onChange={(e) => setSelectedService(e.target.value)}
//                 >
//                   <option value="">Select a service</option>
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
//                   onChange={(e) => setSelectedGallery(e.target.value)}
//                 >
//                   <option value="">Select a Gallery</option>
//                   {galleryNames.map((name) => (
//                     <option key={name} value={name}>
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
//                   value={media.iframe}
//                   placeholder="iFrame URL"
//                   onChange={(e) =>
//                     setMedia({
//                       ...media,
//                       iframe: e.target.value,
//                       file: "",
//                     })
//                   }
//                 />
//                 <span> OR </span>
//                 <input
//                   type="file"
//                   name="media"
//                   onChange={(e) =>
//                     setMedia({
//                       ...media,
//                       file: e.target.files[0],
//                       iframe: "",
//                     })
//                   }
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

// export default AddGallery;

// import React, { useState, useEffect } from "react";
// import Layout from "../../components/layout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddGallery = () => {
//   const [name, setName] = useState("");
//   const [service, setService] = useState("");
//   const [selectedService, setSelectedService] = useState("");
//   const [selectedGallery, setSelectedGallery] = useState("");
//   const [galleryNames, setGalleryNames] = useState([]);
//   const [media, setMedia] = useState({ iframe: "", file: null });
//   const [isPublic, setIsPublic] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGalleryNames = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/gallery/gallery_names?service_name=${selectedService}`
//         );
//         setGalleryNames(
//           response.data.galleryNames.map((gallery) => gallery.gallery_name)
//         );
//       } catch (error) {
//         console.error("Error fetching gallery names:", error);
//       }
//     };

//     fetchGalleryNames(); // Call fetchGalleryNames here
//   }, [selectedService]);

//   // Inside the useEffect hook for fetching gallery names based on selected service

//   // Trigger the fetchGalleryNames function whenever selectedService changes
//   // useEffect(() => {
//   //   fetchGalleryNames();
//   // }, [selectedService]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("service", service);

//       if (media.iframe && media.file) {
//         throw new Error(
//           "Please provide either an iFrame URL or an image, not both."
//         );
//       }

//       if (media.iframe) {
//         formData.append("media", media.iframe);
//       } else if (media.file) {
//         formData.append("media", media.file);
//       }

//       const response = await axios.post(
//         "http://localhost:8000/api/gallery",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log(response.data.newGallery);
//       setTimeout(() => {
//         navigate("/gallery");
//       }, 2000);
//     } catch (error) {
//       console.error("Error creating gallery:", error);
//     }
//   };

//   return (
//     <Layout>
//       <div className="theme-form-header">
//         <h2>Add Gallery</h2>
//       </div>
//       <div className="form-white-bg">
//         <form onSubmit={handleSubmit}>
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Service</label>
//                 <select
//                   value={selectedService}
//                   onChange={(e) => setSelectedService(e.target.value)}
//                 >
//                   <option value="">Select a service</option>
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
//                   onChange={(e) => setSelectedGallery(e.target.value)}
//                 >
//                   <option value="">Select a Gallery</option>
//                   {galleryNames.map((name) => (
//                     <option key={name} value={name}>
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
//                   value={media.iframe}
//                   placeholder="iFrame URL"
//                   onChange={(e) =>
//                     setMedia({
//                       ...media,
//                       iframe: e.target.value,
//                       file: "",
//                     })
//                   }
//                 />
//                 <span> OR </span>
//                 <input
//                   type="file"
//                   name="media"
//                   onChange={(e) =>
//                     setMedia({
//                       ...media,
//                       file: e.target.files[0],
//                       iframe: "",
//                     })
//                   }
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

// export default AddGallery;

import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddGallery = () => {
  const [gallery_name, setGalleryName] = useState("");
  const [service, setService] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedGallery, setSelectedGallery] = useState("");
  const [galleryNames, setGalleryNames] = useState([]);
  const [media, setMedia] = useState({ iframe: "", file: null });
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const fetchGalleryNames = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/gallery/gallery_names?service_name=${selectedService}`
      );

      console.log("Gallery names response:", response);
      console.log("Gallery names:", galleryNames);

      // setGalleryNames(
      //   response.data.galleryNames.map((gallery) => gallery.name)
      // );
      setGalleryNames(response.data.galleryNames);
    } catch (error) {
      console.error("Error fetching gallery names:", error);
    }
  };

  useEffect(() => {
    fetchGalleryNames();
  }, [selectedService]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set the service value before making the POST request
      setService(selectedService);
      // Set isPublic to false if the checkbox is unchecked
      if (!isPublic) {
        setIsPublic(false);
      }
      const formData = new FormData();
      formData.append("gallery_name", selectedGallery);
      formData.append("service", selectedService);
      formData.append("isPublic", isPublic); // Include isPublic in the form data

      if (media.iframe && media.file) {
        throw new Error(
          "Please provide either an iFrame URL or an image, not both."
        );
      }

      if (media.iframe) {
        formData.append("media", media.iframe);
      } else if (media.file) {
        formData.append("media", media.file);
      }

      const response = await axios.post(
        "http://localhost:8000/api/gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.newGallery);
      setTimeout(() => {
        navigate("/gallery");
      }, 2000);
    } catch (error) {
      console.error("Error creating gallery:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Gallery</h2>
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
                    fetchGalleryNames();
                  }}
                >
                  <option value="">Select a service</option>
                  <option value="Games">Games</option>
                  <option value="VFX">VFX</option>
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Gallery Name</label>
                <select
                  value={selectedGallery}
                  onChange={(e) => setSelectedGallery(e.target.value)}
                >
                  <option value="">Select a Gallery</option>
                  {galleryNames.map(
                    (gallery_name) => (
                      console.log("names", gallery_name),
                      (
                        <option key={gallery_name._id} value={gallery_name}>
                          {gallery_name}
                        </option>
                      )
                    )
                  )}
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
                  value={media.iframe}
                  placeholder="iFrame URL"
                  onChange={(e) =>
                    setMedia({
                      ...media,
                      iframe: e.target.value,
                      file: null,
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
                      iframe: "",
                    })
                  }
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

export default AddGallery;
