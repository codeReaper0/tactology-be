import { Test, TestingModule } from '@nestjs/testing';
import { SubdepartmentResolver } from './subdepartment.resolver';

describe('SubdepartmentResolver', () => {
  let resolver: SubdepartmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdepartmentResolver],
    }).compile();

    resolver = module.get<SubdepartmentResolver>(SubdepartmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
