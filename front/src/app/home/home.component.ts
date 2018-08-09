import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(".navbar").addClass("full")
  }

  recoger(){
    $(".navbar").css({
          

      'animation':"recoger 2s 1",
      'animation-play-state':"running"
    })
    $('.navbar').bind('webkitAnimationEnd', function(){
      this.style.webkitAnimationName = '';
  });
    setTimeout(()=>{
      $(".navbar").removeClass("full")
    },100)
  }

}
