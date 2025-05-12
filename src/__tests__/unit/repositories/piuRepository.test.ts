import { randomUUID } from 'crypto';

import piuRepository from '../../../repositories/piuRepository';
// Removemos a importação de Piu que não é utilizada

// Mock de crypto para retornar IDs previsíveis
jest.mock('crypto', () => ({
  randomUUID: jest.fn(),
}));

describe('PiuRepository', () => {
  beforeEach(() => {
    // Reset do repositório para cada teste
    jest.clearAllMocks();

    // Limpar dados - adicionamos os comentários para ignorar o erro de ESLint
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (piuRepository as any).pius = new Map();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (piuRepository as any).userPiusIndex = new Map();
  });

  // Resto do código permanece igual...

  describe('create', () => {
    it('should create a new piu', () => {
      // Arrange
      const mockId = 'test-id-123';
      (randomUUID as jest.Mock).mockReturnValue(mockId);

      const piuData = {
        userId: 'user-123',
        text: 'Hello, world!',
      };

      // Act
      const piu = piuRepository.create(piuData);

      // Assert
      expect(piu.id).toBe(mockId);
      expect(piu.userId).toBe(piuData.userId);
      expect(piu.text).toBe(piuData.text);
      expect(piu.createdAt).toBeInstanceOf(Date);
      expect(piu.updatedAt).toBeInstanceOf(Date);
      expect(piu.likes).toBe(0);
    });

    // Resto dos testes permanece igual...
  });

  // Resto dos blocos de testes permanece igual...
});
