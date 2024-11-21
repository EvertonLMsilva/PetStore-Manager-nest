import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/auth/services/user/user.service';
import { ApplicationController } from './Application.controller';

describe('ApplicationController', () => {
  let controller: ApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [UserService],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
