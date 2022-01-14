import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-concursos',
  templateUrl: './app-concursos.component.html',
  styleUrls: ['./app-concursos.component.scss'],
})
export class AppConcursosComponent implements OnInit {

  @Input() id:number;
  @Input() fechas:string;
  @Input() titulo:string;
  @Input() hora:string;
  @Input() direccion:string;

  constructor() { }

  ngOnInit() {}

}
