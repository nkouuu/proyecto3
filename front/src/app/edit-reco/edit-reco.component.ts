import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { RecosService } from '../../services/recos.service';
import { SessionService } from '../../services/session.service';
import { FileUploader } from '../../../node_modules/ng2-file-upload';
import {environment} from '../../environments/environment'

const {BASEURL} = environment
@Component({
  selector: 'app-edit-reco',
  templateUrl: './edit-reco.component.html',
  styleUrls: ['./edit-reco.component.scss']
})
export class EditRecoComponent implements OnInit {
  reco:any ={}
  uploader: FileUploader = new FileUploader({
    url: `${BASEURL}/api/recos`,
    method: 'PATCH'
  });
  feedback;

  recoEdit: any = {
    content:"",
    category:"",
    video: '',
    
  };

  constructor(public route:ActivatedRoute,public rS:RecosService,public sessionService:SessionService,public router:Router) {
    this.route.params.subscribe(params=>{
      this.rS.getReco(params["id"]).subscribe(r=>this.reco=r)
      this.rS.recosChange.subscribe(r=>{
        var reco=r.find(e=>e._id==this.reco._id)
        if(reco){
        this.reco=reco
        }
      })
    })
   }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      
      
      this.rS.getRecos().subscribe(recos=>this.rS.recosChange.emit(recos))

      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
    
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

  editReco(content,category,video,id){
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('content', content);
      form.append('category', category);
      form.append('video', video);
      form.append('id', id);

    };
    if(this.uploader.queue.length==0){
      this.rS.editReco(id,content,category,video).subscribe(reco=>this.rS.getRecos().subscribe(r=>this.rS.recosChange.emit(r)))
    }else{
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (user) => {
      };
    }
    
  }
}
