import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditOpportunity = () => {
  const { id } = useParams(); // Assuming the parameter is named userId
  const [opportunity, setOpportunity] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsibility: "",
    qualification: "",
  });

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/opportunity/${id}`
        );
        const { title, description, responsibility, qualification } =
          response.data.opportunity;
        setFormData({
          title,
          description,
          responsibility,
          qualification,
        });
      } catch (error) {
        console.error("Error fetching opportunity:", error);
      }
    };

    fetchOpportunity();
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
      const response = await axios.patch(
        `http://localhost:8000/api/opportunity/${id}`,
        formData
      );
      console.log("Opportunity updated:", response.data.updatedOpportunity);
      setTimeout(() => {
        navigate("/opportunities");
      }, 2000);
    } catch (error) {
      console.error("Error updating opportunity:", error);
    }
  };

  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Opportunity</h2>
      </div>
      <div className="form-white-bg">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Descripiton</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Responsibility</label>
                <input
                  type="text"
                  name="responsibility"
                  value={formData.responsibility}
                  onChange={handleChange}
                />
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
              </div>
            </div>

            <div className="col-12">
              <div className="theme-form">
                {/* <input type="button" value="Save" onClick={handleSubmit}/> */}
                <button type="submit">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditOpportunity;
