import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public sessionService:SessionService,public uS:UsersService) { }

  ngOnInit() {
  }


 
}
