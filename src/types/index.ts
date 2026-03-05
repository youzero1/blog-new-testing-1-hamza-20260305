export interface PostData {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  category: string;
  tags?: string;
  featuredImage?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  category: string;
  tags?: string;
  featuredImage?: string;
  published?: boolean;
}

export type UpdatePostInput = Partial<CreatePostInput>;

export const CATEGORIES = [
  'Product Reviews',
  'E-commerce Tips',
  'Industry News',
  'Tutorials',
  'Case Studies',
  'Marketing',
] as const;

export type Category = typeof CATEGORIES[number];
