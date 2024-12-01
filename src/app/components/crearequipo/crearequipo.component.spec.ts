import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearequipoComponent } from './crearequipo.component';

describe('CrearequipoComponent', () => {
  let component: CrearequipoComponent;
  let fixture: ComponentFixture<CrearequipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearequipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearequipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
