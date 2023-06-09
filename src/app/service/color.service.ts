import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ColorService {
    constructor(private http: HttpClient) {}
    
    getAllColor(){
        return this.http.get<[]>("http://localhost:8080/api/v1/colors");
    }
}