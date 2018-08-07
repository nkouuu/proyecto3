import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { RecosService } from '../../services/recos.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-edit-reco',
  templateUrl: './edit-reco.component.html',
  styleUrls: ['./edit-reco.component.scss']
})
export class EditRecoComponent implements OnInit {
  @Input() reco ={}
  constructor(public route:ActivatedRoute,public rS:RecosService,public sessionService:SessionService) {
    
   }

  ngOnInit() {
  }

  toggleHide(n) {
    $(".edit").toggleClass("d-none");
    if (n == 0) {
      $("body").css({
        overflow: "hidden"
      });
    } else {
      $("body").css({
        overflow: "scroll"
      });
    }
  }

  editReco(){
    
  }
}
