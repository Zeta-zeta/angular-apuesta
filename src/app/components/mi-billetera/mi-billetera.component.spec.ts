import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiBilleteraComponent } from './mi-billetera.component';

describe('MiBilleteraComponent', () => {
  let component: MiBilleteraComponent;
  let fixture: ComponentFixture<MiBilleteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiBilleteraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiBilleteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
