import { TestBed } from '@angular/core/testing';

import { TictactoeService } from './tictactoe.service';

describe('TictactoeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TictactoeService = TestBed.get(TictactoeService);
    expect(service).toBeTruthy();
  });
});
