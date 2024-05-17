// const jwt = require("jsonwebtoken");
// const connectDb = require("../config/database");

// const authenticateAdmin = (req, res, next) => {
//   try {
//     const userId = req.user.user_id;

//     db.query( [userId], (error, rows) => {
//       if (error) {
//         return res.status(500).json({
//           message: `Failed due to ${error.message}`,
//         });
//       }
//       if (rows.length === 0) {
//         return res.status(400).json({
//           message: "User not found",
//         });
//       }

//       const userRole = rows[0].role;

//       req.user = {
//         user_id: userId,
//         role: userRole,
//       };
//       // const user = rows[0].user_id;
//       // console.log(user);

//       // console.log(req.user);

//       if (req.user.role !== 1) {
//         return res.status(400).json({
//           message: "Unauthorized access",
//         });
//       }
//       next();
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: `Admin authentiction failed due to ${error.message}`,
//     });
//   }
// };

// module.exports = authenticateAdmin;
