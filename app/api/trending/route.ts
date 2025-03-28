import { NextResponse } from 'next/server';

// Define post type
type Post = {
  id: number;
  userId: number;
  content: string;
  image: string;
  timestamp: string;
  comments: Array<{
    id: number;
    userId: number;
    content: string;
    timestamp: string;
  }>;
  likes: number;
};

// Reuse the posts data from the posts endpoint
import { GET as getPosts } from '../posts/route';

export async function GET() {
  // Get all posts
  const response = await getPosts();
  const posts = await response.json() as Post[];
  
  // Find the maximum number of comments
  const maxComments = Math.max(...posts.map((post: Post) => post.comments.length));
  
  // Filter posts with the maximum number of comments
  const trendingPosts = posts.filter((post: Post) => post.comments.length === maxComments);
  
  return NextResponse.json(trendingPosts);
}
