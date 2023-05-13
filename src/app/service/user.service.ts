import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "src/app/model/user.model";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  helper = new JwtHelperService();
  decodedToken:any;

  constructor(private http:HttpClient) {}

    public setRoles(roles: []) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  
    public getRoles(): [] {
      return JSON.parse(localStorage.getItem('roles') || '{}');
    }
  
    public setToken(jwtToken: string) {
      localStorage.setItem('jwtToken', jwtToken);
      this.decodedToken = this.helper.decodeToken(localStorage.getItem('jwtToken') || '{}');
      console.log(this.decodedToken);
      
    }
  
    public getToken(): string {
      return localStorage.getItem('jwtToken') || '{}';
    }
  
    public clear() {
      localStorage.clear();
    }
  
    public isLoggedIn() {
      const Token = localStorage.getItem('jwtToken');
      return !this.helper.isTokenExpired(Token) && this.getToken();
    }

  loginWithEmail(userInfo:any){
    return this.http.post("",userInfo);
  }

  signUp(user : User){
    return this.http.post<User>(
      'http://localhost:8080/api/v1/auth/registration',
      user
    );
  }
  
  signIn(user : User){
    return this.http.post<User>(
      'http://localhost:8080/api/v1/auth/login',
      user,{
        headers: this.requestHeader,
      }
    );
  }

  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: any = this.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}
