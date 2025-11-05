import React from 'react';
import { Github, Linkedin, Twitter, Instagram, Mail, Heart } from 'lucide-react';
import contactData from '../data/contact.json';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.brand')}</h3>
            <p className="text-gray-400 mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-4">
              <a
                href={contactData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={contactData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
          
              <a
                href={contactData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.projects')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact.title')}</h4>
            <div className="space-y-2">
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                {contactData.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {t('footer.copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;