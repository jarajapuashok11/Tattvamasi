export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'shots' | 'powders';
  description: string;
  short_description: string;
  price: number;
  compare_price: number | null;
  image_url: string;
  images: string[];
  benefits: string[];
  ingredients: string;
  usage_instructions: string;
  nutrition: Record<string, string | number>;
  in_stock: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image_url: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  published: boolean;
  read_time: number;
  created_at: string;
}
