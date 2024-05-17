import React, { useEffect, useState, useRef } from "react";
import Layout from "../../../components/adminLayout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Project = () => {
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const tableRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: "project",
        });
        console.log(response.data.projects);
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`http://localhost:8000/api/user/${id}`);
      const response = await axios({
        method: "DELETE",
        baseURL: "http://localhost:8000/api/",
        url: `project/${id}`,
      });
      setProjects(null); // Update user state to null after deletion
      setTimeout(() => {
        navigate("/project");
      }, 2000);
      console.log(response.data);
      setProjects(projects.filter((project) => project._id !== id));
      setTimeout(() => {
        navigate("/project");
      }, 3000);
    } catch (error) {
      console.error("Error deleting Project:", error);
    }
  };
  return (
    <Layout>
      <div className="pages-headers ">
        <h2>
          Project
          <NavLink to="/add/project" className="theme-cta">
            <i class="las la-plus-circle"></i>
            Add Project
          </NavLink>
        </h2>
      </div>
      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              <table id="example" className="table nowrap">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th className="text-center">Subtitle</th>
                    <th className="text-center">Descripiton</th>
                    <th className="text-center">Service</th>
                    <th className="text-center">Gallery Name</th>
                    <th className="text-center">Meta Title</th>
                    <th className="text-center">Meta Descripiton</th>
                    <th className="text-center">Media</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {projects &&
                    projects.map((project) => (
                      <tr key={project._id}>
                        <td>{project.title}</td>
                        <td className="text-center">{project.subtitle}</td>
                        <td className="text-center">{project.description}</td>
                        <td className="text-center">{project.service}</td>
                        <td className="text-center">{project.gallery_name}</td>
                        <td className="text-center">{project.metaTitle}</td>
                        <td className="text-center">
                          {project.metaDescription}
                        </td>
                        <td className="table-profile-img text-center">
                          {project.type === "image" ? (
                            <img
                              src={`http://localhost:8000/${project.media.filepath}`} // Assuming filepath contains the path to the image
                              alt={`${project.media.filename}`}
                              style={{ width: "50px", height: "50px" }}
                            />
                          ) : (
                            <span>{project.media.iframe}</span>
                          )}
                        </td>
                        <td className="text-center">
                          <Link
                            to={`/edit/project/${project._id}`}
                            title="Edit"
                          >
                            <i class="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(project._id)}
                          >
                            <i class="las la-trash"></i>{" "}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
