import React, { useState, useEffect } from "react";
import Layout from "../../../components/adminLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(
          `https://ares-studio.onrender.com/api/email/${id}`
        );
        setPassword(response.data.email);
        setFormData({
          email: response.data.email.email,
          password: "",
        });
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const access_token = localStorage.getItem("access_token");

      const response = await axios.post(
        `https://ares-studio.onrender.com/api/email/password/${id}`,
        { password: formData.password },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log("Password added:", response.data);
      navigate("/admin/password"); // Navigate after successful update
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Password</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  // onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Password</label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12">
              <div className="theme-form">
                <button type="submit">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddPassword;
