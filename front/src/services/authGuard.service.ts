import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "../../node_modules/@angular/router";
import { SessionService } from "./session.service";
import { map } from "../../node_modules/rxjs/operators";
import { Injectable } from "../../node_modules/@angular/core";
import { Observable } from "../../node_modules/rxjs";

@Injectable()
export class isLoggedGuardService implements CanActivate {
  constructor(public sessionService: SessionService,public router:Router) {}

  canActivate(
     route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): Observable<boolean> {
    return this.sessionService.isLogged().pipe(
      map(user => {
        if(user) return true;else{
          this.router.navigate(['/login'])
          .then(()=>console.log("navigated to home on guard"))
          return false
        }
      })
    );
  }
}
