// import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import "../style/user.css";

// const PasswordForm = ({ onSubmit }) => {
//   const [password, setPassword] = useState("");

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     await onSubmit(password);
//   };

//   return (
//     <Form onSubmit={handleFormSubmit}>
//       <Form.Group controlId="formPassword">
//         <div>
//           <img
//             className="lock-pop"
//             src="images/lock-popup-icon.svg"
//             alt="Lock Pop-up Icon"
//           />
//         </div>
//         <div>
//           <h2 className="mb-5">Enter Password to Access this Area</h2>
//         </div>
//         <div className="lock-form">
//           <div className="lock-ic">
//             <img src="images/lock-form-icon.svg" alt="Lock Form Icon" />
//           </div>
//           <div className="lock-paswd">
//             <Form.Control
//               type="text"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//         </div>
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//       <div className="get_paswd">
//         <a href="#">Click here to get password</a>
//       </div>
//     </Form>
//   );
// };

// export default PasswordForm;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/user.css";

const PasswordForm = ({ onSubmit, projectName }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Call onSubmit callback to validate the password
    // const isValidPassword = await onSubmit(password);

    // if (isValidPassword) {
    // Redirect to the service detail page if the password is correct
    alert("Form submitted successfully.");
    navigate(`/service-detail/${projectName}`);
    // }
    //  else {
    //   // Handle incorrect password logic if needed
    //   alert("Incorrect password! Please try again.");
    // }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="formPassword">
        <div>
          <img
            className="lock-pop"
            src="images/lock-popup-icon.svg"
            alt="Lock Pop-up Icon"
          />
        </div>
        <div>
          <h2 className="mb-5">Enter Password to Access this Area</h2>
        </div>
        <div className="lock-form">
          <div className="lock-ic">
            <img src="images/lock-form-icon.svg" alt="Lock Form Icon" />
          </div>
          <div className="lock-paswd">
            <Form.Control
              type="password" // Change input type to password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <div className="get_paswd">
        <a href="#">Click here to get password</a>
      </div>
    </Form>
  );
};

export default PasswordForm;
