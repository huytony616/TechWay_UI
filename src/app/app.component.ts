import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TechWay-Admin';
  helper = new JwtHelperService();
  str : string = '';
  givRole: string[]=[];
  acpRole:string[]=['ROLE_DIRE','ROLE_STAFF'];
  constructor(private authSVC: UserService,private router : Router) {}

  ngOnInit(): void {
    const Token = localStorage.getItem('jwtToken');
    if (this.authSVC.isLoggedIn() && Token != null) {
      const dcdToken = this.helper.decodeToken(Token);

      this.str = dcdToken.roles;
      this.givRole = this.str.substring(1,this.str.length-1).split(',');
      console.log(this.givRole);
      const containsAny = this.givRole.every(item => this.acpRole.includes(item));
      if (containsAny) {
        this.authSVC.decodedToken = dcdToken;
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/403']);
      }
    }else{
      this.router.navigate(['/signin']);
    }
  }
}
