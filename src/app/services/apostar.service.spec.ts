import { TestBed } from '@angular/core/testing';

import { ApostarService } from './apostar.service';

describe('ApostarService', () => {
  let service: ApostarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApostarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
