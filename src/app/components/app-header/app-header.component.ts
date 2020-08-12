import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  
  @Input() title: string;
  @Input() color: string;
  @Input() menuButton: boolean;
  @Input() backButton: boolean;
  
  constructor() { }


}
