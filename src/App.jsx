import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './page/Contact';
import About from './page/About';
import Home from './page/Home';
import CharacterDetail from './page/CharacterDetail'; // Podés cambiarle el nombre al archivo/componente si querés (ej: PokemonDetail)
import { All_Error } from './page/All_Error';
import './App.css';

function App() {
  return (
    // Dejá el basename intacto para que GitHub Pages siga funcionando bien
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* CAMBIA ESTA LÍNEA: De /character/:id a /pokemon/:id */}
        <Route path="/pokemon/:id" element={<CharacterDetail />} />
        <Route path="*" element={<All_Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
