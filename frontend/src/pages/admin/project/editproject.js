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
    media: { iframe: "", file: null },
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
        setSelectedService(projectData.service_name);
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
        fetchGalleryNames(projectData.service_name);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media" && files && files.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        media: { iframe: "", file: files[0] },
      }));
    } else if (name === "media" && !files) {
      // Handle changes to the media URL input
      setFormData((prevFormData) => ({
        ...prevFormData,
        media: { ...prevFormData.media, iframe: value },
      }));
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
      const formDataToSend = {
        service_name: selectedService,
        gallery_name: selectedGallery,
        project_name: formData.project_name,
        subtitle: formData.subtitle,
        description: formData.description,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
      };

      // Append media if available
      if (formData.media) {
        // Check if both media fields are provided
        if (formData.media.iframe && formData.media.file) {
          throw new Error(
            "Please provide either an iFrame URL or an image, not both."
          );
        }

        // Append media based on the provided type
        if (formData.media.iframe) {
          formDataToSend.media = { iframe: formData.media.iframe };
        } else if (formData.media.file) {
          formDataToSend.media = { file: formData.media.file };
        }
      }

      const access_token = localStorage.getItem("access_token");

      const response = await axios.patch(
        `http://localhost:8000/api/project/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log("Project updated:", response.data.updatedProject);
      const updatedProject = response.data.updatedProject;

      // Update state with updated project
      setProject(updatedProject);

      // Redirect after successful update
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
                onChange={(e) => setIsPublic(e.target.checked ? true : false)}
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
