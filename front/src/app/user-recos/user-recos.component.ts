import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { RecosService } from '../../services/recos.service';
import { UsersService } from '../../services/users.service';
import { AlertsService } from '../../services/alertsService.service';

@Component({
  selector: 'app-user-recos',
  templateUrl: './user-recos.component.html',
  styleUrls: ['./user-recos.component.scss']
})
export class UserRecosComponent implements OnInit {
  @Input() user:any ={}
  @Input() section:string="recos"
  constructor(public sessionService:SessionService,public rS:RecosService,public uS:UsersService,public aS:AlertsService) { 
    this.rS.recosChange.subscribe(r=>{
      this.user.recos=r.filter(e=>e.author._id==this.user._id);

      this.user.likes=r.filter(e=>e.likes.includes(this.user._id));
    })
  }

  ngOnInit() {
  }
  likeReco(liker,liked,id){
    
    var reco = this.rS.recos.find(e => e._id == id);
    var type =""
    if(reco.likes.includes(this.sessionService.user._id)){
      type="unlike"
    }else{
      this.aS.sendLike(liker,liked,id)
      type="like"
    }
    this.rS.likeReco(type,id).subscribe(r=>{if(type=="like")this.aS.sendLike(this.sessionService.user._id,reco.author._id,reco._id)});

  }

}
