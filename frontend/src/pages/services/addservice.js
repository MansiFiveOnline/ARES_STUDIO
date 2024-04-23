import React from "react";
import Layout from "../../components/layout";

const AddService = () => {
  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Career</h2>
      </div>
      <div className="form-white-bg">
        <form>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  // value={Title}
                  // onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Descripiton</label>
                <input
                  type="text"
                  name="description"
                  // value={Description}
                  // onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Responsibilities</label>
                <input
                  type="text"
                  name="responsibilities"
                  // value={Responsibilities}
                  // onChange={(e) => setLinkedinURL(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  // value={Qualification}
                  // onChange={(e) => setImage(e.target.files[0])}
                  required
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

export default AddService;
