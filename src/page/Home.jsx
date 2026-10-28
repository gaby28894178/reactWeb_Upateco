import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;
    const BASEURL = "https://pokeapi.co/api/v2/pokemon?limit=20"

    axios.get(BASEURL)
      .then((response) => {
        if (isCurrent) setCharacters(response.data.results);
      })
      .catch(() => {
        if (isCurrent) setError('No se pudieron cargar los personajes.');
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <main className="home-page">
      <header className="home-hero">
        <h1>Personajes de Rick and Morty</h1>
        <p>Datos obtenidos en vivo desde la API pública rickandmortyapi.com</p>
      </header>

      {loading && <p className="home-status">Cargando personajes...</p>}
      {error && <p className="home-status home-status--error" role="alert">{error}</p>}

      {!loading && !error && (
        <div className="characters-container">
          {characters.map((character) => (
            <article key={character.id} className="card">
              <Link to={`/character/${character.id}`} aria-label={`Ver detalles de ${character.name}`}>
                <img src={character.image} alt={character.name} />
              </Link>
              <h2>{character.name}</h2>
              <p><strong>Estado:</strong> {character.status}</p>
              <p><strong>Especie:</strong> {character.species}</p>
              <p><strong>Género:</strong> {character.gender}</p>
              <p><strong>Origen:</strong> {character.origin.name}</p>
              <p><strong>Ubicación:</strong> {character.location.name}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
