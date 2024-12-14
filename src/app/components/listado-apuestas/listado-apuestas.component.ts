import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialApuestasService } from '../../services/historial-apuestas.service'; // Asegúrate de que este servicio existe
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Apuesta } from '../../interfaces/apuesta.interface';

@Component({
  selector: 'app-listado-apuestas',
  templateUrl: './listado-apuestas.component.html',
  styleUrls: ['./listado-apuestas.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class ListadoApuestasComponent implements OnInit {
  apuestas: Apuesta[] = []; // Todas las apuestas
  filteredApuestas: Apuesta[] = []; // Las apuestas que se muestran en la tabla (filtradas por búsqueda)
  searchQuery: string = ''; // El valor del input de búsqueda
  selectedApuesta: any = null; // La apuesta seleccionada
  isInputDisabled: boolean = false;

  constructor(private apuestaService: HistorialApuestasService) {}

  ngOnInit(): void {
    this.loadApuestas(); // Cargar las apuestas al inicializar el componente
  }

  // Obtener apuestas de la base de datos (API)
  loadApuestas(): void {
    this.apuestaService.getApuestas().subscribe(
      (apuestas) => {
        this.apuestas = apuestas; // Asignar las apuestas a la variable
        this.filteredApuestas = [...this.apuestas]; // Inicialmente mostrar todas las apuestas
      },
      (error: HttpErrorResponse) => {
        console.error('Error al cargar las apuestas:', error.message);
      }
    );
  }

  // Filtrar apuestas por ID mientras escribes
  filterApuestas(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim(); // Obtener el valor del input

    if (this.searchQuery === '') {
      // Si no hay búsqueda, mostrar todas las apuestas
      this.filteredApuestas = [...this.apuestas];
      return;
    }

    // Si hay un texto de búsqueda, filtrar las apuestas
    this.filteredApuestas = this.apuestas.filter((apuesta) =>
      apuesta.id.toString().includes(this.searchQuery) // Filtrar por ID
    );
  }

  // Método para seleccionar una apuesta
  selectApuesta(apuesta: Apuesta): void {
    this.selectedApuesta = apuesta; // Guardamos la apuesta completa

    // Establecer el ID de la apuesta seleccionada en la barra de búsqueda
    this.searchQuery = apuesta.id.toString();

    // Filtramos las apuestas para mostrar solo la apuesta seleccionada en la tabla
    this.filteredApuestas = [apuesta];

    this.isInputDisabled = true;
  }

  // Método para resetear el filtro y mostrar todas las apuestas de nuevo
  resetFilter(): void {
    this.selectedApuesta = null; // Limpiar la apuesta seleccionada
    this.searchQuery = ''; // Limpiar la búsqueda
    this.filteredApuestas = [...this.apuestas]; // Mostrar todas las apuestas
    this.isInputDisabled = false;
  }

  selectApuestaFromTable(apuesta: Apuesta): void {
    this.selectedApuesta = apuesta; // Solo seleccionamos la apuesta, pero no filtramos la tabla
    this.searchQuery = ''; // Limpiar la búsqueda
    this.filteredApuestas = [...this.apuestas]; // Aseguramos que se muestren todas las apuestas
    console.log(`Apuesta seleccionada desde la tabla: ${apuesta}`);
  }
}
