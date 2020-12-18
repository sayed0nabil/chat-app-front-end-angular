import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/public";
    stompClient: any;
    component: any;
    messageBehavior = new BehaviorSubject("");
    messageSource = this.messageBehavior.asObservable();
    constructor(appComponent: any){
        this.component = appComponent;
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({content: message}));
    }

    onMessageReceived(message) {        
        const body = JSON.parse(message.body);
        this.messageBehavior.next(body.content);
        
    }
}