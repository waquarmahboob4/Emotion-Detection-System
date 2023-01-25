import { Test, TestingModule } from '@nestjs/testing';
import { ErsController } from './ers.controller';
import { ErsService } from './ers.service';

describe('ErsController', () => {
  let controller: ErsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErsController],
      providers: [ErsService],
    }).compile();

    controller = module.get<ErsController>(ErsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
