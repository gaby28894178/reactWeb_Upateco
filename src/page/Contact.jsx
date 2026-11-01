import ContactoFormulario from '../components/ContactoFormulario';
import './Contact.css';

const infoItems = [
    // { Icono: '✉️', titulo: 'Email', texto: 'gabgabrielligabriel@gmail.com' }, este no pongo por q es un poco  peligroso  pero es el mismo q  esta en la api 
    { Icono: '📞', titulo: 'Teléfono', texto: '+54 11 2167-4227' },
    { Icono: '📍', titulo: 'Dirección', texto: 'Moreno, Buenos Aires' },
    { Icono: '🕒', titulo: 'Horario', texto: 'Lunes a viernes, 9:00 – 18:00' },
];

const latitud = -34.6484;
const longitud = -58.7897;
const MAPA_EMBED_URL = `https://www.google.com/maps?q=${latitud},${longitud}&output=embed`;

function Contacto() {
    return (
        <div className="contact-page">
            <main className="contact-main">
                <h1>Póngase en Contacto</h1>
                <p>Escríbenos y te responderemos lo antes posible.</p>

                <div className="contact-grid">
                    <section>
                        <ContactoFormulario />
                    </section>

                    <section className="contact-side">
                        <ul className="contact-info-list">
                            {infoItems.map(({ Icono, titulo, texto }) => (
                                <li key={titulo} className="contact-info-item">
                                    <span className="contact-info-icon">{Icono}</span>
                                    <div>
                                        <strong>{titulo}</strong>
                                        <p>{texto}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="contact-map">
                            <iframe
                                src={MAPA_EMBED_URL}
                                allowFullScreen
                                loading="lazy"
                                title="Ubicación en el mapa"
                            />
                        </div>
                    </section>
                </div>
            </main>

     
        </div>
    );
}

export default Contacto;
