import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/service/products.service';
import { registerLocaleData } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AvailDialogComponent } from 'src/app/components/dialog/avail-dialog/avail-dialog.component';
import { UnavailDialogComponent } from 'src/app/components/dialog/unavail-dialog/unavail-dialog.component';
import { ImgDialogComponent } from 'src/app/components/dialog/img-dialog/img-dialog.component';
import { EditProdDialogComponent } from "src/app/components/dialog/edit-prod-dialog/edit-prod-dialog.component";
import { CatService } from 'src/app/service/cat.service';
import { MafService } from 'src/app/service/maf.service';
import { ColorService } from 'src/app/service/color.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


import localeVi from '@angular/common/locales/vi';
import { MatSnackBar } from '@angular/material/snack-bar';
registerLocaleData(localeVi, 'vi');

@Component({
  selector: 'app-ovprods',
  templateUrl: './ovprods.component.html',
  styleUrls: ['./ovprods.component.css'],
})
export class OVprodsComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'categoryId',
    'manufacturerId',
    'colorId',
    'image',
    'Edit',
    'Disable',
  ];
  dataSource= new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  filterValue = '';
  filteredValues: Product[] = [];

  ua =
    'background-color: #5a5c69; color: #f8f9fc; text-decoration-line: line-through';
  catList: any;
  mafList: any;
  colorList: any;
  constructor(
    private prodService: ProductsService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllProd();
  }

  ngAfterViewInit(): void {
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      filter = filter.trim().toLowerCase();
      return data.name.toLowerCase().indexOf(filter) > -1
    };
    this.dataSource.filter = '';
    this.dataSource.connect().subscribe((data) => {
      this.filteredValues = data;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  avDialog(id: any): void {
    console.log(id);
    const avRef = this.dialog.open(AvailDialogComponent, { data: { id } });

    avRef.afterClosed().subscribe((result) => {
      this.getAllProd();
    });
  }
  unDialog(): void {
    const uvRef = this.dialog.open(UnavailDialogComponent);
  }

  applyFilter() {
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      filter = filter.trim().toLowerCase();
      return data.name.toLowerCase().indexOf(filter) > -1
    };
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    this.filteredValues = this.dataSource.filteredData;
  }

  public getAllProd() {
    this.prodService.getAllProd().subscribe(
      (res: Product[]) => {
        this.dataSource.data = res;
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      }
    );
  }

  showImgDialog(imgStr: any): void {
    const imgRef = this.dialog.open(ImgDialogComponent, { data: { imgStr } });
  }

  showEditDialog(id : any, catID: any){
    const edRef = this.dialog.open(EditProdDialogComponent, { data: { id, catID } });
    edRef.afterClosed().subscribe((result) => {
      this.getAllProd();
    });
  }
}
