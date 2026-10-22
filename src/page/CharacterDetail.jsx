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

    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        if (isCurrent) setCharacter(response.data);
      })
      .catch(() => {
        if (isCurrent) setError('No se pudo cargar el personaje.');
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
    return <p className="character-detail">Cargando personaje...</p>;
  }

  return (
    <section className="character-detail">
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
      <p>Episodes: {character.episode.length}</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default CharacterDetail;
