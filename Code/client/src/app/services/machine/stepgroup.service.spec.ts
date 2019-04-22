import { TestBed } from '@angular/core/testing';

import { StepgroupService } from './stepgroup.service';

describe('StepgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StepgroupService = TestBed.get(StepgroupService);
    expect(service).toBeTruthy();
  });
});
