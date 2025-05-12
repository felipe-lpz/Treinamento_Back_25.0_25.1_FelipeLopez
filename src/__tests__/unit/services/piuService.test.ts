import piuRepository from '../../../repositories/piuRepository';
import userRepository from '../../../repositories/userRepository';
import piuService from '../../../services/piuService';


// Mock dos repositórios
jest.mock('../../../repositories/piuRepository');
jest.mock('../../../repositories/userRepository');

describe('PiuService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a piu successfully', () => {
      // Arrange
      const userId = 'user-123';
      const text = 'Hello, world!';

      const mockUser = { id: userId, name: 'Test User' };
      const mockPiu = {
        id: 'piu-123',
        userId,
        text,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
      };

      (userRepository.getById as jest.Mock).mockReturnValue(mockUser);
      (piuRepository.create as jest.Mock).mockReturnValue(mockPiu);

      // Act
      const result = piuService.create(userId, text);

      // Assert
      expect(result).toHaveProperty('piu');
      expect(piuRepository.create).toHaveBeenCalledTimes(1);
      expect(piuRepository.create).toHaveBeenCalledWith({
        userId,
        text,
      });
    });

    it('should reject empty text', () => {
      // Act
      const result = piuService.create('user-123', '');

      // Assert
      expect(result).toHaveProperty('error');

      if ('error' in result) {
        expect(result.error).toContain('texto do piu é obrigatório');
      }

      expect(piuRepository.create).not.toHaveBeenCalled();
    });

    it('should reject text longer than 140 characters', () => {
      // Arrange
      const longText = 'a'.repeat(141);

      // Act
      const result = piuService.create('user-123', longText);

      // Assert
      expect(result).toHaveProperty('error');

      if ('error' in result) {
        expect(result.error).toContain('não pode ter mais de 140 caracteres');
      }

      expect(piuRepository.create).not.toHaveBeenCalled();
    });

    it('should reject non-existent user', () => {
      // Arrange
      (userRepository.getById as jest.Mock).mockReturnValue(undefined);

      // Act
      const result = piuService.create('non-existent-user', 'Hello');

      // Assert
      expect(result).toHaveProperty('error');

      if ('error' in result) {
        expect(result.error).toContain('Usuário não encontrado');
      }

      expect(piuRepository.create).not.toHaveBeenCalled();
    });
  });

  // Resto dos blocos de testes permanece igual...
});
