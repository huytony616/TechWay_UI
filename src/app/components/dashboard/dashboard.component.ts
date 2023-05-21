import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  filtersLoaded: Promise<boolean> = Promise.resolve(false);
  chartAreaOptions!: {};
  chartColOptions!: {};

  HighchartsArea = Highcharts;
  HighchartsCol = Highcharts;
  constructor(
    public prodService: ProductsService,
    private snack: MatSnackBar
  ) {}

  revaenueByMonth = new Array(12).fill(0);
  revPhone = new Array(12).fill(0);
  revLaptop = new Array(12).fill(0);
  revTablet = new Array(12).fill(0);

  ngOnInit() {
    this.chartData();
    this.chartInit();
  }

  chartData() {
    this.revaenueByMonth.forEach((e) => {
      e = 0;
    });

    this.prodService.getReportRevenue().subscribe(
      (res) => {
        res.forEach((rev: any) => {
          switch (rev.month) {
            case 1:
              this.revaenueByMonth[0] = rev.total;
              break;
            case 2:
              this.revaenueByMonth[1] = rev.total;
              break;
            case 3:
              this.revaenueByMonth[2] = rev.total;
              break;
            case 4:
              this.revaenueByMonth[3] = rev.total;
              break;
            case 5:
              this.revaenueByMonth[4] = rev.total;
              break;
            case 6:
              this.revaenueByMonth[5] = rev.total;
              break;
            case 7:
              this.revaenueByMonth[6] = rev.total;
              break;
            case 8:
              this.revaenueByMonth[7] = rev.total;
              break;
            case 9:
              this.revaenueByMonth[8] = rev.total;
              break;
            case 10:
              this.revaenueByMonth[9] = rev.total;
              break;
            case 11:
              this.revaenueByMonth[10] = rev.total;
              break;
            case 12:
              this.revaenueByMonth[11] = rev.total;
              break;
            default:
              break;
          }
        });

        this.prodService.getReportCatMonthRevenue().subscribe(
          (res: any) => {
            res.forEach((rev:any) => {
              switch (rev.month) {
                case 1:
                  this.setRevByCat(0, rev.category_id, rev.total);
                  break;
                case 2:
                  this.setRevByCat(1, rev.category_id, rev.total);
                  break;
                case 3:
                  this.setRevByCat(2, rev.category_id, rev.total);
                  break;
                case 4:
                  this.setRevByCat(3, rev.category_id, rev.total);
                  break;
                case 5:
                  this.setRevByCat(4, rev.category_id, rev.total);
                  break;
                case 6:
                  this.setRevByCat(5, rev.category_id, rev.total);
                  break;
                case 7:
                  this.setRevByCat(6, rev.category_id, rev.total);
                  break;
                case 8:
                  this.setRevByCat(7, rev.category_id, rev.total);
                  break;
                case 9:
                  this.setRevByCat(8, rev.category_id, rev.total);
                  break;
                case 10:
                  this.setRevByCat(9, rev.category_id, rev.total);
                  break;
                case 11:
                  this.setRevByCat(10, rev.category_id, rev.total);
                  break;
                case 12:
                  this.setRevByCat(11, rev.category_id, rev.total);
                  break;
                default:
                  break;
              }
              
            });
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
    this.filtersLoaded = Promise.resolve(true);
  }

  setRevByCat(index: number, catid: any, rev: any) {
    if (catid == 1) {
      console.log(catid);
      
      this.revPhone[index] = rev;
    }
    if (catid == 2) {
      console.log(catid);
      this.revLaptop[index] = rev;
    }
    if (catid == 3) {
      console.log(catid);
      this.revTablet[index] = rev;
    }
  }

  chartInit() {
    this.chartAreaOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Monthly Profit Base On Categories',
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Revenue',
        },
      },
      tooltip: {
        split: true,
        valueSuffix: ' VNĐ',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      series: [
        {
          name: 'Revenue',
          data: this.revaenueByMonth,
        },
      ],
    };

    this.chartColOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Monthly Revenue by Category',
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Revenue',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} VNĐ</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Phone',
          data: this.revPhone,
        },
        {
          name: 'Laptop',
          data: this.revLaptop,
        },
        {
          name: 'Tablet',
          data: this.revTablet,
        },
      ],
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
