import { Component, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageList } from 'src/app/model/imageList.model';
import { Product } from 'src/app/model/product.model';
import { ProductDetail } from 'src/app/model/prodLTDetails.model';
import { ProductElseDetail } from 'src/app/model/prodDetails.model';
import { ImgBBUploadService } from 'src/app/service/imgbb.service';
import { ProductsService } from 'src/app/service/products.service';
import { CatService } from 'src/app/service/cat.service';
import { MafService } from 'src/app/service/maf.service';
import { ColorService } from 'src/app/service/color.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  ProdForm!: FormGroup;
  ProdDetailForm!: FormGroup;

  constructor(
    private formBD: FormBuilder,
    private prodService: ProductsService,
    private imgbbService: ImgBBUploadService,
    private sanitizer: DomSanitizer,
    private catService: CatService,
    private mafService: MafService,
    private colorService: ColorService,
    private snack: MatSnackBar
  ) {}

  isAvailabled: boolean = false;
  isOriginal: boolean = false;
  isDuplicate: boolean = false;
  isLT: boolean = false;
  Original: any;
  Duplicate: any;
  imgLst: ImageList = { imgItem: [] };
  catList: any;
  mafList: any;
  colorList: any;
  prodList: any;
  mainCamLst: any;
  frontCamLst: any;
  adcSecLst : any;
  spcFetLst : any;
  scrTechLst: any;
  selectedCat: any;
  selectedMaf: any;
  selectedColor: any;
  selectedCd: any;
  selectedSrcTech: any;
  catid: number = 0;
  colorid: number = 0;
  mafid: number = 0;
  prod: Product = {
    id: 0,
    productNo: '',
    name: '',
    image: '',
    price: 0,
    available: false,
    categoryId: 0,
    manufacturerId: 0,
    colorId: 0,
  };
  idATC: any;
  prodDetail: ProductDetail = {
    id: 0,
    cpu: '',
    core: 0,
    thread: 0,
    cpuSpeed: 0,
    cpuMaxSpeed: 0,
    cache: 0,
    ram: 0,
    typeRAM: '',
    busRAM: 0,
    maxRAM: 0,
    ssd: '',
    screenSize: 0,
    displayResolution: '',
    hz: 0,
    displayTechnologies: [],
    graphicsCard: '',
    sound: '',
  };
  ProdEDetail: ProductElseDetail = {
    id: 0,
    displayTechnology: 0,
    displayResolution: '',
    screenSize: 0,
    maxLight: '',
    glass: '',
    mainCameraResolution: '',
    selfieCameraResolution: '',
    flash: 0,
    mainCameraFeatures: [],
    selfieCameraFeatures: [],
    os: '',
    chipset: '',
    cpuSpeed: '',
    gpu: '',
    ram: 0,
    rom: 0,
    romUseable: 0,
    contacts: '',
    mobileNetwork: '',
    sim: '',
    bluetooth: '',
    port: '',
    jackPhone: '',
    batteryCapacity: 0,
    batteryType: '',
    maxChargingSupport: 0,
    advancedSecurities: [],
    specialFeatures: [],
    design: '',
    material: '',
    dimensionAndWeight: '',
  };

  ngOnInit(): void {
    this.prodService.getAllProd().subscribe((data: any) => {
      this.prodList = data;
      console.log(this.prodList);
    });

    this.catService.getAllCat().subscribe((data: any) => {
      this.catList = data;
    });

    this.mafService.getAllMaf().subscribe((data: any) => {
      this.mafList = data;
    });

    this.colorService.getAllColor().subscribe((data: any) => {
      this.colorList = data;
    });

    this.prodService.getScrTech().subscribe((data: any) => {
      this.scrTechLst = data;
    });

    this.prodService.getCamFet().subscribe((data:any)=>{
      this.mainCamLst = data;
      this.frontCamLst = data;
    });
    
    this.prodService.getSpcFet().subscribe((data:any)=>{
      this.spcFetLst = data;
    });
    
    this.prodService.getAdcSec().subscribe((data:any)=>{
      this.adcSecLst = data;
    });


  }

  reload() {
    window.location.reload();
  }

  chooseCat(e: any) {
    this.prod.categoryId = this.selectedCat;
    console.log(this.prod.categoryId);
  }
  chooseMaf(e: any) {
    this.prod.manufacturerId = this.selectedMaf;
    console.log(this.prod.manufacturerId);
  }
  chooseColor(e: any) {
    this.prod.colorId = this.selectedColor;
    console.log(this.prod.colorId);
  }
  chooseCd(e: any) {
    this.Duplicate = this.selectedCd;
    console.log(this.Duplicate);
  }
  chooseSrcTech(e: any) {
    this.ProdEDetail.displayTechnology = this.selectedSrcTech
    console.log(this.ProdEDetail.displayTechnology);
  }

  async onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const lght = input.files?.length;
    const field = document.getElementById('inputField');
    const loader = document.getElementById('grLoader');
    const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

    if (loader != null && lght != null && lght != 0) {
      field?.setAttribute('disabled', '');
      loader.style.display = 'block';

      for (let i = 0; i < lght; i++) {
        console.log(input.files![i]);

        this.imgbbService
          .upload(input.files![i])
          .subscribe((url) => this.imgLst.imgItem.push(url));
      }

      await sleep(5000);
      field?.removeAttribute('disabled');
      loader.style.display = 'none';
    }
  }

  updateImageData() {
    this.prod.image = '';
    for (let i = 0; i < this.imgLst.imgItem.length; i++) {
      this.prod.image += this.imgLst.imgItem[i] + '>';
      console.log(this.prod.image);
    }
  }

  removeImg(i: number) {
    this.imgLst.imgItem.splice(i, 1);
    this.updateImageData();
  }

  addProd(addProdForm: NgForm) {
    if (this.isOriginal) {
      this.prod.productNo = this.Original;
    }
    if (this.isDuplicate) {
      this.prod.productNo = this.Duplicate;
    }
    this.updateImageData();
    this.prodService.addProd(this.prod).subscribe(
      (res: Product) => {
        this.snack.open(
          "Successfully Added New Product!!! \n Let's Add More Information For This Products",
          'OK',
          {
            panelClass: ['sc-snackbar'],
            verticalPosition: 'top',
          }
        );
        this.idATC = res.id;
        this.getIsLT(this.prod);
        this.navigateToTab(1);
        console.log(res);
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
        this.navigateToTab(0);
      }
    );
  }

  getIsLT(data: any): boolean {
    if (data.categoryId == 2) {
      this.isLT = true;
    }
    return this.isLT;
  }

  @ViewChild('prodTab') prodTab!: MatTabGroup;
  navigateToTab(index: number) {
    this.prodTab.selectedIndex = index;
  }

  addProdDetail(addProdDetailForm: NgForm) {
    this.prodService.addProdDetail(this.prodDetail, this.idATC).subscribe(
      (res: ProductDetail) => {
        this.snack.open(
          'Successfully Added More Informations For Product ID: ' +
            this.idATC +
            "!!! \n Let's Add More Products",
          'OK',
          {
            panelClass: ['sc-snackbar'],
            verticalPosition: 'top',
          }
        );
        this.navigateToTab(0);
        console.log(res);
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
        this.navigateToTab(0);
      }
    );
  }

  addProdEDetail(addProdEDetailForm: NgForm){
    this.ProdEDetail.id = this.idATC;
    this.prodService.addProdEDetail(this.ProdEDetail, this.idATC).subscribe(
      (res: ProductElseDetail) => {
        this.snack.open(
          'Successfully Added More Informations For Product ID: ' +
            this.idATC +
            "!!! \n Let's Add More Products",
          'OK',
          {
            panelClass: ['sc-snackbar'],
            verticalPosition: 'top',
          }
        );
        this.reload();
        console.log(res);
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
}
