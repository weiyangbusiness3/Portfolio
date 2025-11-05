export interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  category: string;
  technologies: string[];
  duration: string;
  link: string;
  github: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  emailjs: {
    serviceId: string;
    templateId: string;
    publicKey: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}