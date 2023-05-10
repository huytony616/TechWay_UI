import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-avail-dialog',
  templateUrl: './avail-dialog.component.html',
  styleUrls: ['./avail-dialog.component.css'],
})
export class AvailDialogComponent {
  constructor(
    private prodService: ProductsService,
    public dialogRef: MatDialogRef<AvailDialogComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  delProd(id: any) {
    this.prodService.delProd(id).subscribe(
      (res) => {
        this.snack.open(
          'You Just Disable Product: \n Product ID '+id,
          'OK',
          {
            panelClass: ['sc-snackbar'],
            verticalPosition: 'top',
          }
        );
      },
      (err: HttpErrorResponse) => {
        this.snack.open(
          'Fail With Error: ' + err.name + '\n Message: ' + err.message,
          'OK',
          {
            panelClass: ['dg-snackbar'],
            verticalPosition: 'top',
          }
        );
        console.log(err);
      }
    );
  }
}
