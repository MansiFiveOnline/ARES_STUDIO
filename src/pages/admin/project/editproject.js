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
    service_name: "",
    gallery_name: "",
    media: "",
    project_name: "",
    subtitle: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: `project/${id}`,
        });

        const projectData = response.data.project;
        setProject(projectData);
        setSelectedService(projectData.service);
        setSelectedGallery(projectData.gallery_name);
        // Set media state from projectData
        setMedia(projectData.media);

        setFormData({
          service_name: projectData.service_name,
          gallery_name: projectData.gallery_name,
          project_name: projectData.project_name,
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

  const fetchGalleryNames = async (service_name) => {
    try {
      const response = await axios({
        method: "GET",
        baseURL: "http://localhost:8000/api/",
        url: `gallery_name/gallerynames?service_name=${selectedService}`,
      });

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
      formDataToSend.append("service_name", selectedService);
      formDataToSend.append("project_name", formData.project_name);
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

      const access_token = localStorage.getItem("access_token");

      const response = await axios({
        method: "PATCH",
        baseURL: "http://localhost:8000/api/",
        url: `project/${id}`,
        formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("Prpject updated:", response.data.updatedProject);
      setTimeout(() => {
        navigate("/admin/project");
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
