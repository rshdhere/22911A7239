"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

type User = {
  id: number;
  name: string;
  username: string;
  postCount: number;
  avatar: string;
};

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch posts and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch posts
        const postsResponse = await fetch("/api/posts");
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);
        
        // Fetch users
        const usersResponse = await fetch("/api/users");
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await usersResponse.json();
        
        // Create a map of users by ID for easy lookup
        const usersMap: Record<number, User> = {};
        usersData.forEach((user: User) => {
          usersMap[user.id] = user;
        });
        setUsers(usersMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Set up polling for real-time updates (every 30 seconds)
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Posts</h1>
        
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => {
              const user = users[post.userId];
              return (
                <div key={post.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-4">
                    {user && (
                      <>
                        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                          <Image 
                            src={user.avatar} 
                            alt={user.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.username}</p>
                        </div>
                      </>
                    )}
                    <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(post.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>
                  
                  <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
                    <Image 
                      src={post.image} 
                      alt="Post image" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span>{post.likes} likes</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="h-5 w-5 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      <span>{post.comments.length} comments</span>
                    </div>
                  </div>
                  
                  {post.comments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Comments</h4>
                      <div className="space-y-3">
                        {post.comments.slice(0, 2).map((comment) => {
                          const commentUser = users[comment.userId];
                          return (
                            <div key={comment.id} className="flex items-start">
                              {commentUser && (
                                <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                                  <Image 
                                    src={commentUser.avatar} 
                                    alt={commentUser.name} 
                                    fill 
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="bg-gray-100 dark:bg-gray-600 rounded-lg p-2 flex-1">
                                {commentUser && (
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {commentUser.name}
                                  </span>
                                )}
                                <p className="text-sm text-gray-800 dark:text-gray-200">{comment.content}</p>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(comment.timestamp)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        
                        {post.comments.length > 2 && (
                          <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                            View all {post.comments.length} comments
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
