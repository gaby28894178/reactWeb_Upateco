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
      <h1>Pokémon</h1>
      <p>Datos obtenidos en vivo desde la API pública pokeapi.co</p>
    </header>

    {loading && <p className="home-status">Cargando personajes...</p>}
    {error && <p className="home-status home-status--error" role="alert">{error}</p>}

    {!loading && !error && (
      <div className="characters-container">
        {characters.map((pokemon) => {
          // Extraemos el ID de la URL del Pokémon para usarlo en la imagen
          // La URL viene así: https://pokeapi.co/api/v2/pokemon/1/
          const id = pokemon.url.split('/').filter(Boolean).pop();
          
          return (
            <article key={pokemon.name} className="card">
              <Link to={`/pokemon/${id}`} aria-label={`Ver detalles de ${pokemon.name}`}>
                {/* Usamos el sprite oficial usando el ID */}
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
                  alt={pokemon.name} 
                />
              </Link>
              <h2>{pokemon.name}</h2>
              {/* PokeAPI en esta lista NO trae status, especie, género, etc. 
                  Solo trae name y url. Si quieres esos datos, debes hacer otra petición por cada Pokémon. */}
              <p><strong>ID:</strong> {id}</p>
              <p><strong>URL:</strong> <a href={pokemon.url} target="_blank" rel="noreferrer">Ver en PokeAPI</a></p>
            </article>
          );
        })}
      </div>
    )}
  </main>
);
  // return (
  //   <main className="home-page">
  //     <header className="home-hero">
  //       <h1>Personajes de Rick and Morty</h1>
  //       <p>Datos obtenidos en vivo desde la API pública rickandmortyapi.com</p>
  //     </header>

  //     {loading && <p className="home-status">Cargando personajes...</p>}
  //     {error && <p className="home-status home-status--error" role="alert">{error}</p>}

  //     {!loading && !error && (
  //       <div className="characters-container">
  //         {characters.map((character) => (
  //           <article key={character.id} className="card">
  //             <Link to={`/character/${character.id}`} aria-label={`Ver detalles de ${character.name}`}>
  //               <img src={character.image} alt={character.name} />
  //             </Link>
  //             <h2>{character.name}</h2>
  //             <p><strong>Estado:</strong> {character.status}</p>
  //             <p><strong>Especie:</strong> {character.species}</p>
  //             <p><strong>Género:</strong> {character.gender}</p>
  //             <p><strong>Origen:</strong> {character.origin.name}</p>
  //             <p><strong>Ubicación:</strong> {character.location.name}</p>
  //           </article>
  //         ))}
  //       </div>
  //     )}
  //   </main>
  // );
}

export default Home;
