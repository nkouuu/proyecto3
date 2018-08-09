import { Component, OnInit } from "@angular/core";
import { RecosService } from "../../services/recos.service";
import { SessionService } from "../../services/session.service";
import * as $ from "jquery";
import { AlertsService } from "../../services/alertsService.service";
import { FileUploader } from "../../../node_modules/ng2-file-upload";
import { Router } from "../../../node_modules/@angular/router";
import { environment} from '../../environments/environment';
const {BASEURL} = environment

@Component({
  selector: "app-new-reco",
  templateUrl: "./new-reco.component.html",
  styleUrls: ["./new-reco.component.scss"]
})
export class NewRecoComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${BASEURL}/api/recos`,
    method: "POST"
  });
  feedback;

  userEdit: Object = {
    username: "",
    email: "",
    name: "",
    password: ""
  };
  constructor(
    public rS: RecosService,
    public sessionService: SessionService,
    public aS: AlertsService,
    public router:Router
  ) {}

  ngOnInit() {
    var element = $(".newRecoButton"),
      originalY = element.offset().top;
    console.log("elemento" + element);
    // Space between element and top of screen (when scrolling)
    var topMargin = 120;

    // Should probably be set in CSS; but here just for emphasis
    element.css("position", "relative");

    $(window).on("scroll", function(event) {
      var scrollTop = $(window).scrollTop();

      $(".newRecoButton")
        .stop()
        .animate(
          {
            top: scrollTop < originalY ? 0 : scrollTop - originalY + topMargin
          },
          100
        );
    });

    this.uploader.onSuccessItem = (item, response:any) => {
      this.rS.getRecos().subscribe(recos=>this.rS.recosChange.emit(recos))
      this.aS.newReco(response.author, response._id);

      this.feedback = JSON.parse(response).message;

    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  newReco(content,category,video) {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("content", content);
      form.append("category", category);
      if(video){
      video =video.replace("watch?v=","embed/")
      form.append("video", video);
      }

    };
    if(this.uploader.queue.length==0){
      this.rS.newReco(content,category,video).subscribe((r)=>{
        this.aS.newReco(this.sessionService.user._id,r._id );

      })
    }else{
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = r => {
        this.rS.getRecos().subscribe(recos=>this.rS.recosChange.emit(recos))

    };
  }
  }

  toggleHide(n) {
    $(".newRecoButton").toggleClass("d-none");
    $(".newRecoFormDiv").toggleClass("d-none");
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
  
}
