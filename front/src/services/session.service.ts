import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';

import {map, catchError} from 'rxjs/operators';
import { Observable } from "../../node_modules/rxjs";
import { of } from 'rxjs';
import { Router } from "../../node_modules/@angular/router";
import { UsersService } from "./users.service";


const {BASEURL} = environment;

interface UserObject{
  username:string,
  password:string
}


@Injectable()
export class SessionService {

  message:string=""
  user:any={notifications:[],followers:[]};

  options:object = {withCredentials:true};

  constructor(private http:Http,private router:Router,public usersService:UsersService) {
    this.isLogged().subscribe(user=>{
      this.user=user;
      this.usersService.usersChange.subscribe(u=>this.user=u)
    });
  }

  isLogged(){
    return this.http.get(`${BASEURL}/api/loggedin`,this.options).pipe(
      map( (res:Response) => {
        this.user = res.json();
        //console.log(`Automatically login ${this.user.username}`);
        return this.user;
      }),
      catchError(e => {console.log("You have to login first!"); return of(null)})
    );
  }


  errorHandler(e){
    console.log('SessionServiceError')
    var {message} =JSON.parse(e._body)
    this.message=message
    return message;
  }

  signup(username:string, password:string,email:string,name:string): Observable<object>{
    return this.http.post(`${BASEURL}/api/signup`,{username,password,email,name},this.options).pipe(
      map( (res:Response) => {
        let data = res.json();

        this.user = data;
        this.usersService.usersChange.emit(data)

        this.router.navigate(["/home"])
        return this.user;
      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }

  login(username:string, password:string): Observable<object>{
    return this.http.post(`${BASEURL}/api/login`,{username,password},this.options).pipe(
      map( (res:Response) => {
        let user = res.json();
        this.user = user;
        this.usersService.usersChange.emit(user)

        this.router.navigate(["/home"])


        return this.user;
      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }

  logout(){
    return this.http.get(`${BASEURL}/api/logout`,this.options).pipe(
      map( (res:Response) => {
        this.user = null;
        this.usersService.usersChange.emit(null)
        this.router.navigate(["/"])

      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }

}