import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './page/Contact';
import About from './page/About';
import Home from './page/Home';
import CharacterDetail from './page/CharacterDetail';
import { All_Error } from './page/All_Error';
import './App.css';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="*" element={<All_Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
