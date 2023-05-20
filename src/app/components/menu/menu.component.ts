import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router, public authSVC: UserService) {}

  img: string = '';
  logout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  ngOnInit(): void {
    this.img = this.authSVC.decodedToken.photo.split('>')[0];
    console.log(this.authSVC.decodedToken);
  }
}
