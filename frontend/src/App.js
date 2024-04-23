import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Home from "./pages/home";
import Application from "./pages/application"
import Team from "./pages/team/team";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Register from "./pages/register";
import AddTeam from "./pages/team/addteam"
import EditTeam from "./pages/team/editteam";
import Gallery from "./pages/gallery";
import GalleryName from "./pages/gallery-name";
import Services from "./pages/services";
import Career from "./pages/career";
import Opportunities from "./pages/opportunities";
import About from "./pages/about";

function App() {
  return (
  
    <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/team" element={<Team />} />
        <Route path="/applications" element={<Application/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/add/team" element = {<AddTeam/>} />
        <Route path={`/edit/team/:id`} element = {<EditTeam/>}/>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery_name" element = {<GalleryName/>} />
        <Route path="/opportunities" element = {<Opportunities/>} />
        <Route path="/about" element = {<About/>} />
        <Route path="/career" element = {<Career/>} />
        <Route path={`/services`} element = {<Services/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;