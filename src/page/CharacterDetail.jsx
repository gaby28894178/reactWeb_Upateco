import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './CharacterDetail.css';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    // 1. Cambiamos la URL a la de PokeAPI
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        if (isCurrent) setCharacter(response.data);
      })
      .catch(() => {
        if (isCurrent) setError('No se pudo cargar el Pokémon.');
      });

    return () => {
      isCurrent = false;
    };
  }, [id]);

  if (error) {
    return (
      <section className="character-detail">
        <p role="alert">{error}</p>
        <Link to="/">Volver al inicio</Link>
      </section>
    );
  }

  if (!character) {
    return <p className="character-detail">Cargando Pokémon...</p>;
  }

  return (
    <section className="character-detail">
      <h1>{character.name.toUpperCase()}</h1>
      
      {/* 2. La imagen en PokeAPI viene en sprites */}
      <img src={character.sprites.other['official-artwork'].front_default} alt={character.name} />
      
      {/* 3. Adaptamos los campos a la estructura de PokeAPI */}
      <p>ID: {character.id}</p>
      <p>Altura: {character.height / 10} m</p>
      <p>Peso: {character.weight / 10} kg</p>
      
      {/* Los tipos vienen en un array, usamos .map() para mostrarlos */}
      <p>Tipos: {character.types.map(t => t.type.name).join(', ')}</p>
      
      {/* Las estadísticas también vienen en un array */}
      <p>HP: {character.stats.find(s => s.stat.name === 'hp').base_stat}</p>
      
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default CharacterDetail;


// import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import './CharacterDetail.css';

// function CharacterDetail() {
//   const { id } = useParams();
//   const [character, setCharacter] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     let isCurrent = true;

//     axios.get(`https://rickandmortyapi.com/api/character/${id}`)
//       .then((response) => {
//         if (isCurrent) setCharacter(response.data);
//       })
//       .catch(() => {
//         if (isCurrent) setError('No se pudo cargar el personaje.');
//       });

//     return () => {
//       isCurrent = false;
//     };
//   }, [id]);

//   if (error) {
//     return (
//       <section className="character-detail">
//         <p role="alert">{error}</p>
//         <Link to="/">Volver al inicio</Link>
//       </section>
//     );
//   }

//   if (!character) {
//     return <p className="character-detail">Cargando personaje...</p>;
//   }

//   return (
//     <section className="character-detail">
//       <h1>{character.name}</h1>
//       <img src={character.image} alt={character.name} />
//       <p>Status: {character.status}</p>
//       <p>Species: {character.species}</p>
//       <p>Gender: {character.gender}</p>
//       <p>Origin: {character.origin.name}</p>
//       <p>Location: {character.location.name}</p>
//       <p>Episodes: {character.episode.length}</p>
//       <Link to="/">Volver al inicio</Link>
//     </section>
//   );
// }

// export default CharacterDetail;
