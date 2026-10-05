import { Test, TestingModule } from '@nestjs/testing';
import { ResearchAreaController } from './research_area.controller.js';
import { ResearchAreaService } from './research_area.service.js';

describe('ResearchAreaController', () => {
  let controller: ResearchAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResearchAreaController],
      providers: [ResearchAreaService],
    }).compile();

    controller = module.get<ResearchAreaController>(ResearchAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
