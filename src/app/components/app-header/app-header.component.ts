import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  
  @Input() title: string;
  @Input() color: string;
  @Input() menuButton: boolean;
  @Input() backButton: boolean;
  
  constructor() { }

  ngOnInit() {}

}
