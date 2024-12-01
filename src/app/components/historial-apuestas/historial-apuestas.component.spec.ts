import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialApuestasComponent } from './historial-apuestas.component';

describe('HistorialApuestasComponent', () => {
  let component: HistorialApuestasComponent;
  let fixture: ComponentFixture<HistorialApuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialApuestasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialApuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
