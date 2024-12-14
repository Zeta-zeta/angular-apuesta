import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoApuestasComponent } from './listado-apuestas.component';

describe('ListadoApuestasComponent', () => {
  let component: ListadoApuestasComponent;
  let fixture: ComponentFixture<ListadoApuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoApuestasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoApuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
