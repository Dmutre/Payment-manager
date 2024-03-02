import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/user.repository';
import { BalancesService } from '../balances/balances.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../users/dto/CreateUserDTO';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let balancesService: BalancesService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: BalancesService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    balancesService = module.get<BalancesService>(BalancesService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register a user', async () => {
    const dto: CreateUserDTO = { username: 'testuser', password: 'testpassword' };
    const createdUser: any = { id: '1', ...dto };
    const expectedResult = { refresh_token: 'fakeToken', access_token: 'fakeToken' };
    
    const result = await authService.registrate(dto);

    expect(result).toEqual(expectedResult);
    expect(userRepository.create).toHaveBeenCalledWith(dto);
    expect(balancesService.createBalance).toHaveBeenCalledWith(createdUser.id);
    expect(jwtService.sign).toHaveBeenCalled(); // Add specific expectation for jwtService.sign if needed
  });

  // Add more tests for other methods as needed

});
