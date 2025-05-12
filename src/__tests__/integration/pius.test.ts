import request from 'supertest';

import piuRepository from '../../repositories/piuRepository';
import userRepository from '../../repositories/userRepository';
import app from '../../server';

jest.mock('../../repositories/piuRepository');
jest.mock('../../repositories/userRepository');

// Criamos uma instância única do supertest com o app
const testRequest = request(app);

describe('Piu Routes', () => {
beforeEach(() => {
    jest.clearAllMocks();
});

describe('POST /pius', () => {
    it('should create a new piu', async () => {
      // Arrange
    const piuData = {
        userId: 'user-123',
        text: 'Hello, world!',
    };

    const mockUser = {
        id: piuData.userId,
        name: 'Test User',
    };

    const mockPiu = {
        id: 'piu-123',
        ...piuData,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
      };

      (userRepository.getById as jest.Mock).mockReturnValue(mockUser);
      (piuRepository.create as jest.Mock).mockReturnValue(mockPiu);

      // Act - usando testRequest em vez de request(app)
      const response = await testRequest
        .post('/pius')
        .send(piuData)
        .expect(201);

      // Assert
      expect(response.body).toHaveProperty('id');
      expect(response.body.userId).toBe(piuData.userId);
      expect(response.body.text).toBe(piuData.text);
      expect(piuRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should return 400 for missing required fields', async () => {
      // Act - usando testRequest
      const response = await testRequest
        .post('/pius')
        .send({
          userId: 'user-123',
        })
        .expect(400);
      expect(response.body).toHaveProperty('message');
      expect(piuRepository.create).not.toHaveBeenCalled();
    });

    it('should return 400 for non-existent user', async () => {
      // Arrange
      (userRepository.getById as jest.Mock).mockReturnValue(undefined);
      const response = await testRequest
        .post('/pius')
        .send({
          userId: 'non-existent',
          text: 'Hello',
        })
        .expect(400);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Usuário não encontrado');
      expect(piuRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('GET /pius', () => {
    it('should return all pius', async () => {
      // Arrange
      const mockPius = [
        {
          id: 'piu-1',
          userId: 'user-1',
          text: 'Piu 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          likes: 0,
        },
        {
          id: 'piu-2',
          userId: 'user-2',
          text: 'Piu 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          likes: 0,
        },
      ];

      (piuRepository.getAll as jest.Mock).mockReturnValue(mockPius);

      // Act - usando testRequest
      const response = await testRequest.get('/pius').expect(200);

      // Assert
      expect(response.body).toHaveLength(2);
      expect(response.body[0].id).toBe('piu-1');
      expect(response.body[1].id).toBe('piu-2');
    });
  });
  describe('GET /pius/:id', () => {
    it('should return a piu by id', async () => {
      // Arrange
      const mockPiu = {
        id: 'piu-123',
        userId: 'user-1',
        text: 'Test piu',
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
      };

      (piuRepository.getById as jest.Mock).mockReturnValue(mockPiu);

      // Act - usando testRequest
      const response = await testRequest.get('/pius/piu-123').expect(200);

      // Assert
      expect(response.body).toHaveProperty('id', 'piu-123');
      expect(response.body.text).toBe('Test piu');
    });

    it('should return 404 for non-existent piu', async () => {
      // Arrange
      (piuRepository.getById as jest.Mock).mockReturnValue(undefined);

      // Act - usando testRequest
      const response = await testRequest.get('/pius/non-existent').expect(404);

      // Assert
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Piu não encontrado');
    });
  });
});
