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
  recosChange:EventEmitter<any> = new EventEmitter()
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
        console.log(res.json())
        return res.json();
      }),
      catchError(e => {console.log("Error getting user"); return of(e)})
    );
  }

  /*newReco(content,category){
    return this.http.post(`${BASEURL}/api/recos`,{content,category},this.options).pipe(
      map( (res:Response) => {
        console.log(this.recos)

        this.getRecos().subscribe(recos=>{
          this.recos=recos
          this.recosChange.emit(recos)

        })
        console.log(`Reco added successfully`);
        return this.recos;
      }),
      catchError(e => {console.log("Error adding reco"); return of(e)})
    );
  }

  removeReco(id){
    return this.http.delete(`${BASEURL}/api/recos/${id}`,this.options).pipe(
      map( (res:Response) => {
        this.recos = this.recos.filter(e=>e._id!=id);
        this.recosChange.emit(this.recos)
        return this.recos
      }),
      catchError(e => {console.log("Error getting reco"); return of(e)})
    );
  }
  editReco(id,content,category){
    return this.http.patch(`${BASEURL}/api/recos/${id}`,{content,category},this.options).pipe(
      map( (res:Response) => {
          var reco = res.json()
          this.recos.forEach(e => {
              if(e._id==reco._id) e = reco;
          });
        
        return reco
      }),
      catchError(e => {console.log("Error getting reco"); return of(e)})
    );
  }

  newReply(id,content){
    return this.http.post(`${BASEURL}/api/replies/${id}`,{content},this.options).pipe(
        map( (res:Response) => {
          this.getRecos().subscribe(recos=>{
            this.recos=recos
            this.recosChange.emit(recos)
          })
          console.log(`Reply added successfully`);
          return this.recos;
        }),
        catchError(e => {console.log("Error adding reply"); return of(e)})
      );
  }

  likeReco(id,type:string){
    return this.http.get(`${BASEURL}/api/recos/${id}/${type}`,this.options).pipe(
      map( (res:Response) => {
        this.getRecos().subscribe(recos=>{
          console.log(`${type} successfully`);
          this.recosChange.emit(recos)
          return recos;
        })
        
      }),
      catchError(e => {console.log(`Error ${type}ing reco`); return of(e)})
    );
  }*/

}