const express = require("express");
const dotenv = require("dotenv");
const Route = require("./routes/index");
const connectDb = require("./config/database");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());

// app.use(
//   cors({
//     origin: "https://react.bhaviklogistics.com",
//   })
// );

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, "build")));

// // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

const PORT = process.env.PORT || 8000;

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.PROD_URL] // Production URL
    : [process.env.DEV_URL]; // Development URL

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api", (req, res) => {
  res.send("This is backend");
});

app.use("/api/auth", Route.authRoute);
app.use("/api/team", Route.teamRoute);
app.use("/api/contact", Route.contactRoute);
app.use("/api/jobapplication", Route.jobApplicationRoute);
app.use("/api/about", Route.aboutRoute);
app.use("/api/career", Route.careerRoute);
app.use("/api/opportunity", Route.opportunitityRoute);
app.use("/api/service", Route.serviceRoute);
app.use("/api/gallery", Route.galleryRoute);
app.use("/api/gallery_name", Route.galleryNameRoute);
app.use("/api/project", Route.projectRoute);
app.use("/api/project_detail", Route.projectDetailsRoute);
app.use("/api/email", Route.emailRoute);

connectDb();

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Server connection failed due to ${error}`);
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
