import { Component, OnInit, Input } from "@angular/core";
import { RecosService } from "../../services/recos.service";
import { SessionService } from "../../services/session.service";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import * as $ from "jquery";
import { AlertsService } from "../../services/alertsService.service";
import { DomSanitizer } from "../../../node_modules/@angular/platform-browser";

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
    public aS:AlertsService,
    public sanitizer: DomSanitizer
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
    this.rS.likeReco(type,id).subscribe(r=>{
      if(type=="like"){
        this.aS.sendLike(this.sessionService.user._id,reco.author._id,reco._id);
        
      }
    });

  }


  showMedia(event){
    var e= $(event.target).parent().parent()
    if($(event.target).hasClass("fa-angle-down")){
      $(e).find(".picture").removeClass("d-none")
      $(e).find(".video").removeClass("d-none")
      $(event.target).addClass("d-none")
      $(event.target).parent().find(".fa-angle-up").removeClass("d-none")

    }else{
      $(e).find(".picture").addClass("d-none")
      $(e).find(".video").addClass("d-none")
      $(event.target).addClass("d-none")
      $(event.target).parent().find(".fa-angle-down").removeClass("d-none")

    }
  }

  
}
