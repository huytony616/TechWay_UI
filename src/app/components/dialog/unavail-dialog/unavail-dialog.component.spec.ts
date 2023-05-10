import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailDialogComponent } from './unavail-dialog.component';

describe('UnavailDialogComponent', () => {
  let component: UnavailDialogComponent;
  let fixture: ComponentFixture<UnavailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnavailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnavailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
