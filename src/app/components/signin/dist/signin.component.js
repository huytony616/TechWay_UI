"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SigninComponent = void 0;
var core_1 = require("@angular/core");
var SigninComponent = /** @class */ (function () {
    function SigninComponent(imgbbService, userSVC, snack, router) {
        this.imgbbService = imgbbService;
        this.userSVC = userSVC;
        this.snack = snack;
        this.router = router;
        this.imgLst = { imgItem: [] };
        this.user = {
            id: -1,
            email: '',
            enable: false,
            password: '',
            fullname: '',
            photo: ''
        };
    }
    SigninComponent.prototype.signup = function (signupForm) {
        var _this = this;
        console.log(this.user);
        this.userSVC.signIn(this.user).subscribe(function (res) {
            _this.snack.open('You\'ve Logged In', 'OK', {
                panelClass: ['sc-snackbar'],
                verticalPosition: 'top'
            });
            _this.userSVC.setToken(res.accessToken);
            _this.router.navigate(['/TechWay']);
            console.log(res);
        }, function (err) {
            console.log(err);
            _this.snack.open('Fail With Error: ' + err.name + '\n Message: ' + err.message, 'OK', {
                panelClass: ['dg-snackbar'],
                verticalPosition: 'top'
            });
        });
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            templateUrl: './signin.component.html',
            styleUrls: ['./signin.component.css']
        })
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
