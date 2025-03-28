import { NextResponse } from 'next/server';

// Mock data for users
const users = [
  { id: 1, name: 'John Doe', username: '@johndoe', postCount: 42, avatar: '/images/users/avatar1.svg' },
  { id: 2, name: 'Jane Smith', username: '@janesmith', postCount: 38, avatar: '/images/users/avatar2.svg' },
  { id: 3, name: 'Alex Johnson', username: '@alexj', postCount: 35, avatar: '/images/users/avatar3.svg' },
  { id: 4, name: 'Sam Wilson', username: '@samwilson', postCount: 31, avatar: '/images/users/avatar4.svg' },
  { id: 5, name: 'Taylor Swift', username: '@taylorswift', postCount: 29, avatar: '/images/users/avatar5.svg' },
  { id: 6, name: 'Chris Evans', username: '@chrisevans', postCount: 27, avatar: '/images/users/avatar6.svg' },
  { id: 7, name: 'Emma Watson', username: '@emmawatson', postCount: 25, avatar: '/images/users/avatar7.svg' },
];

export async function GET() {
  // Sort users by post count in descending order
  const topUsers = [...users].sort((a, b) => b.postCount - a.postCount);
  
  return NextResponse.json(topUsers);
}
