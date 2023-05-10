import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject ,OnInit} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-img-dialog',
  templateUrl: './img-dialog.component.html',
  styleUrls: ['./img-dialog.component.css']
})
export class ImgDialogComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ImgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  imgLst:[]=[];
  ngOnInit(): void {
      this.dialogRef.updateSize('100%', '80%');
      let data = this.data.imgStr.split(">");
      data.splice(data.length-1,1);
      this.imgLst = data;
      console.log(data)
  }
}
