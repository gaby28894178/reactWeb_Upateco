import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact() {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Validación limpia: solo comprueba que las tres variables existan y no estén vacías
    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'error',
        message: 'Falta configurar EmailJS. Revisa las variables VITE_EMAILJS en tu archivo .env',
      });
      return;
    }

    setSending(true);
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey: publicKey, 
      });
      
      formRef.current.reset();
      setStatus({ type: 'success', message: '¡Mensaje enviado con éxito!' });
    } catch (error) {
      console.error('No se pudo enviar el formulario de contacto:', error);
      setStatus({
        type: 'error',
        message: 'No se pudo enviar el mensaje. Revisa tu configuración de EmailJS.',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="contact-page">
      <h1>Contacto</h1>
      <p>Completa el formulario para ponerte en contacto.</p>

      <div className="contact-content">
        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
    
          <label htmlFor="contact-name">Nombre</label>
          <input id="contact-name" name="user_name" type="text" required />

          <label htmlFor="contact-email">Correo electrónico</label>
          <input id="contact-email" name="user_email" type="email" required />

          <label htmlFor="contact-message">Mensaje</label>
          <textarea id="contact-message" name="message" rows="5" required />

          <button type="submit" disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        
          {status.message && (
            <p className={`contact-notice contact-notice--${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
              {status.message}
            </p>
          )}
        </form>

        <div className="contact-map">
          <iframe
            title="Ubicación de la oficina"
            src="https://google.com"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}

export default Contact;
