import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './app-chat-header.component.html',
  styleUrls: ['./app-chat-header.component.scss'],
})
export class AppChatHeaderComponent  {

  @Input() chatName: string;
  @Input() lastMessage: string;

  constructor() { }


}
