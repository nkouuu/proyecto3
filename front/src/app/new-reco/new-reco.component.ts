import { Component, OnInit } from "@angular/core";
import { RecosService } from "../../services/recos.service";
import { SessionService } from "../../services/session.service";
import * as $ from "jquery";
@Component({
  selector: "app-new-reco",
  templateUrl: "./new-reco.component.html",
  styleUrls: ["./new-reco.component.scss"]
})
export class NewRecoComponent implements OnInit {
  constructor(public rS: RecosService, public sessionService: SessionService) {}

  ngOnInit() {
    var element = $(".newRecoButton"),
      originalY = element.offset().top;
    console.log("elemento" + element);
    // Space between element and top of screen (when scrolling)
    var topMargin = 20;

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
          300
        );
    });
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
