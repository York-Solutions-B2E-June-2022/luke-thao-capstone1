
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {DataService} from "../data.service";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthGuardLoggedIn implements CanActivate {

  constructor(private dataService: DataService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.dataService.user) {
      this.router.navigate([''])
      return false
    }

    return true
  }

}
