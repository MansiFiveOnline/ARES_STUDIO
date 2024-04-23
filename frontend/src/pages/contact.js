import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/layout";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";

const Contact = () => {
  //   const [contacts, setContacts] = useState([]);

  //   useEffect(() => {
  //     const fetchContacts = async () => {
  //       try {
  //         const response = await axios.get("/api/contact");
  //         setContacts(response.data.contacts);
  //       } catch (error) {
  //         console.error("Error fetching contacts:", error);
  //       }
  //     };

  //     fetchContacts();
  //   }, []);

  //   const handleDelete = async (id) => {
  //     try {
  //       await axios.delete(`/api/contact/${id}`);
  //       setContacts((prevContacts) =>
  //         prevContacts.filter((contact) => contact._id !== id)
  //       );
  //     } catch (error) {
  //       console.error("Error deleting contact:", error);
  //     }
  //   };

  //   return (
  //     <Layout>
  // <div>
  //       <h2>Contact List</h2>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Name</th>
  //             <th>Email</th>
  //             <th>Subject</th>
  //             <th>Message</th>
  //             <th>Action</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {contacts.map((contact) => (
  //             <tr key={contact._id}>
  //               <td>{contact.name}</td>
  //               <td>{contact.email}</td>
  //               <td>{contact.subject}</td>
  //               <td>{contact.message}</td>
  //               <td>
  //                 <button onClick={() => handleDelete(contact._id)}>
  //                   Delete
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //     </Layout>

  //   );
  // };

  // export default Contact;

  // const [contacts, setContacts] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     try {
  //       // const response = await axios.get("/api/contact");

  //       const response = await axios({
  //         method: "GET",
  //         baseURL: "http://localhost:8000/api/",
  //         url: "contact",
  //       });

  //       setContacts(response.data.contacts);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching contacts:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchContacts();
  // }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/api/contact/${id}`);
  //     setContacts((prevContacts) =>
  //       prevContacts.filter((contact) => contact._id !== id)
  //     );
  //   } catch (error) {
  //     console.error("Error deleting contact:", error);
  //   }
  // };

  return (
    // <Layout>
    //   <div>
    //     <h2>Contact List</h2>
    //     {loading ? (
    //       <p>Loading...</p>
    //     ) : contacts.length === 0 ? (
    //       <p>No records found.</p>
    //     ) : (
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>Name</th>
    //             <th>Email</th>
    //             <th>Subject</th>
    //             <th>Message</th>
    //             <th>Action</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {contacts.map((contact) => (
    //             <tr key={contact._id}>
    //               <td>{contact.name}</td>
    //               <td>{contact.email}</td>
    //               <td>{contact.subject}</td>
    //               <td>{contact.message}</td>
    //               <td>
    //                 <button onClick={() => handleDelete(contact._id)}>
    //                   Delete
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     )}
    //   </div>
    // </Layout>

    <Layout>
        <div className="pages-headers ">
          <h2>
            Contacts
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
                      <th>Subject</th>
                      <th>Message</th>
                      <th className="text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {users && users.map((user) => ( */}
                    <tr>
                      <td>Test</td>
                      <td>test@gmail.com</td>
                      <td>New message</td>
                      <td>makfdhlshfkslfjlsf</td>

                      {/* <td className="text-center">
                          {/* <button title="Edit" onClick={() => navigate(`/edit/team/${user._id}`)}>
                            <CreateIcon />
                          </button>
                          <Link to={`/edit/team/${user._id}`} title="Delete" >
                            <DeleteIcon />
                          </Link>
                        </td> */}
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
};

export default Contact;
