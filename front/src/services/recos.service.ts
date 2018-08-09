import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';

import {map, catchError} from 'rxjs/operators';
import { Observable } from "../../node_modules/rxjs";
import { of } from 'rxjs';
import { Router } from "../../node_modules/@angular/router";
import * as _ from "lodash"
import { SessionService } from "./session.service";
import { AlertsService } from "./alertsService.service";

const {BASEURL} = environment;




@Injectable()
export class RecosService {

  recos:any=[];
  options:object = {withCredentials:true};
  categories:any = ["Movie","Music","Anime","Travel","Util"]
  category:any="All"
  recosChange:EventEmitter<any> = new EventEmitter()
  constructor(private http:Http,private router:Router,public sessionService:SessionService) {
      this.getRecos().subscribe(recos=>{

      })
  }

  

  

  getRecos(){
    return this.http.get(`${BASEURL}/api/recos`,this.options).pipe(
      map( (res:Response) => {
        this.recos = res.json();
        console.log(`Recos obteined successfully`);
        return this.recos;
      }),
      catchError(e => {console.log("Error getting recos"); return of(e)})
    );
  }

  getReco(id){
    return this.http.get(`${BASEURL}/api/recos/${id}`,this.options).pipe(
      map( (res:Response) => {
        this.recos.push(res.json());
        console.log(`Reco obteined successfully`);
        return res.json();
      }),
      catchError(e => {console.log("Error getting reco"); return of(e)})
    );
  }

  newReco(content,category,video){
    return this.http.post(`${BASEURL}/api/recos`,{content,category,video},this.options).pipe(
      map( (res:Response) => {
        
        this.getRecos().subscribe(recos=>{
          this.recos=recos
          this.recosChange.emit(recos)

        })
        console.log(`Reco added successfully`);
        return res.json();
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
  editReco(id,content,category,video){
    return this.http.patch(`${BASEURL}/api/recos/${id}`,{id,content,category,video},this.options).pipe(
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

  newReply(replier,replied,id,content){
    return this.http.post(`${BASEURL}/api/replies/${id}`,{content},this.options).pipe(
        map( (res:Response) => {
          this.getRecos().subscribe(recos=>{
            this.recos=recos
            this.recosChange.emit(recos)
          })
          console.log(`Reply added successfully`);
          return res.json();
        }),
        catchError(e => {console.log("Error adding reply"); return of(e)})
      );
  }

  likeReco(type,id){
    
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
  }

}