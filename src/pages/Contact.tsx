import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import contactData from '../data/contact.json';
import { ContactFormData } from '../types';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const { t } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await emailjs.send(
        contactData.emailjs.serviceId,
        contactData.emailjs.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: contactData.email,
          to_name: 'Portfolio Owner'
        },
        contactData.emailjs.publicKey
      );

      if (result.text === 'OK') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t('contact.hero_title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('contact.hero_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {t('contact.title')}
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {t('contact.desc')}
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-primary-100 p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('contact.email')}</h3>
                      <a 
                        href={`mailto:${contactData.email}`}
                        className="text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {contactData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-primary-100 p-3 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('contact.phone')}</h3>
                      <a 
                        href={`tel:${contactData.phone}`}
                        className="text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {contactData.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-primary-100 p-3 rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('contact.location')}</h3>
                      <p className="text-gray-600">{contactData.location}</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">{t('contact.follow')}</h3>
                  <div className="flex space-x-4">
                    <a
                      href={contactData.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 p-3 rounded-lg hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={contactData.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 p-3 rounded-lg hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>

                    <a
                      href={contactData.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 p-3 rounded-lg hover:bg-primary-100 hover:text-primary-600 transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={t('contact.form.name_placeholder')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={t('contact.form.email_placeholder')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={t('contact.form.subject_placeholder')}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      rows={6}
                      placeholder={t('contact.form.message_placeholder')}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                  </button>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <div className="mt-4 flex items-center text-green-600">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>Message sent successfully!</span>
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="mt-4 flex items-center text-red-600">
                      <AlertCircle className="mr-2 h-5 w-5" />
                      <span>Failed to send message. Please try again.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;