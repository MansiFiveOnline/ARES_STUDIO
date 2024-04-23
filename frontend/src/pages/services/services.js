import React from "react";
import Layout from "../../components/layout";
import { NavLink, Link } from "react-router-dom";

const Services = () => {
  return (
    <Layout>
      <div className="pages-headers ">
        <h2>
          Services
          <NavLink to="/add/team" className="theme-cta">
            <i class="las la-plus-circle"></i>
            Add Service
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
                    <th>URL</th>
                    <th>Title</th>
                    <th className="text-center">Subtitle</th>
                    <th className="text-center">Description</th>
                    <th className="text-center">Media</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {users &&
                    users.map((user) => ( */}
                  <tr>
                    <td>Test</td>
                    <td>url</td>
                    <td>Title1</td>
                    <td className="text-center">Subtitle1</td>
                    <td className="text-center">Description</td>
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
                      <Link to={`/edit/team/`} title="Edit">
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
