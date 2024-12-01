import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostarComponent } from './apostar.component';

describe('ApostarComponent', () => {
  let component: ApostarComponent;
  let fixture: ComponentFixture<ApostarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApostarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApostarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
