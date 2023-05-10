import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/service/products.service';
import { ProductDetail } from 'src/app/model/prodLTDetails.model';
import { Product } from 'src/app/model/product.model';
import { CatService } from 'src/app/service/cat.service';
import { ColorService } from 'src/app/service/color.service';
import { MafService } from 'src/app/service/maf.service';
import { ImgBBUploadService } from 'src/app/service/imgbb.service';
import { ImageList } from 'src/app/model/imageList.model';
import { MatTabGroup } from '@angular/material/tabs';
import { ProductElseDetail } from 'src/app/model/prodDetails.model';

@Component({
  selector: 'app-edit-prod-dialog',
  templateUrl: './edit-prod-dialog.component.html',
  styleUrls: ['./edit-prod-dialog.component.css'],
})
export class EditProdDialogComponent implements OnInit {
  catList: any;
  mafList: any;
  spcFetLst: any;
  adcSecLst: any;
  frontCamLst: any;
  mainCamLst: any;
  colorList: any;
  scrTechLst: any;
  selectedCat: any;
  selectedMaf: any;
  selectedColor: any;
  imgLst: ImageList = { imgItem: [] };
  idATC: any;

  constructor(
    public dialogRef: MatDialogRef<EditProdDialogComponent>,
    private prodService: ProductsService,
    private snack: MatSnackBar,
    private catService: CatService,
    private mafService: MafService,
    private colorService: ColorService,
    private imgbbService: ImgBBUploadService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  prod: Product = {
    id: -1,
    productNo: '',
    name: '',
    image: '',
    price: 0,
    available: false,
    categoryId: 0,
    manufacturerId: 0,
    colorId: 0,
  };

  prodDetail: ProductDetail = {
    id: -1,
    cpu: '',
    core: 0,
    thread: 0,
    cpuSpeed: 0,
    cpuMaxSpeed: 0,
    cache: 0,
    ram: 0,
    type: '',
    busRAM: 0,
    maxRAM: 0,
    ssd: '',
    screenWidth: 0,
    screenResolution: '',
    hz: 0,
    screenTechs: [],
    screenCard: '',
    sound: '',
  };

  prodDetailE: ProductElseDetail = {
    id: 0,
    screenTech: 0,
    screenResolution: '',
    screenWidth: 0,
    maxLight: '',
    glass: '',
    backCameraResolution: '',
    frontCameraResolution: '',
    flash: 0,
    backCameraFeatures: [],
    frontCameraFeatures: [],
    os: '',
    cpu: '',
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
    pinCapacity: 0,
    pinType: '',
    maxChargingSupport: 0,
    advancedSecurities: [],
    specialFeatures: [],
    design: '',
    material: '',
    dimensionAndWeight: '',
  };

  ngOnInit(): void {
    this.dialogRef.updateSize('100%', '95%');

    if (this.data.catID == 2) {
      this.getProdLT(this.data.id);
    } else {
      this.getProdE(this.data.id);
    }

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

    this.prodService.getCamFet().subscribe((data: any) => {
      this.mainCamLst = data;
      this.frontCamLst = data;
    });

    this.prodService.getSpcFet().subscribe((data: any) => {
      this.spcFetLst = data;
    });

    this.prodService.getAdcSec().subscribe((data: any) => {
      this.adcSecLst = data;
    });
  }

  reload() {
    window.location.reload();
  }

  chooseCat(e: any) {
    this.prod.categoryId = this.selectedCat;
    // console.log(this.prod.categoryId);
  }
  chooseMaf(e: any) {
    this.prod.manufacturerId = this.selectedMaf;
    // console.log(this.prod.manufacturerId);
  }
  chooseColor(e: any) {
    this.prod.colorId = this.selectedColor;
    // console.log(this.prod.colorId);
  }

  getProdLT(id: any) {
    this.prodService.getProdDetail(id).subscribe({
      next: (res) => {
        //product
        this.selectedCat = res.product.category.id;
        this.selectedMaf = res.product.manufacturer.id;
        this.selectedColor = res.product.color.id;

        this.prod.name = res.product.name;
        this.prod.price = res.product.price;
        this.prod.available = res.product.available;
        this.prod.id = res.product.id;
        this.prod.productNo = res.product.productNo;
        this.prod.categoryId = res.product.category.id;
        this.prod.manufacturerId = res.product.manufacturer.id;
        this.prod.colorId = res.product.color.id;

        let imgdata = res.product.images.split('>');
        imgdata.splice(imgdata.length - 1, 1);
        this.imgLst.imgItem = imgdata;

        //product detail Laptop
        this.prodDetail.busRAM = res.busRAM;
        this.prodDetail.cache = res.cache;
        this.prodDetail.core = res.core;
        this.prodDetail.cpu = res.cpu;
        this.prodDetail.cpuMaxSpeed = res.cpuMaxSpeed;
        this.prodDetail.cpuSpeed = res.cpuSpeed;
        this.prodDetail.hz = res.hz;
        this.prodDetail.id = res.id;
        this.prodDetail.maxRAM = res.maxRAM;
        this.prodDetail.ram = res.ram;
        this.prodDetail.screenCard = res.screenCard;
        this.prodDetail.screenResolution = res.screenResolution;

        res.screenTechs.forEach((scrTech: any) => {
          this.prodDetail.screenTechs.push(scrTech.id);
        });

        this.prodDetail.screenWidth = res.screenWidth;
        this.prodDetail.sound = res.sound;
        this.prodDetail.ssd = res.ssd;
        this.prodDetail.thread = res.thread;
        this.prodDetail.type = res.type;
      },
      error: (err) => {
        this.snack.open(
          'Fail With Error: ' + err.name + '\n Message: ' + err.message,
          'OK',
          {
            panelClass: ['dg-snackbar'],
            verticalPosition: 'top',
          }
        );
      },
    });
  }

  getProdE(id: any) {
    this.prodService.getProdEDetail(id).subscribe({
      next: (res) => {
        //product
        this.selectedCat = res.product.category.id;
        this.selectedMaf = res.product.manufacturer.id;
        this.selectedColor = res.product.color.id;

        this.prod.name = res.product.name;
        this.prod.price = res.product.price;
        this.prod.available = res.product.available;
        this.prod.id = res.product.id;
        this.prod.productNo = res.product.productNo;
        this.prod.categoryId = res.product.category.id;
        this.prod.manufacturerId = res.product.manufacturer.id;
        this.prod.colorId = res.product.color.id;

        let imgdata = res.product.images.split('>');
        imgdata.splice(imgdata.length - 1, 1);
        this.imgLst.imgItem = imgdata;

        //product detail Else
        res.advancedSecurities.forEach((obj: any) => {
          this.prodDetailE.advancedSecurities.push(obj.id);
        });
        res.advancedSecurities.forEach((obj: any) => {
          this.prodDetailE.backCameraFeatures.push(obj.id);
        });
        this.prodDetailE.backCameraResolution = res.backCameraResolution;
        this.prodDetailE.bluetooth = res.bluetooth;
        this.prodDetailE.contacts = res.contacts;
        this.prodDetailE.cpu = res.cpu;
        this.prodDetailE.cpuSpeed = res.cpuSpeed;
        this.prodDetailE.design = res.design;
        this.prodDetailE.dimensionAndWeight = res.dimensionAndWeight;
        this.prodDetailE.flash = res.flash;
        res.advancedSecurities.forEach((obj: any) => {
          this.prodDetailE.frontCameraFeatures.push(obj.id);
        });
        this.prodDetailE.frontCameraResolution = res.frontCameraResolution;
        this.prodDetailE.glass = res.glass;
        this.prodDetailE.gpu = res.gpu;
        this.prodDetailE.id = res.id;
        this.prodDetailE.jackPhone = res.jackPhone;
        this.prodDetailE.material = res.material;
        this.prodDetailE.maxChargingSupport = res.maxChargingSupport;
        this.prodDetailE.maxLight = res.maxLight;
        this.prodDetailE.mobileNetwork = res.mobileNetwork;
        this.prodDetailE.os = res.os;
        this.prodDetailE.pinCapacity = res.pinCapacity;
        this.prodDetailE.pinType = res.pinType;
        this.prodDetailE.port = res.port;
        this.prodDetailE.ram = res.ram;
        this.prodDetailE.rom = res.rom;
        this.prodDetailE.romUseable = res.romUseable;
        this.prodDetailE.screenResolution = res.screenResolution;
        this.prodDetailE.screenTech = res.screenTech.id;
        this.prodDetailE.screenWidth = res.screenWidth;
        this.prodDetailE.sim = res.sim;
        res.advancedSecurities.forEach((obj: any) => {
          this.prodDetailE.specialFeatures.push(obj.id);
        });
        console.log(res);
      },
      error: (err) => {
        this.snack.open(
          'Fail With Error: ' + err.name + '\n Message: ' + err.message,
          'OK',
          {
            panelClass: ['dg-snackbar'],
            verticalPosition: 'top',
          }
        );
      },
    });
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
    }
  }

