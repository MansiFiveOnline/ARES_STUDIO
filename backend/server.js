const express = require("express");
const dotenv = require("dotenv");
const Route = require("./routes/index");
const connectDb = require("./config/database");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://ares-studio-frontend.onrender.com",
  })
);

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, "build")));

// // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

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

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(`Server connection failed due to ${error}`);
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
