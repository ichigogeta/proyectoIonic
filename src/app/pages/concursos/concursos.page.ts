import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concursos-item',
  templateUrl: './concursos.page.html',
  styleUrls: ['./concursos.page.scss'],
})
export class ConcursosPage implements OnInit {

  public tarjetas = [
    {
      id: 1, 
      fechas: 'Lunes 18/10',
      titulo: 'Concurso Fotografia',
      hora: '12:00',
      direccion: 'Avda. Voltaire 12'
    },

    {
      id: 2, 
      fechas: 'Lunes 18/10',
      titulo: 'Concurso Fotografia',
      hora: '12:00',
      direccion: 'Avda. Voltaire 12'
    },

    {
      id: 3, 
      fechas: 'Lunes 18/10',
      titulo: 'Concurso Fotografia',
      hora: '12:00',
      direccion: 'Avda. Voltaire 12'
    },
    {
      id: 4, 
      fechas: 'Lunes 18/10',
      titulo: 'Concurso Fotografia',
      hora: '12:00',
      direccion: 'Avda. Voltaire 12'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
