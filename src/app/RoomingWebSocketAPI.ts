import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import jwt_decode from 'jwt-decode';
import { Message } from './models/Message.model';
import { User } from './models/User.model';

export class RoomingWebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/messages";
    stompClient: any;
    messageBehavior = new BehaviorSubject(null);
    messageSource = this.messageBehavior.asObservable();
    userBehavior = new BehaviorSubject(null);
    userSource = this.userBehavior.asObservable();
    loggedUsername: string;
    constructor(){
        
    }
    _connect() {
        const body: any = jwt_decode(localStorage.getItem("jwt"));
        this.loggedUsername = body.sub;
        console.log("Connecting to " + this.loggedUsername + "...");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic + "/" + _this.loggedUsername, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
        }, this.errorCallBack);
    };

    _connectAndListenToActiveUsers() {
        console.log("Listen To Active Users");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe("/topic/users/", function (sdkEvent) {
                _this.onUserReceived(sdkEvent);
            });
        }, this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        // setTimeout(() => {
        //     this._connect();
        // }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(toUsername: string, messageContent: string) {
        console.log("calling logout api via web socket");
        const _this = this;
        this.stompClient.send("/app/chat/" + toUsername, {}, JSON.stringify({
            fromUsername: _this.loggedUsername,
            content: messageContent.trim()
        }));
    }

    onMessageReceived(user) {        
        const body: User = JSON.parse(user.body);
        console.log(body);
        this.messageBehavior.next(body);
        
    }


    onUserReceived(message) {        
        const body: User = JSON.parse(message.body);
        console.log(body);
        console.log("User Received");
        this.userBehavior.next(body);  
    }
}