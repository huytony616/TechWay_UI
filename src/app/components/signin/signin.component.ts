import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageList } from 'src/app/model/imageList.model';
import { User } from 'src/app/model/user.model';
import { ImgBBUploadService } from 'src/app/service/imgbb.service';
import { UserService } from "src/app/service/user.service";
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {

  imgLst: ImageList = { imgItem: [] };

  constructor(
    private imgbbService: ImgBBUploadService,
    private userSVC: UserService,
    private snack: MatSnackBar,
    private router : Router,
  ){}
  user : User = {
    id: -1,
    email: '',
    enable: false,
    password: '',
    fullname: '',
    photo: ''
  }

  signin(signupForm: NgForm){
    this.userSVC.signIn(this.user).subscribe(
      (res: any) => {
        this.snack.open(
          'You\'ve Logged In',
          'OK',
          {
            panelClass: ['sc-snackbar'],
            verticalPosition: 'top',
          }
        );
        this.userSVC.setToken(res.accessToken);
        this.router.navigate(['/dashboard']);
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
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
