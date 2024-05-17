import React, { useState, useEffect } from "react";
import Layout from "../../../components/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProject = () => {
  const { id } = useParams();
  // const [title, setTitle] = useState(null);
  // const [subtitle, setSubtitle] = useState(null);
  // const [description, setDescription] = useState(null);
  // const [metaTitle, setMetaTitle] = useState(null);
  // const [metaDescription, setMetaDescription] = useState(null);
  const [project, setProject] = useState(null);
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
    title: "",
    subtitle: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/project/${id}`
        );
        const projectData = response.data.project;
        setProject(projectData);
        setSelectedService(projectData.service);
        setSelectedGallery(projectData.gallery_name);
        // Set media state from projectData
        setMedia(projectData.media);

        // Set formData based on gallery media type
        // setFormData({
        //   ...formData,
        //   media: projectData.media.iframe
        //     ? { iframe: projectData.media.iframe, file: null }
        //     : { iframe: "", file: projectData.media.filename },
        // });

        setFormData({
          service: projectData.service,
          gallery_name: projectData.gallery_name,
          title: projectData.title,
          subtitle: projectData.subtitle,
          description: projectData.description,
          media: projectData.media,
          metaTitle: projectData.metaTitle,
          metaDescription: projectData.metaDescription,
        });
        // Fetch gallery names based on the selected service
        fetchGalleryNames(projectData.service);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // if (name === "media" && files && files.length > 0) {
    //   setFormData({
    //     ...formData,
    //     media: { iframe: "", file: files[0] },
    //   });
    // } else {
    //   setFormData({
    //     ...formData,
    //     media: { ...formData.media, [name]: value },
    //   });
    // }

    if (name === "media") {
      if (files && files.length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          media: { iframe: "", file: files[0] },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          media: { ...prevFormData.media, [name]: value },
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("media", formData.media);
      formDataToSend.append("metaTitle", formData.metaTitle);
      formDataToSend.append("metaDescription", formData.metaDescription);

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
        `http://localhost:8000/api/project/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Prpject updated:", response.data.updatedProject);
      setTimeout(() => {
        navigate("/project");
      }, 2000);
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
                <label>subtitle</label>
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
                <label>description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>metaTitle</label>
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
                <label>metaDescription</label>
                <input
                  type="text"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
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

export default EditProject;
