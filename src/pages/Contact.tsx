import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/common/PageTransition';
import SectionTitle from '../components/common/SectionTitle';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const data = new FormData(e.target as HTMLFormElement);
      fetch('https://formspree.io/f/xaqqrlbb', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
        .then((res) => {
          setIsSubmitting(false);
          if (res.ok) {
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitSuccess(false), 5000);
          } else {
            alert('Oops! Something went wrong. Please try again.');
          }
        })
        .catch(() => {
          setIsSubmitting(false);
          alert('Network error. Please try again.');
        });
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: 'Email',
      value: 'suriyasivakumar08@gmail.com',
      link: 'mailto:suriyasivakumar08@gmail.com'
    },
    {
      icon: <Phone size={20} />,
      title: 'Phone',
      value: '+91 9176234640',
      link: 'tel:+919176234640'
    },
    {
      icon: <MapPin size={20} />,
      title: 'Location',
      value: 'Pondicherry, Puducherry, India',
      link: 'https://maps.google.com/?q=Pondicherry,Puducherry,India'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardStyle = {
    background: '#0a0a0a',
    border: '2px solid rgba(255,255,255,0.2)',
    boxShadow: '5px 5px 0px rgba(255,255,255,0.1)',
    padding: '32px',
  };

  const labelStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '11px',
    color: '#AAAAAA',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: '8px',
  };

  const inputStyle = {
    width: '100%',
    background: '#111111',
    border: '2px solid #333333',
    color: '#FFFFFF',
    padding: '12px 14px',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '13px',
    letterSpacing: '0.04em',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const errorStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '10px',
    color: '#CCCCCC',
    marginTop: '6px',
    letterSpacing: '0.04em',
  };

  return (
    <PageTransition style="slide">
      <div className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Contact Me"
            subtitle="Let's get in touch"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div style={cardStyle} variants={itemVariants}>
                {submitSuccess ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                      style={{ border: '2px solid rgba(255,255,255,0.5)', background: '#1a1a1a' }}
                    >
                      <Send size={28} className="text-white" />
                    </div>
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '13px',
                        color: '#FFFFFF',
                        textShadow: '2px 2px 0px #444',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Message Sent!
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>
                      Thank you for reaching out. I'll get back to you as soon as possible!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Terminal prompt header */}
                    <div
                      className="mb-6 pb-4"
                      style={{ borderBottom: '1px solid #222222' }}
                    >
                      <span
                        style={{
                          fontFamily: "'Share Tech Mono', monospace",
                          fontSize: '11px',
                          color: '#555555',
                          letterSpacing: '0.1em',
                        }}
                      >
                        $ ./send_message.sh --to suriya
                      </span>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="name" style={labelStyle}>▸ Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          ...inputStyle,
                          borderColor: errors.name ? '#AAAAAA' : '#333333',
                        }}
                        placeholder="Your name"
                        onFocus={e => (e.target.style.borderColor = '#FFFFFF')}
                        onBlur={e => (e.target.style.borderColor = errors.name ? '#AAAAAA' : '#333333')}
                      />
                      {errors.name && <p style={errorStyle}>⚠ {errors.name}</p>}
                    </div>

                    <div className="mb-5">
                      <label htmlFor="email" style={labelStyle}>▸ Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          ...inputStyle,
                          borderColor: errors.email ? '#AAAAAA' : '#333333',
                        }}
                        placeholder="Your email"
                        onFocus={e => (e.target.style.borderColor = '#FFFFFF')}
                        onBlur={e => (e.target.style.borderColor = errors.email ? '#AAAAAA' : '#333333')}
                      />
                      {errors.email && <p style={errorStyle}>⚠ {errors.email}</p>}
                    </div>

                    <div className="mb-5">
                      <label htmlFor="subject" style={labelStyle}>▸ Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        style={{
                          ...inputStyle,
                          borderColor: errors.subject ? '#AAAAAA' : '#333333',
                        }}
                        placeholder="Subject of your message"
                        onFocus={e => (e.target.style.borderColor = '#FFFFFF')}
                        onBlur={e => (e.target.style.borderColor = errors.subject ? '#AAAAAA' : '#333333')}
                      />
                      {errors.subject && <p style={errorStyle}>⚠ {errors.subject}</p>}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" style={labelStyle}>▸ Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        style={{
                          ...inputStyle,
                          borderColor: errors.message ? '#AAAAAA' : '#333333',
                          resize: 'vertical',
                        }}
                        placeholder="Your message"
                        onFocus={e => (e.target.style.borderColor = '#FFFFFF')}
                        onBlur={e => (e.target.style.borderColor = errors.message ? '#AAAAAA' : '#333333')}
                      />
                      {errors.message && <p style={errorStyle}>⚠ {errors.message}</p>}
                    </div>

                    <motion.button
                      type="submit"
                      className="primary-button w-full flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div style={{ ...cardStyle, height: '100%', display: 'flex', flexDirection: 'column' }} variants={itemVariants}>
                <h3
                  className="mb-8"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 'clamp(10px, 1.5vw, 13px)',
                    color: '#FFFFFF',
                    textShadow: '2px 2px 0px #333333',
                    letterSpacing: '0.04em',
                  }}
                >
                  Get In Touch
                </h3>

                <div className="space-y-8 mb-8">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                      style={{ textDecoration: 'none' }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <div
                        className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center transition-all duration-200"
                        style={{
                          border: '1px solid rgba(255,255,255,0.3)',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <h4
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '9px',
                            color: '#AAAAAA',
                            marginBottom: '6px',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {info.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: "'Share Tech Mono', monospace",
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.75)',
                            letterSpacing: '0.04em',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto">
                  <h4
                    className="mb-4"
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '9px',
                      color: '#888888',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Follow Me
                  </h4>
                  <div className="flex space-x-3">
                    {[
                      { name: 'GitHub', abbr: 'GH', url: 'https://github.com/SuriyaSivakumar20' },
                      { name: 'LinkedIn', abbr: 'LN', url: 'https://www.linkedin.com/in/suriya-sivakumar-483735258/' },
                      { name: 'Instagram', abbr: 'IG', url: 'https://www.instagram.com/iam.suriyaa._/' }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="w-10 h-10 flex items-center justify-center transition-all duration-150"
                        style={{
                          border: '2px solid rgba(255,255,255,0.3)',
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: '8px',
                          color: 'rgba(255,255,255,0.5)',
                          textDecoration: 'none',
                        }}
                        whileHover={{
                          background: '#FFFFFF',
                          color: '#000000',
                          borderColor: '#FFFFFF',
                          scale: 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.abbr}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;