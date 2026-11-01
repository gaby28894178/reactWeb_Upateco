import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TYPE_GRADIENTS = {
  water:    { bg: 'linear-gradient(145deg, #56b4e9 0%, #0d7bbf 50%, #a8d8f0 100%)', border: '#0d7bbf', glow: '#56b4e9', text: '#003a5c' },
  ice:      { bg: 'linear-gradient(145deg, #b8f0f0 0%, #7fd8e8 50%, #ffffff 100%)', border: '#7fd8e8', glow: '#b8f0f0', text: '#004a5a' },
  flying:   { bg: 'linear-gradient(145deg, #f5e642 0%, #c8a800 50%, #8b6914 100%)', border: '#c8a800', glow: '#f5e642', text: '#3a2800' },
  electric: { bg: 'linear-gradient(145deg, #ffe840 0%, #f5c400 50%, #c87800 100%)', border: '#f5c400', glow: '#ffe840', text: '#3a2000' },
  ground:   { bg: 'linear-gradient(145deg, #b8926a 0%, #8b6340 50%, #c8b49a 100%)', border: '#8b6340', glow: '#b8926a', text: '#2a1a00' },
  rock:     { bg: 'linear-gradient(145deg, #c8b49a 0%, #9a7a5a 50%, #6a4a2a 100%)', border: '#9a7a5a', glow: '#c8b49a', text: '#2a1a00' },
  fire:     { bg: 'linear-gradient(145deg, #ff6b35 0%, #e83800 50%, #ff9a1a 100%)', border: '#e83800', glow: '#ff6b35', text: '#3a0a00' },
  grass:    { bg: 'linear-gradient(145deg, #78c850 0%, #3a9a10 50%, #aae870 100%)', border: '#3a9a10', glow: '#78c850', text: '#0a2800' },
  poison:   { bg: 'linear-gradient(145deg, #c060c8 0%, #8a2090 50%, #e090e8 100%)', border: '#8a2090', glow: '#c060c8', text: '#2a0030' },
  psychic:  { bg: 'linear-gradient(145deg, #f85888 0%, #c81860 50%, #ffaacc 100%)', border: '#c81860', glow: '#f85888', text: '#3a0020' },
  bug:      { bg: 'linear-gradient(145deg, #a8b820 0%, #6a7800 50%, #d0e040 100%)', border: '#6a7800', glow: '#a8b820', text: '#1a2000' },
  normal:   { bg: 'linear-gradient(145deg, #d0c8b0 0%, #a89880 50%, #e8e0c8 100%)', border: '#a89880', glow: '#d0c8b0', text: '#2a2010' },
  fighting: { bg: 'linear-gradient(145deg, #c03028 0%, #801010 50%, #e07060 100%)', border: '#801010', glow: '#c03028', text: '#200000' },
  steel:    { bg: 'linear-gradient(145deg, #c0c0d8 0%, #8888a8 50%, #e8e8f8 100%)', border: '#8888a8', glow: '#c0c0d8', text: '#1a1a2a' },
  ghost:    { bg: 'linear-gradient(145deg, #6060b0 0%, #303080 50%, #9090d0 100%)', border: '#303080', glow: '#6060b0', text: '#f0f0ff' },
  dragon:   { bg: 'linear-gradient(145deg, #6038f8 0%, #3000c0 50%, #9070ff 100%)', border: '#3000c0', glow: '#6038f8', text: '#e0d0ff' },
  dark:     { bg: 'linear-gradient(145deg, #484848 0%, #181818 50%, #787878 100%)', border: '#181818', glow: '#484848', text: '#e0e0e0' },
  fairy:    { bg: 'linear-gradient(145deg, #f8b8d8 0%, #d870a8 50%, #ffddf0 100%)', border: '#d870a8', glow: '#f8b8d8', text: '#3a0020' },
};

const DEFAULT_THEME = { bg: 'linear-gradient(145deg, #f5e642 0%, #f0c020 40%, #e8a000 100%)', border: '#c8960c', glow: '#f5e642', text: '#3a2000' };

function getTheme(types) {
  if (!types || types.length === 0) return DEFAULT_THEME;
  return TYPE_GRADIENTS[types[0]] || DEFAULT_THEME;
}

function PokemonCard({ pokemon }) {
  const [types, setTypes] = useState([]);
  const id = pokemon.url.split('/').filter(Boolean).pop();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => setTypes(res.data.types.map(t => t.type.name)))
      .catch(() => {});
  }, [id]);

  const theme = getTheme(types);

  return (
    <article
      className="card"
      style={{
        '--grad': theme.bg,
        '--glow': theme.glow,
        '--text': theme.text,
      }}
    >
      <div className="card-img-wrapper">
          <div className="card-img-box">
            <Link to={`/pokemon/${id}`} aria-label={`Ver detalles de ${pokemon.name}`}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={pokemon.name}
              />
            </Link>
          </div>
        </div>
      <h2 style={{ color: theme.text }}>{pokemon.name}</h2>
      <p style={{ color: theme.text }}><strong>ID:</strong> {id}</p>
      {types.length > 0 && (
        <div className="card-types">
          {types.map(t => (
            <span key={t} className="card-type-badge" style={{ color: theme.text }}>{t}</span>
          ))}
        </div>
      )}
    </article>
  );
}

function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const urlbase = 'https://pokeapi.co/api/v2/pokemon?limit=20'

  useEffect(() => {
    let isCurrent = true;
    axios.get(urlbase)
      .then(res => { if (isCurrent) setCharacters(res.data.results); })
      .catch(() => { if (isCurrent) setError('No se pudieron cargar los personajes.'); })
      .finally(() => { if (isCurrent) setLoading(false); });
    return () => { isCurrent = false; };
  }, []);

  return (
    <main className="home-page">
      <header className="home-hero">
        <h1>Pokémon</h1>
      </header>

      {loading && <p className="home-status">Cargando personajes...</p>}
      {error && <p className="home-status home-status--error" role="alert">{error}</p>}

      {!loading && !error && (
        <div className="characters-container">
          {characters.map(pokemon => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
