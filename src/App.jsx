
import {BrowserRouter,  Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './page/Contact';
import About from './page/About';
import './App.css'
import Home from './page/Home';
import { All_Error } from './page/All_Error';

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<All_Error />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
