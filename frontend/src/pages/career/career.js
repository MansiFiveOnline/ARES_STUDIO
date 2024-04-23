import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Career = () => {
  const [careers, setCareers] = useState([]);

  const navigate = useNavigate();

  const tableRef = useRef(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        // const response = await axios.get("/api/user/allcareers");
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: "career",
        });
        console.log(response.data.careers);
        setCareers(response.data.careers);
      } catch (error) {
        console.error("Error fetching careers:", error);
      }
    };

    fetchCareers();
  }, []);

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`http://localhost:8000/api/user/${id}`);
      const response = await axios({
        method: "DELETE",
        baseURL: "http://localhost:8000/api/",
        url: `user/${id}`,
      });
      setCareers(null); // Update user state to null after deletion
      setTimeout(() => {
        navigate("/career");
      }, 2000);
      console.log(response.data);
      setCareers(careers.filter((user) => user._id !== id));
      setTimeout(() => {
        navigate("/career");
      }, 3000);
    } catch (error) {
      console.error("Error deleting career:", error);
    }
  };

  return (
    <Layout>
      <div className="pages-headers ">
        <h2>
          Career
          <NavLink to="/add/career" className="theme-cta">
            <i class="las la-plus-circle"></i>
            Add Career
          </NavLink>
        </h2>
      </div>
      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              {/* <DataTable
        value={careers}
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
          field="careers.imageUrl"
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
                    <th>Title</th>
                    <th className="text-center">Subtitle</th>
                    <th className="text-center">Media</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {careers &&
                    careers.map((career) => (
                      <tr key={career._id}>
                        <td>{career.title}</td>
                        <td className="text-center">{career.subtitle}</td>
                        <td className="table-profile-img text-center">
                          <img
                            src=""
                            alt=""
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td className="text-center">
                          {/* <button title="Edit" onClick={() => navigate(`/edit/team/${user._id}`)}>
                  <CreateIcon />
                </button>  */}
                          <Link to={`/edit/career/`} title="Edit">
                            <i class="las la-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            // onClick={() => handleDelete(user._id)}
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

export default Career;
