import app , { server } from '../index.js'; 
import User from '../models/user.js';
import connectToDB from '../utils/connectToDB.js';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import supertest from 'supertest'; 

const request = supertest(app);

beforeAll(async () => {
  config();
  await connectToDB(process.env.TEST_MONGODB_URL); 
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); 
  await mongoose.connection.close(); 
  server.close();
});

describe('User Sign Up', () => {
  it('should register a new user', async () => {
    const newUser = {
      name: 'John',
      surname: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'Password123',
      dateOfBirth: '1990-01-01',
    };

    const response = await request.post('/api/auth/register').send(newUser); 

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'John');
    expect(response.body).toHaveProperty('surname', 'Doe');
    expect(response.body).toHaveProperty('username', 'johndoe');
    expect(response.body).toHaveProperty('email', 'john@example.com');
    expect(response.body).toHaveProperty('dateOfBirth', '1990-01-01');
    expect(response.body).not.toHaveProperty('passwordHash');
  });

  it('should return 400 if all fields are not provided', async () => {
    const response = await request.post('/api/auth/register').send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('All fields are required');
  });

  it('should return 409 if email or username already exists', async () => {
    const existingUser = new User({
      name: 'Jane',
      surname: 'Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      passwordHash: 'hashedpassword',
      dateOfBirth: '1991-01-01',
    });

    await existingUser.save();

    const newUser = {
      name: 'John',
      surname: 'Doe',
      username: 'janedoe', // Existing username
      email: 'john@example.com',
      password: 'Password123',
      dateOfBirth: '1990-01-01',
    };

    const response = await request.post('/api/auth/register').send(newUser);

    expect(response.status).toBe(409);
    expect(response.body.error).toBe('Email or username already exists');
  });
});

  describe('User Login', () => {  
    it('should login a user', async () => {
      const newUser = {
        name: 'Jane2',
        surname: 'Doe2',
        username: 'janedoe2',
        email: 'jane2@example.com',
        password: 'Password123', 
        dateOfBirth: '1991-01-01',
      };
    
      await request.post('/api/auth/register').send(newUser);
    
      const loginCredentials = {
        email: 'jane2@example.com',
        password: 'Password123', 
      };
    
      const loginResponse = await request.post('/api/auth/login').send(loginCredentials);
    
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toHaveProperty('token');
      expect(loginResponse.body.user).toHaveProperty('name', 'Jane2');
      expect(loginResponse.body.user).toHaveProperty('email', 'jane2@example.com');
    });
    
      it('should not find email', async () => {
        const loginCredentials = {
          email: 'notreal@gmail.com',
          password: 'Password123'
      }
      const loginResponse = await request.post('/api/auth/login').send(loginCredentials);
      expect(loginResponse.status).toBe(404);
    })

    it('should not find password', async () => {
      const newUser = {
        name: 'Jane3',
        surname: 'Doe3',
        username: 'janedoe3',
        email: 'jane3@example.com',
        password: 'Password123',
        dateOfBirth: '1991-01-01',
      };
      await request.post('/api/auth/register').send(newUser);

      const loginCredentials = {
        email: 'jane3@example.com',
        password: 'wrongpassword',
      };

      const loginResponse = await request.post('/api/auth/login').send(loginCredentials);
      expect(loginResponse.status).toBe(401);
    })
});
