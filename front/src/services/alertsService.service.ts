import { Injectable } from "../../node_modules/@angular/core";
import * as io from "socket.io-client";
import { SessionService } from "./session.service";
import { Observable } from "../../node_modules/rxjs";
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig
} from "../../node_modules/ng-snotify";
import { UsersService } from "./users.service";
import { RecosService } from "./recos.service";

@Injectable()
export class AlertsService {
  socket: SocketIOClient.Socket;
  user: any = {};
  constructor(
    public sessionService: SessionService,
    private snotifyService: SnotifyService,
    public uS: UsersService,
    public rS: RecosService
  ) {
    // Connect to websocket for chat
    this.socket = io("localhost:3000");
    this.socket.on("connect", () => {
      this.sessionService.isLogged().subscribe(user => {
        if (user) {
          this.user = user;

          this.socket.emit("id", { id: user._id });
          console.log("Connected to WS");
          this.socket.on(`${this.user._id}`, data => {
            switch (data.type) {
              case "follow":
                this.title = "New follower!";
                break;
              case "like":
                this.title = "New like!";
                break;
              case "reply":
                this.title = "New reply!";
                break;
            }
            this.onSuccess();
            this.uS
              .getUser(this.sessionService.user._id)
              .subscribe(user => this.uS.usersChange.emit(user));
          });
        }
      });
      this.socket.on("reloadRecos", data => {
        this.rS.getRecos().subscribe(recos => {
          this.rS.recosChange.emit(recos);
        });
      });
    });

    // Save messages into array as they arrive from server
    /*this.socket.on('Follow',(data) => {
      
    })*/
  }

  sendFollow(followerId, followedId) {
    console.log(`Sending alert to -> ${followedId}`);
    console.log(`follower ${followerId}`);
    console.log(`followed ${followedId}`);
    if (followerId != followedId)
      this.socket.emit("follow", { followerId, followedId });
  }
  sendLike(likerId, likedId, recoId) {
    console.log(`Sending alert to -> ${likedId}`);
    console.log(`follower ${likerId}`);
    console.log(`followed ${likedId}`);
    if (likerId != likedId)
      this.socket.emit("like", { likerId, likedId, recoId });
  }
  sendReply(replierId, repliedId, recoId) {
    console.log(`Sending alert to -> ${repliedId}`);
    console.log(`follower ${replierId}`);
    console.log(`followed ${repliedId}`);
    if (replierId != repliedId)
      this.socket.emit("reply", { replierId, repliedId, recoId });
  }
  newReco(userId, recoId) {
    console.log(`Sending alert new post`);
    console.log(` from ${userId}`);

    this.socket.emit("newReco", { userId, recoId });
  }

  //title ="Notification"
  //style = 'material';
  title = "New follower!";
  body = "";
  timeout = 8000;
  position: SnotifyPosition = SnotifyPosition.rightTop;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = true;
  backdrop = -1;
  dockMax = 1;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 15;
  bodyMaxLength = 50;

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  onSuccess() {
    this.snotifyService.success(this.body, this.title, this.getConfig());
  }
  onInfo() {
    this.snotifyService.info(this.body, this.title, this.getConfig());
  }
  onError() {
    this.snotifyService.error(this.body, this.title, this.getConfig());
  }
  onWarning() {
    this.snotifyService.warning(this.body, this.title, this.getConfig());
  }
  onSimple() {
    // const icon = `assets/custom-svg.svg`;
    const icon = `https://placehold.it/48x100`;

    this.snotifyService.simple(this.body, this.title, {
      ...this.getConfig(),
      icon: icon
    });
  }

  onAsyncLoading() {
    const errorAction = Observable.create(observer => {
      setTimeout(() => {
        observer.error({
          title: "Error",
          body: "Example. Error 404. Service not found"
        });
      }, 2000);
    });

    const successAction = Observable.create(observer => {
      setTimeout(() => {
        observer.next({
          body: "Still loading....."
        });
      }, 2000);

      setTimeout(() => {
        observer.next({
          title: "Success",
          body: "Example. Data loaded!",
          config: {
            closeOnClick: true,
            timeout: 5000,
            showProgressBar: true
          }
        });
        observer.complete();
      }, 5000);
    });
    /*
      You should pass Promise or Observable of type Snotify to change some data or do some other actions
      More information how to work with observables:
      https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/create.md
     */
    const { timeout, ...config } = this.getConfig(); // Omit timeout
    this.snotifyService.async(
      "This will resolve with error",
      "Async",
      errorAction,
      config
    );
    this.snotifyService.async(
      "This will resolve with success",
      successAction,
      config
    );
    this.snotifyService.async(
      "Called with promise",
      "Error async",
      new Promise((resolve, reject) => {
        setTimeout(
          () =>
            reject({
              title: "Error!!!",
              body: "We got an example error!",
              config: {
                closeOnClick: true
              }
            }),
          1000
        );
        setTimeout(() => resolve(), 1500);
      }),
      config
    );
  }

  onConfirmation() {
    /*
    Here we pass an buttons array, which contains of 2 element of type SnotifyButton
     */
    const { timeout, closeOnClick, ...config } = this.getConfig(); // Omit props what i don't need
    this.snotifyService.confirm(this.body, this.title, {
      ...config,
      buttons: [
        { text: "Yes", action: () => console.log("Clicked: Yes"), bold: false },
        { text: "No", action: () => console.log("Clicked: No") },
        {
          text: "Later",
          action: toast => {
            console.log("Clicked: Later");
            this.snotifyService.remove(toast.id);
          }
        },
        {
          text: "Close",
          action: toast => {
            console.log("Clicked: Close");
            this.snotifyService.remove(toast.id);
          },
          bold: true
        }
      ]
    });
  }

  onPrompt() {
    /*
     Here we pass an buttons array, which contains of 2 element of type SnotifyButton
     At the action of the first button we can get what user entered into input field.
     At the second we can't get it. But we can remove this toast
     */
    const { timeout, closeOnClick, ...config } = this.getConfig(); // Omit props what i don't need
    this.snotifyService
      .prompt(this.body, this.title, {
        ...config,
        buttons: [
          {
            text: "Yes",
            action: toast => console.log("Said Yes: " + toast.value)
          },
          {
            text: "No",
            action: toast => {
              console.log("Said No: " + toast.value);
              this.snotifyService.remove(toast.id);
            }
          }
        ]
      })
      .on("input", toast => {
        console.log(toast.value);
        toast.valid = !!toast.value.match("ng-snotify");
      });
  }

  onHtml() {
    const html = `<div class="snotifyToast__title"><b>Html Bold Title</b></div>
    <div class="snotifyToast__body"><i>Html</i> <b>toast</b> <u>content</u></div>`;
    this.snotifyService.html(html, this.getConfig());
  }

  onClear() {
    this.snotifyService.clear();
  }
}
