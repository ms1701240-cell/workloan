import { TestBed } from '@angular/core/testing';

import { Loanapi } from './loanapi';

describe('Loanapi', () => {
  let service: Loanapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loanapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
