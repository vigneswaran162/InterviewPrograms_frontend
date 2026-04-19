import { TestBed } from '@angular/core/testing';

import { ProgramMAsterService } from './program-master.service';

describe('ProgramMAsterService', () => {
  let service: ProgramMAsterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramMAsterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
