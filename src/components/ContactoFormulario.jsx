import { useState } from 'react';
import styles from './ContactoFormulario.module.css';

const key = "mpppynoo";
const ENDPOINT = `https://formspree.io/f/${key}`;

function ContactoFormulario() {
    const [formulario, setFormulario] = useState({ nombre: '', email: '', mensaje: '' });
    const [estado, setEstado] = useState('idle');

    const manejarCambios = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();
        if (estado === 'enviando') return;
        setEstado('enviando');
        try {
            const respuesta = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ name: formulario.nombre, email: formulario.email, message: formulario.mensaje })
            });
            if (respuesta.ok) {
                setEstado('ok');
                setFormulario({ nombre: '', email: '', mensaje: '' });
            } else {
                setEstado('error');
            }
        } catch {
            setEstado('error');
        }
    };

    return (
        <form onSubmit={enviarFormulario} className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="nombre">Tu Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambios}
                    placeholder="Tu nombre completo"
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="email">Tu Correo</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={manejarCambios}
                    placeholder="nombre@correo.com"
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formulario.mensaje}
                    onChange={manejarCambios}
                    placeholder="Escribe tu consulta aquí..."
                    required
                    rows="5"
                />
            </div>

            <button type="submit" disabled={estado === 'enviando'} className={styles.submit}>
                {estado === 'enviando' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

            {estado === 'ok' && <p className={styles.noticeOk}>¡Mensaje enviado con éxito!</p>}
            {estado === 'error' && <p className={styles.noticeError}>Hubo un error al enviar el mensaje.</p>}
        </form>
    );
}

export default ContactoFormulario;
