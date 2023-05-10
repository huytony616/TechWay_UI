import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailDialogComponent } from './avail-dialog.component';

describe('AvailDialogComponent', () => {
  let component: AvailDialogComponent;
  let fixture: ComponentFixture<AvailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
