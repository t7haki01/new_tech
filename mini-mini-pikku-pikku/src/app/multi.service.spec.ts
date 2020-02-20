import { TestBed } from '@angular/core/testing';

import { MultiService } from './multi.service';

describe('MultiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultiService = TestBed.get(MultiService);
    expect(service).toBeTruthy();
  });
});
