import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { RecosService } from "../../services/recos.service";
import { ActivatedRoute } from "../../../node_modules/@angular/router";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: any = {recos:"",likes:""};
  section:string ="Recos"
  recos: any = [];
  likes:any =[]
  constructor(
    public sessionService: SessionService,
    public rS: RecosService,
    public route: ActivatedRoute,
    public uS: UsersService
  ) {
    this.route.params.subscribe(params => {
      const id = params["id"];

      this.uS.getUser(id).subscribe(user => {
        this.user = user;
        /*this.recos=user.recos
        this.likes = user.likes*/

        this.rS.getRecos().subscribe(recos => {
          this.recos = recos.filter(e => e.author == this.user._id);
          this.rS.recosChange.subscribe(r=>this.recos=r)
        });
      });
    });
  }

  ngOnInit() {}
}
