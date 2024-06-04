import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Layout from "../../../components/adminLayout";
import axios from "axios";
import "../../../style/index.css";
import "datatables.net";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";

const Team = () => {
  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: "team",
        });
        console.log(response.data.teams);
        // console.log(teams.image[0].filepath);
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleDelete = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");

      await axios({
        method: "DELETE",
        baseURL: "http://localhost:8000/api/",
        url: `team/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setTeams(teams.filter((team) => team._id !== id));
      setTimeout(() => {
        navigate("/admin/team");
      }, 2000);
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <Layout>
      <div className="pages-headers ">
        <h2>
          Team
          <NavLink to="/admin/add/team" className="theme-cta">
            <i className="las la-plus-circle"></i>
            Add Team Member
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
                    <th>Name</th>
                    <th>Designation</th>
                    {/* <th>LinkedIn URL</th> */}
                    <th className="text-center">Image</th>
                    <th className="text-center">Sequence</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {teams &&
                    teams.map((team) => (
                      <tr key={team._id}>
                        <td>{team.name}</td>
                        <td>{team.designation}</td>
                        {/* <td>{team.linkedin_url}</td> */}
                        <td className="table-profile-img text-center">
                          {team.image && team.image.length > 0 ? (
                            <img
                              src={`http://localhost:8000/${team.image[0].filepath}`}
                              alt={team.image[0].filename}
                              style={{ width: "50px", height: "50px" }}
                            />
                          ) : (
                            "No image"
                          )}
                        </td>
                        <td className="text-center">{team.sequence}</td>
                        <td className="text-center">
                          <Link
                            to={`/admin/edit/team/${team._id}`}
                            title="Edit"
                          >
                            <i className="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(team._id)}
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

export default Team;
