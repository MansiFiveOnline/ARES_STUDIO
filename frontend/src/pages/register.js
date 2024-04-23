import React from "react";

const Register = () => {
  // const { username, setUsername } = useState("");
  // const { mail, setMail } = useState("");
  // const { password, setPassword } = useState("");

  return (
    // <div className="container main-form">
    //   <h3> ARES Studio</h3>
    //   <form className="form">
    //     <div class="mb-3">
    //       <label for="exampleInputUsername" class="form-label">
    //         Username
    //       </label>
    //       <input
    //         type="email"
    //         class="form-control"
    //         id="exampleInputUsername"
    //         aria-describedby="UsernameHelp"
    //       />
    //     </div>

    //     <div class="mb-3">
    //       <label for="exampleInputEmail1" class="form-label">
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         class="form-control"
    //         id="exampleInputEmail1"
    //         aria-describedby="emailHelp"
    //       />
    //     </div>
    //     <div class="mb-3">
    //       <label for="exampleInputPassword1" class="form-label">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         class="form-control"
    //         id="exampleInputPassword1"
    //       />
    //     </div>
       
    //     <button type="submit" class="main-btn">
    //       Register
    //     </button>
    //   </form>
    // </div>

    <div className="login-content">
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="form-white-bg">
              <form>
                <div className="row">
                  <div className="col-md-12 text-center mb-4">
                    <h3>ARES Studio</h3>
                  </div>
                  <div className="col-md-12">
                    <div className="theme-form">
                      <label>Email Id</label>
                      <input type="email" name="" value="" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="theme-form">
                      <label>Password</label>
                      <input type="password" name="" value="" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="theme-form">
                      <button type="submit">Login</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
