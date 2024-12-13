import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApostarService } from '../../services/apostar.service'; // Asegúrate de que este servicio existe

import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Apuesta} from '../../interfaces/apuesta.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  standalone: true,
})
export class ListadoComponent implements OnInit {
  apuesta: Apuesta[] = []; // Todos los usuarios
  filteredApuesta: Apuesta[] = []; // Los usuarios que se muestran en la tabla (filtrados por búsqueda)
  searchQuery: string = ''; // El valor del input de búsqueda
  selectedApuesta: any = null; // El usuario seleccionado
  isInputDisabled: boolean = false;


  constructor(private apostarService: ApostarService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadApuesta(); // Cargar los usuarios al inicializar el componente
  }




  // Obtener usuarios de la base de datos (API)
  loadApuesta(): void {
    this.apostarService.getApuestas().subscribe(
      (apuesta) => {
        this.apuesta = apuesta; // Asignar los usuarios a la variable
        this.filteredApuesta = [...this.apuesta]; // Inicialmente mostrar todos los usuarios

      },
      (error: HttpErrorResponse) => {
        console.error('Error al cargar las apuestas:', error.message);
      }
    );
  }


  // Filtrar usuarios por nombre mientras escribes
  filterApuesta(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim(); // Obtener el valor del input

    if (this.searchQuery === '') {
      // Si no hay búsqueda, mostrar solo los nombres de los usuarios
      this.filteredApuesta = [...this.apuesta];
      return;
    }

    // Si hay un texto de búsqueda, filtrar los usuarios
    this.filteredApuesta = this.apuesta.filter((apuesta) =>
      apuesta.fecha.toLowerCase().includes(this.searchQuery.toLowerCase()) // Filtrar por nombre
    )
  }

  // Método para seleccionar un usuario
  selectApuesta(apuesta: Apuesta): void {
    this.selectedApuesta = apuesta; // Guardamos el usuario completo

    // Establecer el nombre del usuario seleccionado en la barra de búsqueda
    this.searchQuery = apuesta.fecha;

    // Filtramos los usuarios para mostrar solo el usuario seleccionado en la tabla
    this.filteredApuesta = [apuesta];

    this.isInputDisabled = true;

  }

  // Método para resetear el filtro y mostrar todos los usuarios de nuevo
  resetFilter(): void {
    this.selectedApuesta = null; // Limpiar el usuario seleccionado
    this.searchQuery = ''; // Limpiar la búsqueda
    this.filteredApuesta = [...this.apuesta]; // Mostrar todos los usuarios
    this.isInputDisabled = false;
  }

  selectApuestaFromTable(apuesta: Apuesta): void {
    this.selectedApuesta = apuesta; // Solo seleccionamos el usuario, pero no filtramos la tabla
    this.searchQuery = '';// Establecer el nombre del usuario seleccionado en la barra de búsqueda
    this.filteredApuesta = [...this.apuesta]; // Aseguramos que se muestren todos los usuarios
    console.log(`Usuario seleccionado desde la tabla: ${apuesta.fecha}`);
  }
}
