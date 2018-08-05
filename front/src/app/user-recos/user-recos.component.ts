import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { RecosService } from '../../services/recos.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-recos',
  templateUrl: './user-recos.component.html',
  styleUrls: ['./user-recos.component.scss']
})
export class UserRecosComponent implements OnInit {
  @Input() user:any ={}
  @Input() section:string="recos"
  constructor(public sessionService:SessionService,public rS:RecosService,public uS:UsersService) { 
    this.rS.recosChange.subscribe(r=>{
      this.user.recos=r.filter(e=>e.author._id==this.user._id);

      this.user.likes=r.filter(e=>e.likes.includes(this.user._id));
    })
  }

  ngOnInit() {
  }

}
