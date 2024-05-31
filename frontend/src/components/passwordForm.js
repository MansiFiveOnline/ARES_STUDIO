// import React from "react";
// import { Modal, Form, Button } from "react-bootstrap";
// import "../style/user.css";

// const PasswordForm = ({ modalVisible, setModalVisible, handleFormSubmit }) => {
//   return (
//     <div>
//       <Modal
//         className="media_modal locked_modal"
//         show={modalVisible}
//         onHide={() => setModalVisible(false)}
//       >
//         <Modal.Header closeButton></Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleFormSubmit}>
//             <Form.Group controlId="formUnlockCode">
//               <div>
//                 <img
//                   className="lock-pop"
//                   src="images/lock-popup-icon.svg"
//                   alt="Lock Pop-up Icon"
//                 />
//               </div>
//               <div>
//                 <h2 className="mb-5">Enter Password to Access this Area</h2>
//               </div>
//               <div className="lock-form">
//                 <div className="lock-ic">
//                   <img src="images/lock-form-icon.svg" alt="Lock Form Icon" />
//                 </div>
//                 <div className="lock-paswd">
//                   <Form.Control type="text" placeholder="Password" />
//                 </div>
//               </div>
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//             <div className="get_paswd">
//               <a href="#">Click here to get password</a>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default PasswordForm;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../style/user.css";

const PasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(password);
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
              type="text"
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
