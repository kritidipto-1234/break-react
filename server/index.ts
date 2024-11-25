import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simulate database
let posts = [
  { id: 1, title: 'First Post', content: 'This is the first post', likes: 5 },
  { id: 2, title: 'Second Post', content: 'This is the second post', likes: 10 },
  { id: 3, title: 'Third Post', content: 'This is the third post', likes: 15 },
];

// Utility functions
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const shouldFail = () => Math.random() < 0.099; // 10% chance of failure

// API Routes
app.get('/api/hello', async (req, res) => {
  await delay(2000); // Simulate network delay
  
  if (Math.random() < 0.1) {
    // return res.status(500).json({ message: 'Random server error occurred' });
  }
  
  res.json({ message: 'Hello from the server!' });
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  await delay(1300); // Simulate network delay
  
  if (shouldFail()) {
    return res.status(500).json({ error: 'Random server error occurred' });
  }
  
  res.json(posts);
});

// Get single post
app.get('/api/posts/:id', async (req, res) => {
  await delay(500);
  
  const post = posts.find(p => p.id === parseInt(req.params.id));
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  res.json(post);
});

// Create post
app.post('/api/posts', async (req, res) => {
  await delay(1500);
  
  const { title, content } = req.body;
  if (title.toLowerCase().includes('err')) {
    return res.status(400).json({ error: 'Title cannot contain "err"' });
  }
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    likes: 0
  };
  
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update post likes
app.patch('/api/posts/:id/like', async (req, res) => {
  await delay(300);
  
  const post = posts.find(p => p.id === parseInt(req.params.id));
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  post.likes += 1;
  res.json(post);
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  await delay(800);
  
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Search posts
app.get('/api/posts/search', async (req, res) => {
  await delay(600);
  
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  const searchResults = posts.filter(post => 
    post.title.toLowerCase().includes(String(query).toLowerCase()) ||
    post.content.toLowerCase().includes(String(query).toLowerCase())
  );
  
  res.json(searchResults);
});

// Serve static files from the dist directory after build
app.use(express.static(join(__dirname, '../dist')));

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the API at http://localhost:${PORT}/api/posts`);
});
