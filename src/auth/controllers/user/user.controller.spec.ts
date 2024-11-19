import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/auth/services/user/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
