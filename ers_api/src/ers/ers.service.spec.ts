import { Test, TestingModule } from '@nestjs/testing';
import { ErsService } from './ers.service';

describe('ErsService', () => {
  let service: ErsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErsService],
    }).compile();

    service = module.get<ErsService>(ErsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
