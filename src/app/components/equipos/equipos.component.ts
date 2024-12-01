import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../interfaces/partido.interface';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.scss'
})
export class EquiposComponent implements OnInit{
  listaEquipos: Equipo[] = [];

  constructor(private equipoService: EquiposService){}

  ngOnInit(): void {
      this.getEquipos()
  }

  getEquipos(): void{
    this.equipoService.getEquipos().subscribe({
      next: (result) =>{
        this.listaEquipos = result;
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}
