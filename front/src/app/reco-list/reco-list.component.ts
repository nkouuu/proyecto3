import { Component, OnInit, Input } from "@angular/core";
import { RecosService } from "../../services/recos.service";
import { SessionService } from "../../services/session.service";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import * as $ from "jquery";
import { AlertsService } from "../../services/alertsService.service";

@Component({
  selector: "app-reco-list",
  templateUrl: "./reco-list.component.html",
  styleUrls: ["./reco-list.component.scss"]
})
export class RecoListComponent implements OnInit {
  recos: any = [];
  category: string = "All";
  constructor(
    public rS: RecosService,
    public sessionService: SessionService,
    public route: ActivatedRoute,
    public aS:AlertsService
  ) {
    this.route.params.subscribe(params => {
      if (params["category"]) this.category = params["category"];
    });
    this.rS.getRecos().subscribe(recos => {
      this.recos = recos;

      this.rS.recosChange.subscribe(r => {
        
        this.recos=r;
      });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      $(".categorySpan").each(e => {

        if ($(this).text() == params["category"]) {
          $(this).parent().css({
            "border-bottom": "3px solid blueviolet",
            height: "7vh"
          });
        }
      });
      
    });
    
  }

  likeReco(liker,liked,id){
    
    var reco = this.rS.recos.find(e => e._id == id);
    var type =""
    if(reco.likes.includes(this.sessionService.user._id)){
      type="unlike"
    }else{
      type="like"
    }
    this.rS.likeReco(type,id).subscribe(r=>{if(type=="like")this.aS.sendLike(this.sessionService.user._id,reco.author._id,reco._id)});

  }

  
}
