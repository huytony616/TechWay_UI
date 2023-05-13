"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthInterceptor = void 0;
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(userAuthService, router) {
        this.userAuthService = userAuthService;
        this.router = router;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }
        var token = this.userAuthService.getToken();
        req = this.addToken(req, token);
        return next.handle(req).pipe(operators_1.catchError(function (err) {
            console.log(err.status);
            if (err.status === 401) {
                _this.router.navigate(['/login']);
            }
            else if (err.status === 403) {
                _this.router.navigate(['/forbidden']);
            }
            return rxjs_1.throwError("Some thing is wrong");
        }));
    };
    AuthInterceptor.prototype.addToken = function (request, token) {
        return request.clone({
            setHeaders: {
                Authorization: "Bearer " + token
            }
        });
    };
    AuthInterceptor = __decorate([
        core_1.Injectable()
    ], AuthInterceptor);
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
