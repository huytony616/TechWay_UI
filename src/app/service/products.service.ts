import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductDetail } from 'src/app/model/prodLTDetails.model';
import { ProductElseDetail } from 'src/app/model/prodDetails.model';
import { fullProduct } from '../model/fullProduct.model';
import { fullProductE } from '../model/fullProductE.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  addProd(prod: Product) {
    console.log(prod);
    return this.http.post<Product>(
      'http://localhost:8080/api/v1/products',
      prod
    );
  }

  getAllProd() {
    return this.http.get<Product[]>(
      'http://localhost:8080/api/v1/products/name'
    );
  }

  delProd(id: number) {
    return this.http.delete<Product[]>(
      'http://localhost:8080/api/v1/products/' + id
    );
  }

  editProd(prod: Product, id: number) {
    return this.http.put<Product>(
      'http://localhost:8080/api/v1/products/' + id,
      prod
    );
  }

  editProdDetail(prodDetail: ProductDetail, id: number) {
    return this.http.put<ProductDetail>(
      'http://localhost:8080/api/v1/laptopdetails/' + id,
      prodDetail
    );
  }
  
  editProdDetailE(prodDetail: ProductElseDetail, id: number) {
    return this.http.put<ProductElseDetail>(
      'http://localhost:8080/api/v1/phone-details/' + id,
      prodDetail
    );
  }

  getScrTech() {
    return this.http.get<[]>('http://localhost:8080/api/v1/screentechs');
  }

  getCamFet() {
    return this.http.get<[]>('http://localhost:8080/api/v1/camera-featurers');
  }

  getSpcFet() {
    return this.http.get<[]>('http://localhost:8080/api/v1/special-features');
  }

  getAdcSec() {
    return this.http.get<[]>('http://localhost:8080/api/v1/advanced-securities');
  }

  addProdDetail(prodDetail: ProductDetail, id: any) {
    return this.http.post<ProductDetail>(
      'http://localhost:8080/api/v1/laptopdetails/' + id,
      prodDetail
    );
  } 
  
  addProdEDetail(prodEDetail: ProductElseDetail, id: any) {
    return this.http.post<ProductElseDetail>(
      'http://localhost:8080/api/v1/phone-details/' + id,
      prodEDetail
    );
  }

  getProdDetail(id: any) {
    return this.http.get<fullProduct>(
      'http://localhost:8080/api/v1/laptopdetails/' + id
    );
  }
  
  getProdEDetail(id: any) {
    return this.http.get<fullProductE>(
      'http://localhost:8080/api/v1/phone-details/' + id
    );
  }
  
  getReportRevenue() {
    return this.http.get<any>(
      'http://localhost:8080/api/v1/report/monthly-sales'
    );
  }
  
  getReportCatMonthRevenue() {
    return this.http.get<any>(
      'http://localhost:8080/api/v1/report/total-by-category-month'
    );
  }


}
