// Import components
import Navbar from "./components/Navbar";
import HeroDetails from "./components/HeroDetails";
import Home from "./components/Home";
import SavedHeroes from './pages/SavedHeroes'

// Import dependencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<HeroDetails />} />
        <Route path="/saved" element={<SavedHeroes />}/>
      </Routes>
    </Router>
  );
}

export default App;
