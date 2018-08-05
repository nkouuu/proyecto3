import { Injectable } from "../../node_modules/@angular/core";
import * as io from 'socket.io-client';
import { SessionService } from "./session.service";


@Injectable()
export class AlertsService {

  socket:SocketIOClient.Socket;

  constructor(public sessionService:SessionService){

    // Connect to websocket for chat
    this.socket = io('localhost:3000');
    this.socket.on('connect',() =>console.log("Connected to WS"));

    // Save messages into array as they arrive from server
    /*this.socket.on('Follow',(data) => {
      
    })*/
    console.log(this.sessionService.user._id)
    this.socket.on(`${this.sessionService.user._id}`,(data) => {
        console.log(data)
      })

  }

  sendFollow(followerId,followedId){
    console.log(`Sending alert to -> ${followedId}`);
    console.log(`follower ${followerId}`)
    console.log(`followed ${followedId}`)

    this.socket.emit('follow', {followerId,followedId});
    
  }
}

