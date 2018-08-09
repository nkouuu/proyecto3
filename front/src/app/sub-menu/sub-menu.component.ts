import { Component, OnInit, Input } from '@angular/core';
import { RecosService } from '../../services/recos.service';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  @Input() category ="All"
  constructor(public rS:RecosService,public sessionService:SessionService,public router:Router) { }

  ngOnInit() {
    setTimeout(()=>{
      var spans = document.getElementsByClassName("categorySpan")
      for(let i=0;i<spans.length;i++){
        console.log(spans[i])
        if (spans[i].innerHTML == this.category) {
          $(spans[i]).parent().css({
            background: 'white',
            border:"0",
            'border-right':"1px solid blueviolet",
            'border-left':"1px solid blueviolet"
          })
        }
        if(spans[i].innerHTML == "Movie"){
          $(spans[i]).parent().css({
           
            'border-left':"0"
          })
        }
        if(spans[i].innerHTML == "Util"){
          $(spans[i]).parent().css({
           
            'border-right':"0"
          })
        }
      }
    },20)
    
  }

  navegar(category,event){
    $(".pestaña").css({'border':"0","border-bottom":"1px solid blueviolet",height:"5vh",background:'rgb(250, 248, 248)'})
    $(event.currentTarget).css({
      background: 'white',
      border:"0",
      'border-right':"1px solid blueviolet",
      'border-left':"1px solid blueviolet"
      //height:"7vh"
    })
    if($(event.currentTarget).text() == "Movie"){
      $(event.currentTarget).css({
       
        'border-left':"0"
      })
    }
    if($(event.currentTarget).text() == "Util"){
      $(event.currentTarget).css({
       
        'border-right':"0"
      })
    }
    this.router.navigate(['/recos',category])
  }

}
