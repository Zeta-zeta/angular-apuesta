import { TestBed } from '@angular/core/testing';

import { HistorialApuestasService } from './historial-apuestas.service';

describe('HistorialApuestasService', () => {
  let service: HistorialApuestasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialApuestasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
