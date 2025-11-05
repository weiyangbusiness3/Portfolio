import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Calendar, Clock, Code, Eye, X } from 'lucide-react';
import { Project } from '../types';
import projectsData from '../data/projects.json';
import { useTranslation } from 'react-i18next';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const project: Project | undefined = projectsData.find(p => p.id === parseInt(id || ''));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('project_details.not_found_title')}</h1>
          <p className="text-gray-600 mb-8">{t('project_details.not_found_desc')}</p>
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t('project_details.back_to_projects')}
          </Link>
        </div>
      </div>
    );
  }

  const nextProject = projectsData.find(p => p.id === project.id + 1);
  const prevProject = projectsData.find(p => p.id === project.id - 1);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/projects"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                {t('project_details.back_to_projects')}
              </Link>
              
              <div className="flex items-center space-x-4">
                {prevProject && (
                  <Link
                    to={`/projects/${prevProject.id}`}
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:border-primary-300 transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('shared.previous', 'Previous')}
                  </Link>
                )}
                {nextProject && (
                  <Link
                    to={`/projects/${nextProject.id}`}
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:border-primary-300 transition-colors"
                  >
                    {t('shared.next', 'Next')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>

            {/* Project Header */}
            <div className="text-center mb-12">
              <div className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {project.category}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {project.title_i18n?.[i18n.language as 'en' | 'zh' | 'ms'] ?? project.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {project.description_i18n?.[i18n.language as 'en' | 'zh' | 'ms'] ?? project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {t('project_details.gallery_title', 'Project Gallery')}
            </h2>
            
            {/* Main Image */}
            <div className="mb-8">
              <div 
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(currentImageIndex)}
              >
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${(project.title_i18n?.[i18n.language as 'en' | 'zh' | 'ms'] ?? project.title)} - Image ${currentImageIndex + 1}`}
                  className="w-full h-[28rem] md:h-[34rem] object-contain bg-gray-100"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'ring-4 ring-primary-500 scale-105'
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${(project.title_i18n?.[i18n.language as 'en' | 'zh' | 'ms'] ?? project.title)} - Thumbnail ${index + 1}`}
                    className="w-full h-28 object-contain bg-gray-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('project_details.overview_title', 'Project Overview')}
                </h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('project_details.key_features', 'Key Features')}
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <Code className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t('project_details.feature_1', 'Modern, responsive design with mobile-first approach')}</span>
                      </li>
                      <li className="flex items-start">
                        <Code className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t('project_details.feature_2', 'Optimized performance and user experience')}</span>
                      </li>
                      <li className="flex items-start">
                        <Code className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t('project_details.feature_3', 'Scalable architecture and clean code practices')}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">
                      {t('project_details.technologies_used', 'Technologies Used')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('project_details.information_title', 'Project Information')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{t('project_details.duration', 'Duration')}</span>
                    </div>
                    <span className="font-medium text-gray-900">{project.duration}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{t('project_details.category', 'Category')}</span>
                    </div>
                    <span className="font-medium text-gray-900">{project.category}</span>
                  </div>

                  {project.link && (
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div className="flex items-center text-gray-600">
                        <ExternalLink className="h-5 w-5 mr-2" />
                        <span>{t('project_details.live_demo')}</span>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {t('project_details.view_live')}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center text-gray-600">
                      <Github className="h-5 w-5 mr-2" />
                      <span>{t('project_details.source_code')}</span>
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {t('project_details.view_github')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl w-full px-4">
            <button
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative bg-white rounded-2xl overflow-hidden">
              <img src={project.images[currentImageIndex]} alt={`${project.title} - Image ${currentImageIndex + 1}`} className="w-full h-[80vh] object-contain bg-white" />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow"
                  onClick={prevImage}
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <button
                  className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow"
                  onClick={nextImage}
                >
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;