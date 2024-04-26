// import React, { useState, useEffect } from "react";
// import Layout from "../../components/layout";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const EditGallery = () => {
//   const { id } = useParams();
//   const [name, setName] = useState("");
//   const [service, setService] = useState("");
//   const [selectedService, setSelectedService] = useState("Games"); // Define selectedService state
//   const [selectedGallery, setSelectedGallery] = useState(""); // Define selectedGallery state
//   const [galleryNames, setGalleryNames] = useState([]); // Initialize galleryNames state as an empty array
//   const [media, setMedia] = useState({ iframe: "", file: null });
//   const [isPublic, setIsPublic] = useState(true); // Define isPublic state and set default value to true
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     url: "",
//     title: "",
//     subtitle: "",
//     description: "",
//     media: "",
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
//     const { name, value, files } = e.target;
//     if (name === "media" && files && files.length > 0) {
//       setFormData({
//         ...formData,
//         media: files[0], // Set the media field to the selected file
//       });
//     }
//     // If the value is an object, it means it's already an uploaded file
//     if (typeof value === "object") {
//       setFormData({
//         ...formData,
//         media: {
//           ...formData.media,
//           filename: value.name,
//           filepath: URL.createObjectURL(value), // Set path to a local URL
//         },
//       });
//     } else {
//       // Otherwise, it's a URL input or other input change
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
//         <h2>Edit Gallery</h2>
//       </div>
//       <div className="form-white-bg">
//         <form>
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-sm-12 col-12">
//               <div className="theme-form">
//                 <label>Service</label>
//                 <select
//                   value={selectedService}
//                   onChange={(e) => setSelectedService(e.target.value)}
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
//                   onChange={(e) => setSelectedGallery(e.target.value)}
//                 >
//                   {galleryNames.map((name) => (
//                     <option key={name} value={name}>
//                       {name}
//                     </option>
//                   ))}
//                 </select>
//                 {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
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
//                       // filename: e.target.files[0],
//                       // filepath: e.target.files[0],
//                       iframe: "",
//                     })
//                   }
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

// export default EditGallery;

import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditGallery = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [selectedService, setSelectedService] = useState(""); // Remove default value
  const [selectedGallery, setSelectedGallery] = useState(""); // Define selectedGallery state
  const [galleryNames, setGalleryNames] = useState([]); // Initialize galleryNames state as an empty array
  const [media, setMedia] = useState({ iframe: "", file: null });
  const [isPublic, setIsPublic] = useState(true); // Define isPublic state and set default value to true
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/gallery/${id}`
        );
        const { name, service, media, isPublic, galleryName } =
          response.data.gallery;
        setName(name);
        setService(service);
        setSelectedService(service); // Set selected service
        setSelectedGallery(response.data.gallery.galleryName);
        setMedia(media);
        setIsPublic(isPublic);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    fetchGallery();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("service", service);

      // Check if both media fields are provided
      if (media.iframe && media.file) {
        throw new Error(
          "Please provide either an iFrame URL or an image, not both."
        );
      }

      // Append media based on the provided type
      if (media.iframe) {
        formData.append("media", media.iframe);
      } else if (media.file) {
        formData.append("media", media.file);
      }

      const response = await axios.patch(
        `http://localhost:8000/api/gallery/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.updatedGallery);
      setTimeout(() => {
        navigate("/gallery");
      }, 2000);
    } catch (error) {
      console.error("Error updating gallery:", error);
    }
  };

  useEffect(() => {
    const fetchGalleryNames = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/gallery/galleries?service=${selectedService}`
        );
        setGalleryNames(response.data.galleries.map((gallery) => gallery.name));
      } catch (error) {
        console.error("Error fetching gallery names:", error);
      }
    };

    fetchGalleryNames();
  }, [selectedService]);

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Gallery</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Service</label>
                <select
                  value={selectedService} // Use selectedService as the value
                  onChange={(e) => setSelectedService(e.target.value)}
                >
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
                  {galleryNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
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
                  value={media.iframe || ""}
                  placeholder="iFrame URL"
                  onChange={(e) =>
                    setMedia({
                      ...media,
                      iframe: e.target.value,
                      file: "",
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

export default EditGallery;
