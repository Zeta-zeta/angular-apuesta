import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinirpartidoComponent } from './definirpartido.component';

describe('DefinirpartidoComponent', () => {
  let component: DefinirpartidoComponent;
  let fixture: ComponentFixture<DefinirpartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefinirpartidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefinirpartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
