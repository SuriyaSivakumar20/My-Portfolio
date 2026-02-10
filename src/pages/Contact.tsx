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

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'suriyasivakumar08@gmail.com',
      link: 'mailto:suriyasivakumar08@gmail.com'
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      value: '+91 9176234640',
      link: 'tel:+919176234640'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Pondicherry, Puducherry, India',
      link: 'https://maps.google.com/?q=Chennai,Tamil+Nadu,India'
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
              <motion.div
                className="glass-card p-8"
                variants={itemVariants}
              >
                {submitSuccess ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={32} />
                    </div>
                    <h3 className="text-2xl font-bold font-poppins mb-2">Message Sent!</h3>
                    <p className="text-white/80">
                      Thank you for reaching out. I'll get back to you as soon as possible!
                    </p>
                  </motion.div>
                ) : (
                  <form method='post' action='https://formspree.io/f/xaqqrlbb'>
                    <div className="mb-6">
                      <label htmlFor="name" className="block mb-2 text-white/90">
                        Name
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-3 bg-dark-lighter rounded-lg ${errors.name ? 'border-error focus:border-error' : 'border-transparent'
                          }`}
                        placeholder="Your name"
                        whileFocus={{ borderColor: '#E50914', boxShadow: '0 0 0 2px rgba(229, 9, 20, 0.4)' }}
                      />
                      {errors.name && (
                        <p className="mt-1 text-error text-sm">{errors.name}</p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="email" className="block mb-2 text-white/90">
                        Email
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 bg-dark-lighter rounded-lg ${errors.email ? 'border-error focus:border-error' : 'border-transparent'
                          }`}
                        placeholder="Your email"
                        whileFocus={{ borderColor: '#E50914', boxShadow: '0 0 0 2px rgba(229, 9, 20, 0.4)' }}
                      />
                      {errors.email && (
                        <p className="mt-1 text-error text-sm">{errors.email}</p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="subject" className="block mb-2 text-white/90">
                        Subject
                      </label>
                      <motion.input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full p-3 bg-dark-lighter rounded-lg ${errors.subject ? 'border-error focus:border-error' : 'border-transparent'
                          }`}
                        placeholder="Subject of your message"
                        whileFocus={{ borderColor: '#E50914', boxShadow: '0 0 0 2px rgba(229, 9, 20, 0.4)' }}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-error text-sm">{errors.subject}</p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block mb-2 text-white/90">
                        Message
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full p-3 bg-dark-lighter rounded-lg ${errors.message ? 'border-error focus:border-error' : 'border-transparent'
                          }`}
                        placeholder="Your message"
                        whileFocus={{ borderColor: '#E50914', boxShadow: '0 0 0 2px rgba(229, 9, 20, 0.4)' }}
                      />
                      {errors.message && (
                        <p className="mt-1 text-error text-sm">{errors.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      className="primary-button w-full flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
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
              <motion.div
                className="glass-card p-8 h-full flex flex-col"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-bold font-poppins mb-8">Get In Touch</h3>

                <div className="space-y-8 mb-8">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="mt-1 text-secondary group-hover:text-primary transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-1">{info.title}</h4>
                        <p className="text-white/70 group-hover:text-white transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto">
                  <h4 className="text-lg font-medium mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    {[
                      { name: 'GitHub', url: 'https://github.com/SuriyaSivakumar20' },
                      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/suriya-sivakumar-483735258/' },
                      { name: 'Instagram', url: 'https://www.instagram.com/iam.suriyaa._/' }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-dark-lighter flex items-center justify-center text-white/80 hover:text-secondary transition-colors"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: 'rgba(229, 9, 20, 0.8)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.name.charAt(0)}
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