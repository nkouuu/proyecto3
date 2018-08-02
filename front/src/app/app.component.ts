import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { RecosService } from '../services/recos.service';
import { Router } from '../../node_modules/@angular/router';
import * as $ from 'jquery'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  constructor(public sessionService:SessionService,public rS:RecosService,public router:Router){
 }

 home(){
   this.router.navigate(['/'])
 }

 
}
