import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//routes
import Home from './routes/Home';
import Login from './routes/Login'
import HeroDetails from './routes/HeroDetails'

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'login'} element={<Login />}/>
        <Route path={'/:id'} element={<HeroDetails />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
