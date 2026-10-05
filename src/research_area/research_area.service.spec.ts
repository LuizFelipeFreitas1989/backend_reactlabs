import { Test, TestingModule } from '@nestjs/testing';
import { ResearchAreaService } from './research_area.service.js';

describe('ResearchAreaService', () => {
  let service: ResearchAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResearchAreaService],
    }).compile();

    service = module.get<ResearchAreaService>(ResearchAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
