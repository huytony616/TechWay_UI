import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userService.isLoggedIn()) {
        const role = route.data['roles'] as Array<string>;
        if (role) {
          const match = this.userService.roleMatch(role);
          console.log('fsdhjbfdsbhjbjfdkshdfjsbkdsfjbkhfdbhsj');
          
          if (match) {
            return true;
          } else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
      }
      return true;
  }
}
