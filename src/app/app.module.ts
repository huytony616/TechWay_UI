import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from "@angular/material/grid-list";
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from "@angular/material/table";
import { OVprodsComponent } from './components/ovprods/ovprods.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AvailDialogComponent } from './components/dialog/avail-dialog/avail-dialog.component';
import { UnavailDialogComponent } from './components/dialog/unavail-dialog/unavail-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ImgDialogComponent } from './components/dialog/img-dialog/img-dialog.component';
import { MatSortModule } from '@angular/material/sort'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import { EditProdDialogComponent } from './components/dialog/edit-prod-dialog/edit-prod-dialog.component';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from "highcharts-angular";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    ProductsComponent,
    OVprodsComponent,
    AvailDialogComponent,
    UnavailDialogComponent,
    ImgDialogComponent,
    EditProdDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatTabsModule,
    ChartModule,
    HighchartsChartModule
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
