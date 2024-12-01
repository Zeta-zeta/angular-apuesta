import { TestBed } from '@angular/core/testing';

import { MiBilleteraService } from './mi-billetera.service';

describe('MiBilleteraService', () => {
  let service: MiBilleteraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiBilleteraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
