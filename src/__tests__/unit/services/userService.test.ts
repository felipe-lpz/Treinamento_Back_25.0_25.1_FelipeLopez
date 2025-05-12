import piuRepository from '../../../repositories/piuRepository';
import userRepository from '../../../repositories/userRepository';
import userService from '../../../services/userService';

// Mock dos repositórios
jest.mock('../../../repositories/userRepository');
jest.mock('../../../repositories/piuRepository');

describe('UserService', () => {
  // Reset dos mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user successfully', () => {
      // Arrange
      const mockUser = {
        id: 'mock-id',
        username: 'testuser',
        email: 'test@example.com',
        name: 'Test User',
        birth: new Date('1990-01-01'),
        cpf: '123.456.789-09',
        phone: '(11) 98765-4321',
        about: 'Test bio',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Mock das funções de verificação
      (userRepository.emailExists as jest.Mock).mockReturnValue(false);
      (userRepository.usernameExists as jest.Mock).mockReturnValue(false);
      (userRepository.cpfExists as jest.Mock).mockReturnValue(false);
      (userRepository.phoneExists as jest.Mock).mockReturnValue(false);
      (userRepository.create as jest.Mock).mockReturnValue(mockUser);

      // Act
      const result = userService.create(
        mockUser.username,
        mockUser.email,
        mockUser.name,
        mockUser.birth,
        '12345678909', // CPF sem formatação
        '11987654321', // Telefone sem formatação
        mockUser.about
      );

      // Assert
      expect(result).toHaveProperty('user');
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        username: mockUser.username,
        email: mockUser.email,
        cpf: '123.456.789-09', // Deve estar formatado
        phone: '(11) 98765-4321' // Deve estar formatado
      }));
    });

    it('should reject if email already exists', () => {
      // Arrange
      (userRepository.emailExists as jest.Mock).mockReturnValue(true);

      // Act
      const result = userService.create(
        'testuser',
        'existing@example.com',
        'Test User',
        new Date('1990-01-01'),
        '123.456.789-09',
        '(11) 98765-4321',
        'Test bio'
    );

      // Assert
    expect(result).toHaveProperty('error');
    expect(result).toHaveProperty('error');
    if ('error' in result) {
    expect(result.error).toContain('email já está em uso');
}
    expect(userRepository.create).not.toHaveBeenCalled();
    });

    // Adicione mais testes para os outros casos de erro...
});

describe('delete', () => {
    it('should delete user and all related pius', () => {
      // Arrange
    const userId = 'user-id';
    const mockUser = { id: userId, name: 'Test User' };
    const mockPius = [
        { id: 'piu1', userId, text: 'Test piu 1' },
        { id: 'piu2', userId, text: 'Test piu 2' }
    ];

    (userRepository.getById as jest.Mock).mockReturnValue(mockUser);
    (piuRepository.getByUserId as jest.Mock).mockReturnValue(mockPius);
    (piuRepository.delete as jest.Mock).mockReturnValue(true);
    (userRepository.delete as jest.Mock).mockReturnValue(true);

      // Act
    const result = userService.delete(userId);

      // Assert
    expect(result).toBe(true);
    expect(piuRepository.delete).toHaveBeenCalledTimes(2);
    expect(piuRepository.delete).toHaveBeenCalledWith('piu1');
    expect(piuRepository.delete).toHaveBeenCalledWith('piu2');
    expect(userRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should return false if user not found', () => {
      // Arrange
      (userRepository.getById as jest.Mock).mockReturnValue(undefined);

      // Act
      const result = userService.delete('nonexistent-id');

      // Assert
      expect(result).toBe(false);
      expect(piuRepository.getByUserId).not.toHaveBeenCalled();
      expect(userRepository.delete).not.toHaveBeenCalled();
    });
  });

  // Adicione testes para update, listAll, findById...
});