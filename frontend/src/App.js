import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Application from "./pages/application";
import Team from "./pages/team/team";
import Contact from "./pages/contact";
import Login from "./pages/login";
// import Register from "./pages/register";
import AddTeam from "./pages/team/addteam";
import EditTeam from "./pages/team/editteam";
import Gallery from "./pages/gallery/gallery";
import GalleryName from "./pages/gallery_name/gallery-name";
import Services from "./pages/services/services";
import Career from "./pages/career/career";
import AddCareer from "./pages/career/addcareer";
import EditCareer from "./pages/career/editcareer";
import AddGallery from "./pages/gallery/addgallery";
import EditGallery from "./pages/gallery/editgallery";
import AddOpportunity from "./pages/opportunity/addopportunity";
import EditOpportunity from "./pages/opportunity/editopportunity";
import Opportunities from "./pages/opportunity/opportunity";
import AddService from "./pages/services/addservice";
import EditService from "./pages/services/editservice";
import About from "./pages/about/editabout";
import AddGalleryName from "./pages/gallery_name/addgallery_name";
import EditGalleryName from "./pages/gallery_name/editgallery_name";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/team" element={<Team />} />
        <Route path="/applications" element={<Application />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add/team" element={<AddTeam />} />
        <Route path={`/edit/team/:id`} element={<EditTeam />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery_name" element={<GalleryName />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/edit/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path="add/career/" element={<AddCareer />} />
        <Route path={`/edit/career/:id`} element={<EditCareer />} />
        <Route path="add/gallery/" element={<AddGallery />} />
        <Route path={`/edit/gallery/:id`} element={<EditGallery />} />
        <Route path="add/opportunity/" element={<AddOpportunity />} />
        <Route path={`/edit/opportunity/:id`} element={<EditOpportunity />} />
        <Route path="add/service" element={<AddService />} />
        <Route path={`/edit/service/:id`} element={<EditService />} />
        <Route path={`/services`} element={<Services />} />
        <Route path={`/add/gallery_name`} element={<AddGalleryName />} />
        <Route path={`/edit/gallery_name/:id`} element={<EditGalleryName />} />
      </Routes>
    </Router>
  );
}

export default App;
