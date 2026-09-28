import { FormEvent, useRef, useState } from 'react';
import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';
import { contact } from '../../data/manga';
import { links } from '../../data/content';
import { useReveal } from '../../lib/manga/hooks';

type Status = 'idle' | 'opening' | 'error';

/**
 * The real contact form. There is no backend on this site, so submitting
 * composes a mailto: to the address published in the CV and hands it to the
 * visitor's mail client — honest, and it actually sends.
 */
export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);
  useReveal(formRef);
  useReveal(extraRef);

  const [status, setStatus] = useState<Status>('idle');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email || !message) {
      setStatus('error');
      return;
    }

    const body = [
      message,
      '',
      '—',
      `From: ${name}`,
      `Reply to: ${email}`,
    ].join('\n');

    const href = `mailto:${links.emailRaw}?subject=${encodeURIComponent(
      subject || `Portfolio enquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = href;
      setStatus('opening');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <SectionShell
      id="contact"
      art={{
        src: '/art/art-contact.webp',
        alt: 'Manga illustration of Suriya at a desk, writing at the workspace',
      }}
    >
      <SectionHeader
        n="06"
        kicker="Get in touch"
        title="Contact"
        accentLast
        aside={<>{contact.intro[0]}</>}
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_264px]">
        <form ref={formRef} onSubmit={onSubmit} noValidate data-reveal className="min-w-0">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="field">
              <span className="label label--ink">Your name</span>
              <input
                className="field__input mt-2"
                type="text"
                name="name"
                placeholder="How should I address you?"
                autoComplete="name"
                required
              />
            </label>

            <label className="field">
              <span className="label label--ink">Your email</span>
              <input
                className="field__input mt-2"
                type="email"
                name="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <label className="field mt-6 block">
            <span className="label label--ink">Subject</span>
            <input
              className="field__input mt-2"
              type="text"
              name="subject"
              placeholder="What is this about?"
            />
          </label>

          <label className="field mt-6 block">
            <span className="label label--ink">Your message</span>
            <textarea
              className="field__input mt-2 resize-y min-h-[132px]"
              name="message"
              placeholder="Tell me about the idea, the role or the collaboration…"
              rows={5}
              required
            />
          </label>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <button className="btn btn--primary" type="submit">
              <span>{contact.button}</span>
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </button>

            <p className="label" role="status" aria-live="polite">
              {status === 'opening'
                ? 'Opening your mail client…'
                : status === 'error'
                  ? 'Name, email and message are required.'
                  : 'Opens your mail app, addressed to me.'}
            </p>
          </div>

          <hr className="rule rule--accent rule--short mt-8" />
        </form>

        <div ref={extraRef} data-reveal className="min-w-0">
          <div className="panel p-5 pt-8">
            <span className="panel__tab panel__tab--accent">
              <span className="tnum">06</span>
            </span>

            <p className="label label--ink">Open to</p>
            <hr className="rule mt-3 mb-4" />
            <ul className="grid gap-2.5">
              {contact.aside.map((a) => (
                <li key={a} className="body-copy text-[0.86rem]">
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid gap-px bg-[var(--rule-strong)] border border-[var(--rule-strong)]">
            {contact.channels.map((c) => (
              <a
                key={c.label}
                className="group flex flex-col gap-1 min-w-0 bg-[var(--paper)] px-4 py-3 transition-colors hover:bg-[var(--ink)]"
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer noopener"
              >
                <span className="label label--accent group-hover:text-[var(--accent-dark)]">
                  {c.label}
                </span>
                <span className="min-w-0 text-[0.8rem] font-semibold tracking-[0.03em] break-all group-hover:text-[var(--paper)]">
                  {c.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
