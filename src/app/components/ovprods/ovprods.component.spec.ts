import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OVprodsComponent } from './ovprods.component';

describe('OVprodsComponent', () => {
  let component: OVprodsComponent;
  let fixture: ComponentFixture<OVprodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OVprodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OVprodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
