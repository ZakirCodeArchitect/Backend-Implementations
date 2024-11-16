import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple interface
interface Message {
  text: string;
  author: string;
}

// GET endpoint
app.get('/', (req: Request, res: Response) => {
  const message: Message = {
    text: 'Hello, TypeScript with Express!',
    author: 'Your Name',
  };
  res.json(message);
});

// Define a User interface
interface User {
    id: number;
    name: string;
  }
  
  // Mock user data
  const users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  // Simulate an asynchronous database call
const getUserById = (id: number): Promise<User | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find((u) => u.id === id);
        resolve(user);
      }, 500); // Simulate delay
    });
  };
  
// Update the route to use async/await
app.get('/users/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
      const user = await getUserById(id);
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).send(`User with ID ${id} not found.`);
      }
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});