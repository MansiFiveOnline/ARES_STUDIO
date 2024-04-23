import React from "react"
import Layout from "../components/layout"
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Application = () => {
return(
    <Layout>
      <div className="pages-headers ">
        <h2>
          Applications
          {/* <NavLink to="/add/team" className="theme-cta">
            <AddCircleIcon />
            Add
          </NavLink> */}
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
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th className="text-center">Location</th>
                    <th className="text-center">Designation</th>
                    <th className="text-center">Message</th>
                    <th className="text-center">Document</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                    <tr >
                      <td>Test</td>
                      <td>test@gmail.com</td>
                      <td>Developer</td>
                      <td>900-890-9740</td>
                      <td>Mumbai</td>
                      <td>New message</td>
                      <td className="table-profile-img text-center">
                        <img
                          src=""
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td className="text-center">
                      <NavLink to="" title="Delete ">
                        <i class="las la-trash"></i>
                        </NavLink>
                      </td>
                    </tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  </Layout>
);
   }

export default Application
