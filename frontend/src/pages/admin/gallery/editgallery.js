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
  const [media, setMedia] = useState({ iframe: "", file: null });
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    service: "",
    gallery_name: "",
    media: "",
  });

  // useEffect(() => {
  //   const fetchGallery = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8000/api/gallery/${id}`
  //       );
  //       const galleryData = response.data.gallery;
  //       console.log(galleryData);
  //       setGallery(galleryData);
  //       setSelectedService(galleryData.service);
  //       setSelectedGallery(galleryData.gallery_name);

  //       // Set media state from galleryData
  //       setMedia(galleryData.media);

  //       // Set formData based on gallery media type
  //       setFormData({
  //         ...formData,
  //         media: galleryData.media.iframe
  //           ? { iframe: galleryData.media.iframe, file: null }
  //           : { iframe: "", file: galleryData.media.filename },
  //       });

  //       // Fetch gallery names based on the selected service
  //       fetchGalleryNames(galleryData.service);
  //     } catch (error) {
  //       console.error("Error fetching gallery:", error);
  //     }
  //   };

  //   fetchGallery();
  // }, [id]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/gallery/${id}`
        );
        const galleryData = response.data.gallery;
        setGallery(galleryData);
        setSelectedService(galleryData.service);
        setSelectedGallery(galleryData.gallery_name);

        // Set media state from galleryData
        setMedia(galleryData.media);

        // Set formData based on gallery media type
        setFormData({
          ...formData,
          media: galleryData.media.iframe
            ? { iframe: galleryData.media.iframe, file: null }
            : { iframe: "", file: galleryData.media.filename },
        });

        // Fetch gallery names based on the selected service
        fetchGalleryNames(galleryData.service);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    fetchGallery();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media" && files && files.length > 0) {
      setFormData({
        ...formData,
        media: { iframe: "", file: files[0] },
      });
    } else {
      setFormData({
        ...formData,
        media: { ...formData.media, [name]: value },
      });
    }
  };

  const fetchGalleryNames = async (service) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/gallery/gallery_names?service_name=${service}`
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
      formDataToSend.append("gallery_name", selectedGallery);
      formDataToSend.append("service", selectedService);

      // Check if both media fields are provided
      if (media.iframe && media.file) {
        throw new Error(
          "Please provide either an iFrame URL or an image, not both."
        );
      }

      // Append media based on the provided type
      if (media.iframe) {
        formDataToSend.append("media", media.iframe);
      } else if (media.file) {
        formDataToSend.append("media", media.file);
      }

      const response = await axios.patch(
        `http://localhost:8000/api/gallery/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Gallery updated:", response.data.updatedGallery);
      setTimeout(() => {
        navigate("/gallery");
      }, 2000);
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
                    fetchGalleryNames(e.target.value);
                  }}
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
                    <option key={name._id} value={name}>
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

                <img
                  className="form-profile"
                  src={`http://localhost:8000/${media.filepath}`}
                  alt={`${media.filename}`}
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
