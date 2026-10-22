import './About.css';

const teamMembers = [
  {
    id: 1,
    name: 'Ana Torres',
    role: 'Desarrollo Frontend',
    description: 'Encargada de la interfaz, los componentes de React y la experiencia de usuario.',
    image: 'https://picsum.photos/seed/ana-torres/600/400',
  },
  {
    id: 2,
    name: 'Bruno Ramírez',
    role: 'Desarrollo Backend',
    description: 'Responsable de la integración con APIs, la lógica de datos y la seguridad.',
    image: 'https://picsum.photos/seed/bruno-ramirez/600/400',
  },
  {
    id: 3,
    name: 'Carla Méndez',
    role: 'Diseño UI/UX',
    description: 'Define la identidad visual, los wireframes y la jerarquía de cada pantalla.',
    image: 'https://picsum.photos/seed/carla-mendez/600/400',
  },
  {
    id: 4,
    name: 'Diego Fernández',
    role: 'Testing y QA',
    description: 'Verifica el correcto funcionamiento del sitio y la calidad de cada entrega.',
    image: 'https://picsum.photos/seed/diego-fernandez/600/400',
  },
];

function About() {
  return (
    <main className="about-page">
      <header className="about-hero">
        <h1>Nosotros</h1>
        <p>Conocé al equipo detrás de este proyecto. Los datos de esta página provienen de un array local de objetos.</p>
      </header>

      <div className="about-grid">
        {teamMembers.map((member) => (
          <article key={member.id} className="about-card">
            <img src={member.image} alt={member.name} loading="lazy" />
            <div className="about-card__body">
              <h2>{member.name}</h2>
              <span className="about-card__role">{member.role}</span>
              <p>{member.description}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default About;
