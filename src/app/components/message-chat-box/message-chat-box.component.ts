import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { Message } from 'src/app/models/Message.model';
import { SelectedUserService } from 'src/app/services/selected-user.service';
import { UserService } from 'src/app/services/user.service';
import { MessageServiceService } from 'src/app/services/message-service.service';
import { RoomingWebSocketAPI } from 'src/app/RoomingWebSocketAPI';
import { Config } from 'protractor';
@Component({
  selector: 'app-message-chat-box',
  templateUrl: './message-chat-box.component.html',
  styleUrls: ['./message-chat-box.component.css']
})
export class MessageChatBoxComponent implements OnInit {

  selectedUser: User;

  messages: Message[];

  messageContent: string;

  webSocketAPI: RoomingWebSocketAPI;

  constructor(private selectedUserService: SelectedUserService, private userService: UserService,
    private messageService: MessageServiceService) { }

  ngOnInit(): void {
    this.selectedUserService.getSelectedUser().subscribe(selectedUser => {
      this.selectedUser = selectedUser;
      setTimeout(() => {
        this.updateScroll();
      }, 100);
    });

    this.messageService.getMessagesRelatedToMe().subscribe((result: Config) => {
      this.messages = result.body;
    }, err => {
      console.log(err);
    })
    this.connectAndListenToMessages();
  }

  getMyAllMessages(): any{
   
  }

  filterMessagesBySelectedUser(){
    if(this.selectedUser && this.messages)
      return this.messages.filter(message => message.fromUser.username === this.selectedUser.username || message.toUser.username === this.selectedUser.username)
    return [];
  }

  changeCardBody(){
    console.log("Change Card Body");
  }

  connectAndListenToMessages(){
    this.webSocketAPI = new RoomingWebSocketAPI();
    this.webSocketAPI._connect();
    this.webSocketAPI.messageSource.subscribe((receivedMessage: Message) => {
      if(receivedMessage){
        this.messages.push(receivedMessage);        
        setTimeout(() => {
          this.updateScroll();
        }, 100);
      }  
    })
  }

  updateScroll(){
    const element = document.getElementById('card-body-id');
    element.scrollTop = element.scrollHeight;
  }

  sendMessage(){
    if(this.messageContent.trim().length > 0){
      this.webSocketAPI._send(this.selectedUser.username, this.messageContent);
      this.messageContent = '';
    }
  }

  isMyMessage(message: Message): boolean{
    return message.fromUser.username === this.userService.getLoggedUsername();
  }

}
