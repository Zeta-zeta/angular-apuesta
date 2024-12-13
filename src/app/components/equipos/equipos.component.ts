import { Component, OnInit } from '@angular/core';
import { Equipo } from '../../interfaces/partido.interface';
import { EquiposService } from '../../services/equipos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.scss',
  imports: [CommonModule, FormsModule],
  standalone: true,
})

export class EquiposComponent implements OnInit{
  listaEquipos: Equipo[] = [];
  equipos: Equipo[] = []; //Todos los equipos
  filteredEquipos: Equipo[] = []; //Equipos que se muestran en la tabla
  searchQuerty: string = ''; //el valor que se ingresa en el imput de busqueda
  selectedEquipo: any = null; //El equipo seleccionado
  isInputDisabled: boolean = false;

  constructor(private equipoService: EquiposService){}

  ngOnInit(): void {
      this.getEquipos()
      this.loadEquipos();
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

  loadEquipos(): void{
    this.equipoService.getEquipos().subscribe(
      (equipos) =>{
        this.equipos = equipos;
        this.filteredEquipos = [...this.equipos];
      },
      (error: HttpErrorResponse) =>{
        console.log("Error al cargar los equipos: ", error.message);
      }
    );
  }

  filterEquipos(event: Event): void{
    const input = event.target as HTMLInputElement;
    this.searchQuerty = input.value.trim();

    if (this.searchQuerty === ''){
      this.filteredEquipos = [...this.equipos];
      return;
    }

    this.filteredEquipos = this.equipos.filter((equipo) =>
    equipo.nombre.toLowerCase().includes(this.searchQuerty.toLowerCase())
    );
  }

  selectEquipo(equipo: Equipo): void{
    this.selectedEquipo = equipo;
    this.searchQuerty= equipo.nombre;
    this.filteredEquipos = [equipo];
    this.isInputDisabled = true;
  }

  resetFilter(): void{
    this.selectedEquipo = null;
    this.searchQuerty = '';
    this.filteredEquipos = [...this.equipos];
    this.isInputDisabled = false;
  }

  selectEquipoFromTable(equipo: Equipo): void{
    this.selectedEquipo = equipo;
    this.searchQuerty = '';
    this.filteredEquipos = [...this.equipos];
    console.log('Equipo seleccionado: ', equipo);
  }
}
