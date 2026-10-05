import { Test, TestingModule } from '@nestjs/testing';
import { PartnersController } from './partners.controller.js';
import { PartnersService } from './partners.service.js';

describe('PartnersController', () => {
  let controller: PartnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnersController],
      providers: [PartnersService],
    }).compile();

    controller = module.get<PartnersController>(PartnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
