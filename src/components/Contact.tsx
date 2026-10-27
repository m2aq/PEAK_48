import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { contact } from "../content/companyContent";
import Magnetic from "./Magnetic";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-h, .contact-p, .field", { y: 40, opacity: 0, stagger: 0.08, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(f.get("name") ?? "").trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(f.get("email") ?? ""))) next.email = "Please enter a valid email address.";
    if (String(f.get("message") ?? "").trim().length < 10) next.message = "Please tell us a little about your project (10+ characters).";
    setErrors(next);
    // Demo mode: nothing is sent anywhere.
    setValidated(Object.keys(next).length === 0);
  }

  return (
    <section ref={root} id="contact" className="section dark contact">
      <div className="wrap contact-grid">
        <div>
          <p className="label mono">{contact.label}</p>
          <h2 className="contact-h display big">{contact.heading}</h2>
          <p className="contact-p lead">{contact.text}</p>
        </div>
        <form onSubmit={onSubmit} noValidate aria-describedby="demo-note">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
            {errors.name && <span id="e-name" className="err" role="alert">{errors.name}</span>}
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
            {errors.email && <span id="e-email" className="err" role="alert">{errors.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="message">Project details</label>
            <textarea id="message" name="message" rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} />
            {errors.message && <span id="e-message" className="err" role="alert">{errors.message}</span>}
          </div>
          <Magnetic type="submit">Send inquiry</Magnetic>
          <p id="demo-note" className="note mono" role="status">
            {validated ? "Form is valid — but nothing was sent. " : ""}
            {contact.demoNotice}
          </p>
        </form>
      </div>
    </section>
  );
}
