import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, Github, Calendar, Clock, Code, Eye, X } from 'lucide-react';
import { Project } from '../types';
import projectsData from '../data/projects.json';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const project: Project | undefined = projectsData.find(p => p.id === parseInt(id || ''));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Projects
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
                Back to Projects
              </Link>
              
              <div className="flex items-center space-x-4">
                {prevProject && (
                  <Link
                    to={`/projects/${prevProject.id}`}
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:border-primary-300 transition-colors"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Link>
                )}
                {nextProject && (
                  <Link
                    to={`/projects/${nextProject.id}`}
                    className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:border-primary-300 transition-colors"
                  >
                    Next
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
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {project.description}
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
              Project Gallery
            </h2>
            
            {/* Main Image */}
            <div className="mb-8">
              <div 
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(currentImageIndex)}
              >
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover"
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
                    alt={`${project.title} - Thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover"
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
                  Project Overview
                </h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <Code className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Modern, responsive design with mobile-first approach</span>
                      </li>
                      <li className="flex items-start">
                        <Code className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Optimized performance and user experience</span>
                      </li>
                      <li className="flex items-start">
                        <Code className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Scalable architecture and clean code practices</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">
                      Technologies Used
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
                  Project Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>Duration</span>
                    </div>
                    <span className="font-medium text-gray-900">{project.duration}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>Category</span>
                    </div>
                    <span className="font-medium text-gray-900">{project.category}</span>
                  </div>

                  {project.link && (
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div className="flex items-center text-gray-600">
                        <ExternalLink className="h-5 w-5 mr-2" />
                        <span>Live Demo</span>
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        View Live Site
                      </a>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center text-gray-600">
                      <Github className="h-5 w-5 mr-2" />
                      <span>Source Code</span>
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="h-8 w-8" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ArrowLeft className="h-8 w-8" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ArrowRight className="h-8 w-8" />
          </button>

          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} - Full Size ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="text-sm">
              {currentImageIndex + 1} of {project.images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;