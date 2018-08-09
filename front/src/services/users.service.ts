import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';

import {map, catchError} from 'rxjs/operators';
import { Observable } from "../../node_modules/rxjs";
import { of } from 'rxjs';
import { Router } from "../../node_modules/@angular/router";
import * as _ from "lodash"

const {BASEURL} = environment;




@Injectable()
export class UsersService {

  options:object = {withCredentials:true};
  usersChange:EventEmitter<any> = new EventEmitter()
  constructor(private http:Http,private router:Router) {
      
  }

  

  

  /*getRecos(){
    return this.http.get(`${BASEURL}/api/recos`,this.options).pipe(
      map( (res:Response) => {
        this.recos = res.json();
        console.log(`Recos obteined successfully`);
        return this.recos;
      }),
      catchError(e => {console.log("Error getting recos"); return of(e)})
    );
  }*/

  getUser(id){
    return this.http.get(`${BASEURL}/api/users/${id}`,this.options).pipe(
      map( (res:Response) => {
        console.log(`User obteined successfully`);
        return res.json();
      }),
      catchError(e => {console.log("Error getting user"); return of(e)})
    );
  }

  editUser(user){
    return this.http.post(`${BASEURL}/api/users/`,{username:user.username,password:user.password,email:user.email,name:user.name},this.options).pipe(
      map( (res:Response) => {
        console.log(`User edited successfully`);
        this.usersChange.emit(res.json())
        return res.json();
      }),
      catchError(e => {console.log("Error editing user"); return of(e)})
    );
  }


  followUser(followerId,followedId){
    return this.http.post(`${BASEURL}/api/users/follow/${followerId}/${followedId}`,this.options).pipe(
        map( (res:Response) => {
          console.log(`User followed successfully`);
          this.usersChange.emit(res.json())
          return res.json();
        }),
        catchError(e => {console.log("Error following user"); return of(e)})
      );
  }

  unfollowUser(followerId,followedId){
    return this.http.post(`${BASEURL}/api/users/unfollow/${followerId}/${followedId}`,this.options).pipe(
        map( (res:Response) => {
          console.log(`User unfollowed successfully`);
          this.usersChange.emit(res.json())
          return res.json();
        }),
        catchError(e => {console.log("Error unfollowing user"); return of(e)})
      );
  }

  cleanNotifications(userId,notificationId){
      var rest=""
      if(notificationId) rest="/" + notificationId;
    return this.http.patch(`${BASEURL}/api/users/cleanNotifications/${userId}${rest}`,this.options).pipe(
        map( (res:Response) => {
          console.log(`Clean notifications successfully`);
          this.usersChange.emit(res.json())
          return res.json();
        }),
        catchError(e => {console.log("Error cleaning notifications"); return of(e)})
      );
  }
  

}