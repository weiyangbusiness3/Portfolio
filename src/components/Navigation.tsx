import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, User, Briefcase, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'nav.home', href: '/', icon: User },
    { name: 'nav.projects', href: '/projects', icon: Briefcase },
    { name: 'nav.contact', href: '/contact', icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary-900 hover:text-primary-700 transition-colors"
          >
            <Code className="h-8 w-8" />
            <span className="text-xl font-bold">{t('brand')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-900 bg-primary-100'
                      : 'text-gray-700 hover:text-primary-900 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t(item.name)}</span>
                </Link>
              );
            })}
            <select
              value={i18n.language}
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
                localStorage.setItem('lang', e.target.value);
              }}
              className="px-3 py-2 rounded-md text-sm border border-gray-300 bg-white"
            >
              <option value="en">EN</option>
              <option value="zh">中文</option>
              <option value="ms">BM</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-900 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-900 bg-primary-100'
                      : 'text-gray-700 hover:text-primary-900 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{t(item.name)}</span>
                </Link>
              );
            })}
            <div className="px-3 py-2">
              <select
                value={i18n.language}
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                  localStorage.setItem('lang', e.target.value);
                }}
                className="w-full px-3 py-2 rounded-md text-sm border border-gray-300 bg-white"
              >
                <option value="en">EN</option>
                <option value="zh">中文</option>
                <option value="ms">BM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
