"use client";

// because every component is a react server component we need to add "use client" to make it a client component

import { useState, useEffect } from "react";
import Image from "next/image";

type User = {
  id: number;
  name: string;
  username: string;
  postCount: number;
  avatar: string;
};

export default function TopUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users");
        
        if (!response.ok) {
          throw new Error("Failed to fetch top users");
        }
        
        const data = await response.json();
        // Get top 5 users by post count
        const topUsers = data.slice(0, 5);
        setUsers(topUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopUsers();
  }, []);

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Users</h1>
        
        {users.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <div key={user.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-indigo-500 ring-opacity-50">
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                <div className="absolute -mt-4 -ml-4 bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-2">{user.username}</p>
                
                <div className="mt-4 flex items-center">
                  <svg className="h-5 w-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <span className="font-medium">{user.postCount} posts</span>
                </div>
                
                <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
