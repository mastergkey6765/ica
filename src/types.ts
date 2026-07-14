export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  outcomes: string[];
  certification: boolean;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'Guide' | 'Podcast';
  image: string;
  readTime?: string;
}
