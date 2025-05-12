import request from 'supertest';

import userRepository from '../../repositories/userRepository';
import app from '../../server';

jest.mock('../../repositories/userRepository');

// Criamos uma instância única do supertest com o app
const testRequest = request(app);

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      // Arrange
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        name: 'Test User',
        birth: '1990-01-01',
        cpf: '123.456.789-09',
        phone: '(11) 98765-4321',
        about: 'Test bio'
      };

      const mockUser = {
        id: 'mock-id',
        ...userData,
        birth: new Date(userData.birth),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Mock repository methods
      (userRepository.emailExists as jest.Mock).mockReturnValue(false);
      (userRepository.usernameExists as jest.Mock).mockReturnValue(false);
      (userRepository.cpfExists as jest.Mock).mockReturnValue(false);
      (userRepository.phoneExists as jest.Mock).mockReturnValue(false);
      (userRepository.create as jest.Mock).mockReturnValue(mockUser);

      // Act - usando testRequest
      const response = await testRequest
        .post('/users')
        .send(userData)
        .expect(201);

      // Assert
      expect(response.body).toHaveProperty('id');
      expect(response.body.username).toBe(userData.username);
      expect(response.body.email).toBe(userData.email);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should return 400 for missing required fields', async () => {
      // Act - usando testRequest
      const response = await testRequest
        .post('/users')
        .send({
          username: 'testuser',
          // Missing other required fields
        })
        .expect(400);

      // Assert
      expect(response.body).toHaveProperty('message');
      expect(userRepository.create).not.toHaveBeenCalled();
    });

    // Adicione mais testes para os outros casos de erro...
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      // Arrange
      const mockUsers = [
        {
          id: 'user1',
          username: 'user1',
          email: 'user1@example.com',
          name: 'User One'
        },
        {
          id: 'user2',
          username: 'user2',
          email: 'user2@example.com',
          name: 'User Two'
        }
      ];

      (userRepository.getAll as jest.Mock).mockReturnValue(mockUsers);

      // Act - usando testRequest
      const response = await testRequest
        .get('/users')
        .expect(200);

      // Assert
      expect(response.body).toHaveLength(2);
      expect(response.body[0].id).toBe('user1');
      expect(response.body[1].id).toBe('user2');
    });
  });

  // Continue com os outros blocos de teste usando o testRequest em vez de request(app)
});