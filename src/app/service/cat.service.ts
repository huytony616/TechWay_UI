import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class CatService {
    constructor(private readonly http: HttpClient) {}
    
    getAllCat():Observable<any[]>{
        return this.http.get<any>("http://localhost:8080/api/v1/categories");
    }
}