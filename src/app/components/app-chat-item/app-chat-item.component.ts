import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  templateUrl: './app-chat-item.component.html',
  styleUrls: ['./app-chat-item.component.scss'],
})
export class AppChatItemComponent implements OnInit {

  @Input() text: string;
  @Input() date: string;
  @Input() image: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() { }

}
