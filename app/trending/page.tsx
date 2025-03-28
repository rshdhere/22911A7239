"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

export default function TrendingPosts() {
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch trending posts
        const postsResponse = await fetch("/api/trending");
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch trending posts");
        }
        const postsData = await postsResponse.json();
        setTrendingPosts(postsData);
        
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trending Posts</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Posts with the highest number of comments
        </p>
        
        {trendingPosts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No trending posts found.</p>
        ) : (
          <div className="space-y-8">
            {trendingPosts.map((post) => {
              const user = users[post.userId];
              return (
                <div key={post.id} className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-lg p-6 shadow-md border border-indigo-100 dark:border-indigo-800">
                  <div className="flex items-center mb-4">
                    {user && (
                      <>
                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3 ring-2 ring-indigo-500">
                          <Image 
                            src={user.avatar} 
                            alt={user.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">{user.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.username}</p>
                        </div>
                      </>
                    )}
                    <div className="ml-auto flex items-center bg-indigo-100 dark:bg-indigo-800 px-3 py-1 rounded-full">
                      <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-indigo-600 dark:text-indigo-300">{post.comments.length}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 dark:text-gray-200 mb-4 text-lg">{post.content}</p>
                  
                  <div className="relative h-80 w-full rounded-lg overflow-hidden mb-6">
                    <Image 
                      src={post.image} 
                      alt="Post image" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-6">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <svg className="h-5 w-5 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span>{post.likes} likes</span>
                    </div>
                    
                    <span className="text-gray-500 dark:text-gray-400">
                      {formatDate(post.timestamp)}
                    </span>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <svg className="h-5 w-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                      Comments
                    </h4>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {post.comments.map((comment) => {
                        const commentUser = users[comment.userId];
                        return (
                          <div key={comment.id} className="flex items-start border-b border-gray-100 dark:border-gray-700 pb-4">
                            {commentUser && (
                              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                                <Image 
                                  src={commentUser.avatar} 
                                  alt={commentUser.name} 
                                  fill 
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                {commentUser && (
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {commentUser.name}
                                  </span>
                                )}
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(comment.timestamp)}
                                </span>
                              </div>
                              <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
