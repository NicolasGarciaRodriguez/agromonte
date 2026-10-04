import { useState } from "react";
import Reveal from "./Reveal.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./ContactForm.css";

// Formspree (https://formspree.io) permite recibir este formulario por email
// sin necesidad de servidor propio. Crea una cuenta gratuita, copia el ID de
// tu formulario (p. ej. "xseniAjl") y colócalo en el archivo .env como
// VITE_FORMSPREE_ID, o sustitúyelo aquí directamente.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || "YOUR_FORM_ID";
const ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

export default function ContactForm() {
  const { t } = useLanguage();
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
          <Reveal as="p" className="eyebrow">{t.contact.eyebrow}</Reveal>
          <Reveal as="h2" delay={1} className="contact-title">
            {t.contact.title}
          </Reveal>
          <Reveal as="p" delay={2} className="contact-text">
            {t.contact.text}
          </Reveal>
          <Reveal delay={3} className="contact-meta">
            <div>
              <span className="contact-meta-label">{t.contact.metaExplotacionLabel}</span>
              <span>{t.contact.metaExplotacionValue}</span>
            </div>
            <div>
              <span className="contact-meta-label">{t.contact.metaProductosLabel}</span>
              <span>{t.contact.metaProductosValue}</span>
            </div>
          </Reveal>
        </div>

        <Reveal as="form" delay={2} className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-row">
            <div className="contact-field">
              <label htmlFor="name">{t.contact.formName}</label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </div>
            <div className="contact-field">
              <label htmlFor="email">{t.contact.formEmail}</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="subject">{t.contact.formSubject}</label>
            <input id="subject" name="subject" type="text" placeholder={t.contact.formSubjectPlaceholder} />
          </div>

          <div className="contact-field">
            <label htmlFor="message">{t.contact.formMessage}</label>
            <textarea id="message" name="message" rows="5" required />
          </div>

          <button type="submit" className="btn btn-primary contact-submit" disabled={status === "sending"}>
            {status === "sending" ? t.contact.submitSending : t.contact.submitIdle}
          </button>

          {status === "success" && (
            <p className="contact-status contact-status--ok">{t.contact.statusOk}</p>
          )}
          {status === "error" && (
            <p className="contact-status contact-status--error">{t.contact.statusError}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
