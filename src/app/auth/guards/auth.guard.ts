import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( 
    private router: Router 
  ){}
 
  canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if( !localStorage.getItem('token') ) {
      return this.router.navigate(['./auth/login']);
    }
      
    return true
  }

  canLoad(
  route: Route,
  segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    if( !localStorage.getItem('token') ) {
      return this.router.navigate(['./auth/login']);
    }

    return true

  }
}
