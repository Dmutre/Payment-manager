import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto/CreateUserDTO';
import { LoginUserDTO } from './dto/LoginUserDTO';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            registrate: jest.fn().mockResolvedValue('testToken'),
            login: jest.fn().mockResolvedValue('testToken'),
            refresh: jest.fn().mockResolvedValue('testToken'),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const dto: CreateUserDTO = {
      username: 'usernametest',
      password: 'passwordtest',
    };
    expect(await authController.registrate(dto)).toBe('testToken');
    expect(authService.registrate).toHaveBeenCalledWith(dto);
  });

  it('should log in a user', async () => {
    const dto: LoginUserDTO = {
      username: 'usernametest',
      password: 'passwordtest',
    };
    const req = { user: dto };
    expect(await authController.login(req)).toBe('testToken');
    expect(authService.login).toHaveBeenCalledWith(dto);
  });

  it('should refresh a token', async () => {
    const req = {
      user: { username: 'usernametest', password: 'passwordtest' },
    };
    expect(await authController.refreshToken(req)).toBe('testToken');
    expect(authService.refresh).toHaveBeenCalledWith(req.user);
  });
});