  removeImg(i: number) {
    this.imgLst.imgItem.splice(i, 1);
    this.updateImageData();
  }

  @ViewChild('prodTab') prodTab!: MatTabGroup;
  navigateToTab(index: number) {
    this.prodTab.selectedIndex = index;
  }

  editProd(editProdForm: NgForm) {
    this.updateImageData();
    this.prodService.editProd(this.prod, this.prod.id).subscribe(
      (res: Product) => {
        this.snack.open(
          'Successfully Edit Informations For Product ID: ' + this.prod.id,
          'OK',
          {
            panelClass: ['sc-snackbar'],
            verticalPosition: 'top',
          }
        );
        this.navigateToTab(1);
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

  editProdDetail(editProdDetailForm: NgForm) {
    this.prodService
      .editProdDetail(this.prodDetail, this.prodDetail.id)
      .subscribe(
        (res: ProductDetail) => {
          this.snack.open(
            'Successfully Edit Informations For Product ID: ' +
              this.prodDetail.id,
            'OK',
            {
              panelClass: ['sc-snackbar'],
              verticalPosition: 'top',
            }
          );
          this.reload();
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

  editProdEDetail(editProdEDetailForm: NgForm) {
    this.prodService
      .editProdDetailE(this.prodDetailE, this.prodDetailE.id)
      .subscribe(
        (res: ProductElseDetail) => {
          this.snack.open(
            'Successfully Edit Informations For Product ID: ' +
              this.prodDetail.id,
            'OK',
            {
              panelClass: ['sc-snackbar'],
              verticalPosition: 'top',
            }
          );
          this.reload();
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
}
