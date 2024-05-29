// const passwordModel = require("../models/passwordModel");

// const getEmails = async (req, res) => {
//   try {
//   } catch (error) {}
// };

// // const createEmail = async(req, res) => {
// //     try{

// //     }
// // }
// const createPassword = async (req, res) => {
//   try {
//     const { password } = req.body;

//     const newPassword = new passwordModel({
//       password,
//     });

//     await newPassword.save();

//     res.status(200).json({
//       message: "New password created successfully",
//       newPassword,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in creating password due to ${error.message}`,
//     });
//   }
// };

// const updatePassword = async (req, res) => {
//   try {
//     const { password } = req.body;

//     const currentPassword = await passwordModel.findOne({});
//     if (!currentPassword) {
//       return res.status(404).json({
//         message: "Password not found to update.",
//       });
//     }

//     const updatedField = {
//       password,
//     };

//     const updatedPassword = await passwordModel.findOneAndUpdate(
//       {},
//       updatedField,
//       {
//         new: true,
//       }
//     );

//     return res.status(200).json({
//       message: "Password updated successfully.",
//       updatedPassword,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error in updating password due to ${error.message}`,
//     });
//   }
// };

// module.exports = {
//   getEmails,
//   createPassword,
//   updatePassword,
// };

const passwordModel = require("../models/passwordModel");

const createEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const newEmail = new passwordModel({ email });
    await newEmail.save();

    res.status(200).json({
      message: "Email submitted successfully",
      newEmail,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in submitting email: ${error.message}`,
    });
  }
};

const getEmails = async (req, res) => {
  try {
    const emails = await passwordModel.find();
    res.status(200).json({ emails });
  } catch (error) {
    return res.status(500).json({
      message: `Error in fetching emails: ${error.message}`,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    const updatedEmail = await passwordModel.findByIdAndUpdate(
      req.params._id,
      { password },
      { new: true }
    );

    if (!updatedEmail) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    res.status(200).json({
      message: "Password updated successfully",
      updatedEmail,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error in updating password: ${error.message}`,
    });
  }
};

module.exports = {
  createEmail,
  getEmails,
  updatePassword,
};
