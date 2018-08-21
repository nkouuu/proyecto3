import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
    $(".navbar").addClass("full")
  }

  recoger(category){
    $(".navbar").css({
          

      'animation':"recoger 1s 1",
      'animation-play-state':"initial",
      'animation-fill-mode': 'forwards'

    })
    $('.navbar').bind('webkitAnimationEnd', function(){
      this.style.webkitAnimationName = '';
  });
    setTimeout(()=>{
      $(".navbar").removeClass("full")
    },100)
    this.router.navigate(['/recos',category])

  }

}
