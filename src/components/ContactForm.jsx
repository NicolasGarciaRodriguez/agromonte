import { useState } from "react";
import Reveal from "./Reveal.jsx";
import "./ContactForm.css";

// Formspree (https://formspree.io) permite recibir este formulario por email
// sin necesidad de servidor propio. Crea una cuenta gratuita, copia el ID de
// tu formulario (p. ej. "xseniAjl") y colócalo en el archivo .env como
// VITE_FORMSPREE_ID, o sustitúyelo aquí directamente.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "YOUR_FORM_ID";
const ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();

    if (FORMSPREE_ID === "YOUR_FORM_ID") {
      setStatus("error");
      return;
    }

    const form = e.target;
    const data = new FormData(form);
    setStatus("sending");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="section contact">
      <div className="container contact-grid">
        <div className="contact-intro">
          <Reveal as="p" className="eyebrow">Contacto</Reveal>
          <Reveal as="h2" delay={1} className="contact-title">
            Hablemos de granada, mandarina u olivar
          </Reveal>
          <Reveal as="p" delay={2} className="contact-text">
            ¿Eres importador, distribuidor o simplemente quieres saber más sobre
            el proyecto Agromonte? Escríbenos y te responderemos lo antes
            posible.
          </Reveal>
          <Reveal delay={3} className="contact-meta">
            <div>
              <span className="contact-meta-label">Explotación</span>
              <span>160+ hectáreas · agricultura regenerativa</span>
            </div>
            <div>
              <span className="contact-meta-label">Productos</span>
              <span>Granada ecológica · Mandarina Nadorcott · Oliva Manzanilla</span>
            </div>
          </Reveal>
        </div>

        <Reveal as="form" delay={2} className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <div className="contact-field">
              <label htmlFor="name">Nombre</label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </div>
            <div className="contact-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="subject">Asunto</label>
            <input id="subject" name="subject" type="text" placeholder="Ej. Distribución de granada ecológica" />
          </div>

          <div className="contact-field">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="5" required />
          </div>

          <button type="submit" className="btn btn-primary contact-submit" disabled={status === "sending"}>
            {status === "sending" ? "Enviando…" : "Enviar mensaje"}
          </button>

          {status === "success" && (
            <p className="contact-status contact-status--ok">
              Gracias, hemos recibido tu mensaje. Te responderemos pronto.
            </p>
          )}
          {status === "error" && (
            <p className="contact-status contact-status--error">
              No se ha podido enviar el mensaje. Vuelve a intentarlo o escríbenos
              directamente a nuestro email.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
