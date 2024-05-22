import React, { useEffect, useState } from "react";
import Layout from "../../../components/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProjectDetail = () => {
  const { id } = useParams();
  const [projectDetail, setProjectDetail] = useState(null);
  const [projectNames, setProjectNames] = useState([]);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [media, setMedia] = useState({ iframe: "", file: null, filepath: "" });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    project_name: "",
    media: "",
  });

  useEffect(() => {
    const fetchProjectNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/project/projectname"
        );
        setProjectNames(response.data.projectNames);
      } catch (error) {
        console.error("Error fetching project names:", error);
      }
    };

    const fetchProjectDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/project_detail/${id}`
        );
        const projectDetailData = response.data.projectDetail;

        setProjectDetail(projectDetailData);
        setSelectedProjectName(projectDetailData.project_name);
        setMedia(projectDetailData.media);

        setFormData({
          project_name: projectDetailData.project_name,
          media: projectDetailData.media.iframe
            ? { iframe: projectDetailData.media.iframe, file: null }
            : { iframe: "", file: projectDetailData.media.filename },
        });
      } catch (error) {
        console.error("Error fetching project detail:", error);
      }
    };

    fetchProjectNames();
    fetchProjectDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      if (files && files.length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          media: { iframe: "", file: files[0] },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          media: { iframe: value, file: null },
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("project_name", formData.project_name);

      if (formData.media.file) {
        formDataToSend.append("media", formData.media.file);
      } else if (formData.media.iframe) {
        formDataToSend.append("media", formData.media.iframe);
      }

      const access_token = localStorage.getItem("access_token");

      const response = await axios.patch(
        `http://localhost:8000/api/project_detail/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const updatedProjectDetail = response.data.updatedProjectDetail;
      setProjectDetail(updatedProjectDetail);
      setTimeout(() => {
        navigate("/admin/project_detail");
      }, 2000);
    } catch (error) {
      console.error("Error updating project detail:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit Project Detail</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Project Name</label>
                <select
                  value={selectedProjectName}
                  onChange={(e) => setSelectedProjectName(e.target.value)}
                >
                  {projectNames.map((name) => (
                    <option key={name._id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Media</label>
                <input
                  type="text"
                  name="media"
                  value={formData.media.iframe || ""}
                  placeholder="iFrame URL"
                  onChange={handleChange}
                />
                <span> OR </span>
                <input type="file" name="media" onChange={handleChange} />

                {media.filepath && (
                  <img
                    className="form-profile"
                    src={`http://localhost:8000/${media.filepath}`}
                    alt={`${media.filename}`}
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

export default EditProjectDetail;
