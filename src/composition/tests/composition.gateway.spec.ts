import { Test, TestingModule } from '@nestjs/testing';
import { CompositionGateway } from '../composition.gateway';
import { CompositionService } from '../composition.service';

describe('CompositionGateway', () => {
  let gateway: CompositionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompositionGateway, CompositionService],
    }).compile();

    gateway = module.get<CompositionGateway>(CompositionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
