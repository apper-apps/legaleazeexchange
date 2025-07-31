import { toast } from 'react-toastify';

// Mock user data storage
let users = [
  {
    Id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    telephone: '+1 (555) 123-4567',
    password: 'password123',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    Id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    telephone: '+1 (555) 987-6543',
    password: 'password456',
    createdAt: new Date('2024-02-10').toISOString()
  }
];

let nextId = 3;

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  // Sign in user
  async signIn(email, password) {
    await delay(800);
    
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('User not found with this email address');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // Sign up new user
  async signUp(userData) {
    await delay(1000);
    
    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }
    
    // Create new user
    const newUser = {
      Id: nextId++,
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      email: userData.email.toLowerCase().trim(),
      telephone: userData.telephone.trim(),
      password: userData.password,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // Get all users (for admin purposes)
  async getAll() {
    await delay(300);
    return users.map(({ password: _, ...user }) => user);
  },

  // Get user by ID
  async getById(id) {
    await delay(200);
    
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid user ID');
    }
    
    const user = users.find(u => u.Id === id);
    if (!user) {
      throw new Error('User not found');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // Update user
  async update(id, userData) {
    await delay(500);
    
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid user ID');
    }
    
    const userIndex = users.findIndex(u => u.Id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Check if email is being changed and if it conflicts
    if (userData.email && userData.email !== users[userIndex].email) {
      const emailExists = users.some(u => u.Id !== id && u.email.toLowerCase() === userData.email.toLowerCase());
      if (emailExists) {
        throw new Error('Email is already in use by another account');
      }
    }
    
    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      Id: id // Ensure ID doesn't change
    };
    
    const { password: _, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  },

  // Delete user
  async delete(id) {
    await delay(300);
    
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid user ID');
    }
    
    const userIndex = users.findIndex(u => u.Id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users.splice(userIndex, 1);
    return true;
  }
};