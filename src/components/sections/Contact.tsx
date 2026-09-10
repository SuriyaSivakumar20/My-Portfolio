import { useState } from 'react';
import TextReveal from '../../lib/anim/TextReveal';
import Reveal from '../../lib/anim/Reveal';
import { profile, links } from '../../data/content';
import Footer from './Footer';

const CHANNELS = [
  { label: 'EMAIL', value: links.emailRaw, href: links.email },
  { label: 'PHONE', value: links.telRaw, href: links.tel },
  { label: 'LOCATION', value: 'Pondicherry, Puducherry, India', href: links.map },
];

const SOCIALS = [
  { name: 'GitHub', handle: 'SuriyaSivakumar20', href: links.github },
  { name: 'LinkedIn', handle: 'suriya-sivakumar', href: links.linkedin },
  { name: 'Instagram', handle: 'iam.suriyaa._', href: links.instagram },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      if (!e[k]) return e;
      const n = { ...e };
      delete n[k];
      return n;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'name required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'valid email required';
    if (!form.subject.trim()) e.subject = 'subject required';
    if (form.message.trim().length < 10) e.message = 'message must be ≥ 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xaqqrlbb', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(ev.target as HTMLFormElement),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
        window.setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        window.setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClass = (key: string) =>
    `w-full bg-transparent border ${
      errors[key] ? 'border-[#8a5a5a]' : 'border-[#1c232c]'
    } px-4 py-3 font-mono text-[13px] text-[var(--ink-strong)] placeholder:text-[#3d454f] outline-none transition-colors focus:border-[var(--accent)]`;

  return (
    <section id="contact" data-section className="relative pt-28 md:pt-40 pb-0">
      <div className="px-5 sm:px-10">
        <div className="flex items-baseline justify-between mb-14">
          <Reveal y={14}>
            <div className="os-label">
              <span style={{ color: 'var(--accent)' }}>08</span> / CONTACT — UPLINK
            </div>
          </Reveal>
          <Reveal y={14} delay={80}>
            <div className="os-label hidden sm:block" style={{ opacity: 0.5 }}>
              {profile.available ? '● CHANNEL OPEN' : '● CHANNEL BUSY'}
            </div>
          </Reveal>
        </div>

        {/* Big CTA */}
        <h2 className="os-heading text-[clamp(40px,9.6vw,132px)] max-w-6xl leading-[0.95]">
          <TextReveal as="span" text="LET'S" stagger={20} duration={500} delay={120} />
          <br />
          <TextReveal as="span" text="BUILD" className="text-[var(--accent)]" stagger={20} duration={500} delay={360} />
          <br />
          <TextReveal as="span" text="SOMETHING." stagger={22} duration={500} delay={600} />
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-16 md:mt-24">
          {/* Form */}
          <Reveal delay={140} y={26}>
            <div className="border border-[#161c24] bg-[var(--surface)]/40">
              <div className="px-5 py-3.5 border-b border-[#161c24] flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.12em] text-[var(--ink-muted)]">
                  $ ./uplink --to suriya
                </span>
                <span className="os-label" style={{ fontSize: 10 }}>FORM</span>
              </div>

              {status === 'sent' ? (
                <div className="px-6 py-16 text-center">
                  <div className="font-mono text-[14px] text-[var(--ok)] mb-3">▸ TRANSMISSION RECEIVED</div>
                  <p className="text-[13px] text-[var(--ink-muted)]">
                    Thanks for reaching out — I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="p-5 sm:p-6 space-y-4" noValidate>
                  <div>
                    <label htmlFor="cf-name" className="os-label mb-2 block" style={{ fontSize: 10 }}>NAME</label>
                    <input id="cf-name" name="name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass('name')} placeholder="your name" autoComplete="name" />
                    {errors.name && <p className="font-mono text-[10px] text-[#c07a7a] mt-1.5">✕ {errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="os-label mb-2 block" style={{ fontSize: 10 }}>EMAIL</label>
                    <input id="cf-email" name="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass('email')} placeholder="you@company.com" autoComplete="email" />
                    {errors.email && <p className="font-mono text-[10px] text-[#c07a7a] mt-1.5">✕ {errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="cf-subject" className="os-label mb-2 block" style={{ fontSize: 10 }}>SUBJECT</label>
                    <input id="cf-subject" name="subject" type="text" value={form.subject} onChange={(e) => update('subject', e.target.value)} className={inputClass('subject')} placeholder="subject of your message" />
                    {errors.subject && <p className="font-mono text-[10px] text-[#c07a7a] mt-1.5">✕ {errors.subject}</p>}
                  </div>
                  <div>
                    <label htmlFor="cf-message" className="os-label mb-2 block" style={{ fontSize: 10 }}>MESSAGE</label>
                    <textarea id="cf-message" name="message" rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} className={`${inputClass('message')} resize-y`} placeholder="what should we build together?" />
                    {errors.message && <p className="font-mono text-[10px] text-[#c07a7a] mt-1.5">✕ {errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-3 border border-[var(--accent-line)] bg-[var(--accent-soft)] px-5 py-3.5 font-mono text-[12px] tracking-[0.16em] uppercase text-[var(--accent)] hover:bg-[rgba(99,211,242,0.18)] disabled:opacity-60 transition-colors"
                  >
                    {status === 'sending' ? 'TRANSMITTING…' : '▸ SEND MESSAGE'}
                  </button>
                  {status === 'error' && (
                    <p className="font-mono text-[11px] text-[#c07a7a]">✕ Uplink failed. Please try again or email {links.emailRaw}.</p>
                  )}
                </form>
              )}
            </div>
          </Reveal>

          {/* Channels */}
          <Reveal delay={240} y={26}>
            <div className="space-y-4">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="group flex items-center justify-between border border-[#161c24] bg-[var(--surface)]/40 px-5 py-4 hover:border-[var(--accent-line)] hover:bg-[var(--surface-3)]/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="os-label" style={{ fontSize: 10, color: 'var(--accent)' }}>{c.label}</span>
                    <span className="font-mono text-[13px] text-[var(--ink)] group-hover:text-[var(--ink-strong)] transition-colors">
                      {c.value}
                    </span>
                  </div>
                  <span className="text-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              ))}

              <div className="pt-2">
                <div className="os-label mb-3" style={{ fontSize: 10, opacity: 0.6 }}>CHANNELS / SOCIAL</div>
                <div className="space-y-1">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="group flex items-center justify-between border-b border-[#131920] py-2.5"
                    >
                      <span className="font-mono text-[13px] text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                        {s.name}
                      </span>
                      <span className="os-label" style={{ fontSize: 9.5, opacity: 0.45 }}>@{s.handle} ↗</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="border border-[#161c24] bg-[var(--surface)]/40 px-5 py-4">
                <p className="font-mono text-[12px] leading-[1.8] text-[var(--ink-muted)]">
                  <span className="text-[var(--accent)]">▸</span> Currently open to freelance collaborations and software engineering roles.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </section>
  );
}