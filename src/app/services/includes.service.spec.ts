import { TestBed } from '@angular/core/testing';

import { IncludesService } from './includes.service';

describe('IncludesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncludesService = TestBed.get(IncludesService);
    expect(service).toBeTruthy();
  });
});
