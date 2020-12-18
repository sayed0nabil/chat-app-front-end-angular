import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  constructor(private apiService: ApiService) { }

  getMessagesRelatedToMe(){
    return this.apiService.get('/users/messages');
  }
}
