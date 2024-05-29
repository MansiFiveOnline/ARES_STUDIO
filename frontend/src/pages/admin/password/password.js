import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../components/adminLayout";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Password = () => {
  const [emails, setEmails] = useState([]);

  const navigate = useNavigate();

  const tableRef = useRef(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        // const response = await axios.get("/api/user/allemail");
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: "password/emails",
        });
        console.log(response.data.emails);
        setEmails(response.data.emails);
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchEmails();
  }, []);

  //   const handleDelete = async (id) => {
  //     try {
  //       // await axios.delete(`http://localhost:8000/api/user/${id}`);
  //       const access_token = localStorage.getItem("access_token");

  //       const response = await axios({
  //         method: "DELETE",
  //         baseURL: "http://localhost:8000/api/",
  //         url: `email/${id}`,
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       });
  //       setEmail(null); // Update user state to null after deletion

  //       console.log(response.data);
  //       setEmail(email.filter((email) => email._id !== id));
  //       setTimeout(() => {
  //         navigate("/admin/email");
  //       }, 2000);
  //     } catch (error) {
  //       console.error("Error deleting email:", error);
  //     }
  //   };

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password).then(
      () => {
        console.log("Password copied to clipboard!");
        alert("Password copied to clipboard!");
      },
      (error) => {
        console.error("Could not copy password:", error);
      }
    );
  };

  return (
    <Layout>
      <div className="pages-headers ">
        <h2>Passwords</h2>
      </div>
      <div className="row mobilerows">
        <div className="col-md-12">
          <div className="infos-table">
            <div className="table-responsive">
              <table id="example" className="table nowrap">
                <thead>
                  <tr>
                    <th>Email</th>

                    <th>Password</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Add</th>
                  </tr>
                </thead>
                <tbody>
                  {emails &&
                    emails.map((email) => (
                      <tr key={email._id}>
                        <td>{email.email}</td>
                        <td>{email.password}</td>

                        {/* <td>{email.url}</td>
                        <td>{email.title}</td>
                        <td className="text-center">{email.subtitle}</td>
                        <td className="text-center">{email.description}</td> */}

                        <td className="text-center">
                          {/* <button title="Edit" onClick={() => navigate(`/edit/team/${user._id}`)}>
                    <CreateIcon />
                  </button>  */}
                          <Link
                            to={`/admin/edit/password/${email._id}`}
                            title="Edit"
                          >
                            <i class="las la-pencil-alt"></i>
                          </Link>
                        </td>

                        <td className="text-center">
                          <Link
                            to={`/admin/add/password/${email._id}`}
                            // className="theme-cta"
                            title="Add"
                          >
                            <i class="las la-plus-circle"></i>
                          </Link>
                        </td>

                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() => handleCopy(email._id)}
                          >
                            <i class="las la-copy"></i>
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

export default Password;
