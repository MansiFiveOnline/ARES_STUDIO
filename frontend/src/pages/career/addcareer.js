import React from "react";
import Layout from "../../components/layout";

const AddCareer = () => {
  return (
    <Layout>
      <div className="theme-form-header">
        <h2>Add Career</h2>
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
                  // value={Qualification}
                  // onChange={(e) => setImage(e.target.files[0])}
                  required
                />
                {/* <img className="form-profile" src="src/img/user-icon-img.png" /> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="theme-form">
                <label>Media</label>
                <input
                  type="file"
                  name="media"
                  // value={Qualification}
                  // onChange={(e) => setImage(e.target.files[0])}
                />
                <span> OR </span>

                <input
                  type="text"
                  name="media"
                  // value={Qualification}
                  // onChange={(e) => setImage(e.target.files[0])}
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

export default AddCareer;
