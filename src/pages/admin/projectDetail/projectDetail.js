import React, { useEffect, useState } from "react";
import Layout from "../../../components/adminLayout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectDetail = () => {
  const [projectDetails, setProjectDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: "project_detail",
        });
        setProjectDetails(response.data.projectDetails);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");

      await axios({
        method: "DELETE",
        baseURL: "http://localhost:8000/api/",
        url: `project_detail/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setProjectDetails(
        projectDetails.filter((projectDetail) => projectDetail._id !== id)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <Layout>
      <div className="pages-headers">
        <h2>
          Project
          <NavLink to="/admin/add/project_detail" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Project Detail
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
                    <th>Project Name</th>
                    <th className="text-center">Media</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {projectDetails.map((projectDetail) => (
                    <tr key={projectDetail._id}>
                      <td>{projectDetail.project_name}</td>
                      <td className="text-center">
                        {projectDetail.media.map((mediaItem, index) => (
                          <div key={index}>
                            {mediaItem.type === "image" ? (
                              <img
                                src={`http://localhost:8000/${mediaItem.filepath}`}
                                alt={mediaItem.filename}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  margin: "5px",
                                }}
                              />
                            ) : (
                              //   <iframe
                              //     src={mediaItem.iframe}
                              //     title={`iframe-${index}`}
                              //     style={{
                              //       width: "200px",
                              //       height: "100px",
                              //       margin: "5px",
                              //     }}
                              //   ></iframe>
                              <span>{mediaItem.iframe}</span>
                            )}
                          </div>
                        ))}
                      </td>
                      <td className="text-center">
                        <Link
                          to={`/admin/edit/project_detail/${projectDetail._id}`}
                          title="Edit"
                        >
                          <i className="las la-pencil-alt"></i>
                        </Link>
                      </td>
                      <td className="text-center">
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(projectDetail._id)}
                        >
                          <i className="las la-trash"></i>
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

export default ProjectDetail;
