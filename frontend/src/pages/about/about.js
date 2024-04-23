import React from "react";
import Layout from "../../components/layout";

const About = () => {
  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Edit About</h2>
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
                  //   value={Title}
                  // onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  // value={Description}
                  // onChange={(e) => setDesignation(e.target.value)}
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
                  // value={Qualification}
                  // onChange={(e) => setImage(e.target.files[0])}
                  required
                />
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>About Descripiton</label>
                <input
                  type="text"
                  name="about_description"
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

export default About;
