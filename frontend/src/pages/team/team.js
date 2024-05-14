import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import axios from "axios";
import "../../style/index.css";
import $ from "jquery";
import "datatables.net";
import "datatables.net-bs4/css/dataTables.bootstrap4.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Team = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const tableRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await axios.get("/api/user/allUsers");
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: "user",
        });
        console.log(response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`http://localhost:8000/api/user/${id}`);
      const response = await axios({
        method: "DELETE",
        baseURL: "http://localhost:8000/api/",
        url: `user/${id}`,
      });
      setUsers(null); // Update user state to null after deletion
      setTimeout(() => {
        navigate("/team");
      }, 2000);
      console.log(response.data);
      setUsers(users.filter((user) => user._id !== id));
      setTimeout(() => {
        navigate("/team");
      }, 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // useEffect(() => {
  // Initialize DataTable when the component mounts
  // $(tableRef.current).DataTable({
  //   paging: true, // Enable pagination
  //   pageLength: 2, // Number of records per page
  // });

  // // Destroy DataTable when the component unmounts
  // return () => {
  //   $('.data-table-wrapper')
  //     .find('table')
  //     .DataTable()
  //     .destroy(true);
  // };
  //   if (tableRef.current && !$.fn.DataTable.isDataTable(tableRef.current)) {
  //     $(tableRef.current).DataTable({
  //       paging: true, // Enable pagination
  //       pageLength: 2, // Number of records per page
  //     });
  //   }
  // }, [users]);
  return (
    <Layout>
      <div className="pages-headers ">
        <h2>
          Team
          <NavLink to="/add/team" className="theme-cta">
            <i class="las la-plus-circle"></i>
            Add Team Member
          </NavLink>
        </h2>
      </div>
      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              {/* <DataTable
                value={users}
                paginator
                sortMode="multiple"
                rows={1}
                rowsPerPageOptions={[5, 10, 25, 50]}
              >
                <Column
                  field="name"
                  header="Name"
                  sortable
                  style={{ width: "25%" }}
                ></Column>
                <Column
                  field="designation"
                  header="Designation"
                  sortable
                  style={{ width: "25%" }}
                ></Column>
                <Column
                  field="linkedin_url"
                  header="LinkedIn URL"
                  sortable
                  style={{ width: "25%" }}
                ></Column>
                <Column
                  field="users.imageUrl"
                  header="Image"
                  sortable
                  style={{ width: "25%" }}
                >
                  {" "}
                  <img
                    src=""
                    alt="new"
                    style={{ width: "50px", height: "50px" }}
                    header="Image"
                  />
                </Column> */}

              <table id="example" className="table nowrap">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>LinkedIn URL</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Sequence</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.designation}</td>
                        <td>{user.linkedin_url}</td>
                        <td className="table-profile-img text-center">
                          <img
                            src={user.image[0].filepath}
                            alt={user.image[0].filename}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td className="text-center">{user.sequence}</td>
                        <td className="text-center">
                          {/* <button title="Edit" onClick={() => navigate(`/edit/team/${user._id}`)}>
                          <CreateIcon />
                        </button>  */}
                          <Link to={`/edit/team/${user._id}`} title="Edit">
                            <i class="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(user._id)}
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
{
  /* <h1>Team Members</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>LinkedIn URL</th>
            <th>Image</th>
            <th>Sequence</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.designation}</td>
              <td>{user.linkedin_url}</td>
              <td>
                <img src={user.imageUrl} alt={user.name} style={{ width: "50px", height: "50px" }} />
              </td>
              <td>{user.sequence}</td>
            </tr>
          ))}
        </tbody>
      </table> 
      </Layout>*/
}

export default Team;
