
import {User} from './User.model';

export class Message{
    
    id: number;
    content: string;
    date: Date;
    fromUser: User;
    toUser: User;

    constructor(id: number, content: string, date: Date, fromUser: User, toUser: User){
        this.id = id;
        this.content = content;
        this.date = date;
        this.fromUser = fromUser;
        this.toUser = toUser;
    }
}