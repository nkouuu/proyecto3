import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public sessionService:SessionService,public uS:UsersService) { 
    this.uS.usersChange.subscribe(u=>{
      if(u){
        console.log("entra")
        
        $(".navbar").css({
          

          animation:"recoger 2s 1",
        })
        setTimeout(()=>{
          $(".navbar").removeClass("full")
        },2000)
      }else{
        $(".navbar").addClass("full")
      }
    })
  }

  ngOnInit() {
    setTimeout(()=>{if(!this.sessionService.user){
      console.log("entra")
      $(".navbar").addClass("full")
    }},100)
  }


 
}
