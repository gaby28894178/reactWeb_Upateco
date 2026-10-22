
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import Contact from './page/Contact';
import About from './page/About';
import Home from './page/Home';
import CharacterDetail from './page/CharacterDetail';
import { All_Error } from './page/All_Error';
import './App.css'

import {useState, useEffect} from 'react'
import  axios  from 'axios';
function App() {

console.log("Aca salen los errores")


// const [error, setError] = useState(null);
const [characters, setCharacters ] = useState([]);


useEffect(() => {
  axios.get('https://rickandmortyapi.com/api/character')
  .then((response) => setCharacters(response.data.results))
  .catch((error) => console.error(error));
}, []);



  return (
  <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <div className="characters-container">
                {characters.map((character) => (
                  <div key={character.id} className="card">
                    <h1>{character.name}</h1>
                    <Link to={`/character/${character.id}`} aria-label={`Ver detalles de ${character.name}`}>
                      <img src={character.image} alt={character.name} />
                    </Link>
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Origin: {character.origin.name}</p>
                    <p>Location: {character.location.name}</p>
                  </div>
                ))}
              </div>
            </>
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="*" element={<All_Error />} />
        </Routes>
      </BrowserRouter>
  </>
  )
}

export default App
