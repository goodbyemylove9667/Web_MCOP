import { TestBed } from '@angular/core/testing';

import { ContestsService } from './contests.service';

describe('ContestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContestsService = TestBed.get(ContestsService);
    expect(service).toBeTruthy();
  });
});
