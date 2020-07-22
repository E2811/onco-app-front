import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private auth: DataService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.getLoggedValue()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
