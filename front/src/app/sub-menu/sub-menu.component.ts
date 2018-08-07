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
  }

  navegar(category,event){
    $(".pestaña").css({border:"1px solid blueviolet",height:"5vh"})
    $(event.currentTarget).css({
      "border-bottom":"3px solid blueviolet",
      height:"7vh"
    })
    this.router.navigate(['/recos',category])
  }

}
