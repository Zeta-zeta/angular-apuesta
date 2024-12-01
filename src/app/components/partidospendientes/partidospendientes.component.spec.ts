import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidospendientesComponent } from './partidospendientes.component';

describe('PartidospendientesComponent', () => {
  let component: PartidospendientesComponent;
  let fixture: ComponentFixture<PartidospendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartidospendientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidospendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
