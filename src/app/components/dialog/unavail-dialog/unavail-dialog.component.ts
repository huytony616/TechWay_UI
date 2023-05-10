import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-avail-dialog',
  templateUrl: './unavail-dialog.component.html',
  styleUrls: ['./unavail-dialog.component.css'],
})
export class UnavailDialogComponent {
  constructor(public dialogRef: MatDialogRef<UnavailDialogComponent>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
