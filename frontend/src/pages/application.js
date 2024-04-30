import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { NavLink, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Application = () => {
  const [applications, setApplications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        // const response = await axios.get("/api/user/allapplications");
        const response = await axios({
          method: "GET",
          baseURL: "http://localhost:8000/api/",
          url: "jobapplication",
        });
        console.log(response.data.applications);
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplication();
  }, []);

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`http://localhost:8000/api/user/${id}`);
      const response = await axios({
        method: "DELETE",
        baseURL: "http://localhost:8000/api/",
        url: `jobapplication/${id}`,
      });
      setApplications(null); // Update user state to null after deletion
      setTimeout(() => {
        navigate("/applications");
      }, 2000);
      console.log(response.data);
      setApplications(
        applications.filter((application) => application._id !== id)
      );
      setTimeout(() => {
        navigate("/applications");
      }, 2000);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  // const handleDownload = (filepath) => {
  //   // Replace backslashes with forward slashes in the filepath
  //   const normalizedPath = filepath.replace(/\\/g, "/");

  //   // Construct the full URL of the document
  //   const downloadUrl = `http://localhost:8000/${normalizedPath}`;

  //   // Create a hidden anchor element to trigger download
  //   const anchor = document.createElement("a");
  //   anchor.href = downloadUrl;
  //   anchor.download = "application_document.pdf";
  //   anchor.click();
  // };

  // const handleDownload = (document) => {
  //   if (typeof window !== "undefined") {
  //     if (Array.isArray(document) && document.length > 0) {
  //       const firstDocument = document[0];
  //       if (firstDocument.filepath) {
  //         const normalizedPath = firstDocument.filepath.replace(/\\/g, "/");
  //         const downloadUrl = `http://localhost:8000/${normalizedPath}`;

  //         const anchor = document.createElement("a");
  //         anchor.href = downloadUrl;
  //         anchor.download =
  //           firstDocument.filename || "application_document.pdf";
  //         anchor.click();
  //       } else {
  //         console.error("Invalid document filepath:", firstDocument);
  //       }
  //     } else {
  //       console.error("Invalid document:", document);
  //     }
  //   } else {
  //     console.error(
  //       "handleDownload function can only be executed in the browser environment"
  //     );
  //   }
  // };

  // const handleDownload = (document) => {
  //   if (typeof window !== "undefined" && document) {
  //     if (Array.isArray(document) && document.length > 0) {
  //       const firstDocument = document[0];
  //       if (firstDocument.filepath) {
  //         // Replace backslashes with forward slashes in the filepath
  //         const normalizedPath = firstDocument.filepath.replace(/\\/g, "/");
  //         // Construct the full URL of the document
  //         const downloadUrl = `http://localhost:8000/${normalizedPath}`;
  //         // Create a hidden anchor element to trigger download
  //         const anchor = document.createElement("a");
  //         anchor.href = downloadUrl;
  //         anchor.download =
  //           firstDocument.filename || "application_document.pdf";
  //         anchor.click();
  //       } else {
  //         console.error("Invalid document filepath:", firstDocument);
  //       }
  //     } else {
  //       console.error("No document found for download");
  //     }
  //   } else {
  //     console.error(
  //       "handleDownload function can only be executed in the browser environment"
  //     );
  //   }
  // };
  const handleDownload = (document) => {
    if (typeof window !== "undefined" && document) {
      if (Array.isArray(document) && document.length > 0) {
        const firstDocument = document[0];
        if (firstDocument.filepath) {
          // Replace backslashes with forward slashes in the filepath
          const normalizedPath = firstDocument.filepath.replace(/\\/g, "/");
          // Construct the full URL of the document
          const downloadUrl = `http://localhost:8000/${normalizedPath}`;
          // Open the download URL in a new tab
          window.open(downloadUrl, "_blank");
        } else {
          console.error("Invalid document filepath:", firstDocument);
        }
      } else {
        console.error("No document found for download");
      }
    } else {
      console.error(
        "handleDownload function can only be executed in the browser environment"
      );
    }
  };

  return (
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
                  {applications &&
                    applications.map((application) => (
                      <tr key={application._id}>
                        <td>{application.name}</td>
                        <td>{application.email}</td>
                        <td>{application.phone_no}</td>
                        <td>{application.location}</td>
                        <td>{application.designation}</td>
                        <td>{application.message}</td>
                        <td className="table-profile-img text-center">
                          {application.document && (
                            <button
                              className="theme-cta"
                              onClick={() =>
                                handleDownload(application.document)
                              }
                            >
                              Download
                            </button>
                          )}
                        </td>
                        <td className="text-center">
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(application._id)}
                          >
                            <i class="las la-trash"></i>
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

export default Application;
