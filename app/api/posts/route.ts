import { NextResponse } from 'next/server';

// Mock data for posts
const posts = [
  {
    id: 1,
    userId: 1,
    content: 'Just launched my new website! Check it out and let me know what you think. #webdev #coding',
    image: '/images/posts/post1.svg',
    timestamp: new Date('2025-03-28T08:30:00').toISOString(),
    comments: [
      { id: 1, userId: 2, content: 'Looks amazing! Love the design.', timestamp: new Date('2025-03-28T08:45:00').toISOString() },
      { id: 2, userId: 3, content: 'Great work! The UI is so clean.', timestamp: new Date('2025-03-28T09:00:00').toISOString() },
      { id: 3, userId: 4, content: 'What tech stack did you use?', timestamp: new Date('2025-03-28T09:15:00').toISOString() }
    ],
    likes: 15
  },
  {
    id: 2,
    userId: 2,
    content: 'Beautiful sunset at the beach today. Nature is truly amazing! #sunset #beach #nature',
    image: '/images/posts/post2.svg',
    timestamp: new Date('2025-03-28T07:00:00').toISOString(),
    comments: [
      { id: 4, userId: 1, content: 'Wow, that looks incredible!', timestamp: new Date('2025-03-28T07:15:00').toISOString() },
      { id: 5, userId: 5, content: 'I wish I was there!', timestamp: new Date('2025-03-28T07:30:00').toISOString() },
      { id: 6, userId: 6, content: 'What beach is this?', timestamp: new Date('2025-03-28T07:45:00').toISOString() },
      { id: 7, userId: 7, content: 'The colors are stunning!', timestamp: new Date('2025-03-28T08:00:00').toISOString() },
      { id: 8, userId: 3, content: 'Perfect shot!', timestamp: new Date('2025-03-28T08:15:00').toISOString() }
    ],
    likes: 42
  },
  {
    id: 3,
    userId: 3,
    content: 'Just finished reading this amazing book. Highly recommend! #reading #books',
    image: '/images/posts/post3.svg',
    timestamp: new Date('2025-03-28T06:00:00').toISOString(),
    comments: [
      { id: 9, userId: 1, content: "What's it about?", timestamp: new Date('2025-03-28T06:15:00').toISOString() },
      { id: 10, userId: 2, content: 'I loved that one too!', timestamp: new Date('2025-03-28T06:30:00').toISOString() }
    ],
    likes: 23
  },
  {
    id: 4,
    userId: 4,
    content: 'New personal record on my morning run! #fitness #running',
    image: '/images/posts/post4.svg',
    timestamp: new Date('2025-03-28T05:00:00').toISOString(),
    comments: [
      { id: 11, userId: 5, content: 'Congrats! What was your time?', timestamp: new Date('2025-03-28T05:15:00').toISOString() },
      { id: 12, userId: 6, content: "That's awesome! Keep it up!", timestamp: new Date('2025-03-28T05:30:00').toISOString() },
      { id: 13, userId: 7, content: "You're inspiring me to start running again!", timestamp: new Date('2025-03-28T05:45:00').toISOString() },
      { id: 14, userId: 1, content: 'What app do you use to track your runs?', timestamp: new Date('2025-03-28T06:00:00').toISOString() },
      { id: 15, userId: 2, content: 'Morning runs are the best!', timestamp: new Date('2025-03-28T06:15:00').toISOString() }
    ],
    likes: 18
  },
  {
    id: 5,
    userId: 5,
    content: 'Made this delicious pasta dish for dinner tonight. Recipe in comments! #cooking #food',
    image: '/images/posts/post5.svg',
    timestamp: new Date('2025-03-28T04:00:00').toISOString(),
    comments: [
      { id: 16, userId: 1, content: "Looks delicious! Can't wait to try the recipe.", timestamp: new Date('2025-03-28T04:15:00').toISOString() },
      { id: 17, userId: 2, content: "I'm getting hungry just looking at this!", timestamp: new Date('2025-03-28T04:30:00').toISOString() },
      { id: 18, userId: 3, content: 'What kind of pasta did you use?', timestamp: new Date('2025-03-28T04:45:00').toISOString() },
      { id: 19, userId: 4, content: 'I made something similar last week!', timestamp: new Date('2025-03-28T05:00:00').toISOString() },
      { id: 20, userId: 6, content: 'Is this gluten-free?', timestamp: new Date('2025-03-28T05:15:00').toISOString() }
    ],
    likes: 31
  }
];

export async function GET() {
  // Sort posts by timestamp in descending order (newest first)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  return NextResponse.json(sortedPosts);
}
