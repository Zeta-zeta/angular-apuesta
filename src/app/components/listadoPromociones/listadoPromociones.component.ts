import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsService } from '../../services/promotions.service'; // Asegúrate de que este servicio existe
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Promocion } from '../../interfaces/apuesta.interface';

@Component({
  selector: 'app-listadoPromociones',
  templateUrl: './listadoPromociones.component.html',
  styleUrls: ['./listadoPromociones.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  standalone: true,
})
export class ListadoPromocionesComponent implements OnInit {
  promociones: Promocion[] = []; // Todos las promociones
  filteredPromociones: Promocion[] = []; // las promociones que se muestran en la tabla (filtrados por búsqueda)
  searchQuery: string = ''; // El valor del input de búsqueda
  selectedPromocion: any = null; // El usuario seleccionado
  isInputDisabled: boolean = false;


  constructor(private promocionService: PromotionsService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadPromocion(); // Cargar las promociones al inicializar el componente
  }

  // Obtelas promociones de la base de datos (API)
  loadPromocion(): void {
    this.promocionService.getPromociones().subscribe(
      (promocion) => {
        console.log('Respuesta de la API:', promocion);
        this.promociones = promocion; // Asignar las promociones a la variable
        this.filteredPromociones = [...this.promociones]; // Inicialmente mostrar todos las promociones

      },
      (error: HttpErrorResponse) => {
        console.error('Error al cargar las promociones:', error.message);
      }
    );
  }

  // Filtlas promociones por nombre mientras escribes
  filterpromociones(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim(); // Obtener el valor del input

    if (this.searchQuery === '') {
      // Si no hay búsqueda, mostrar solo los nombres de las promociones
      this.filteredPromociones = [...this.promociones];
      return;
    }

    // Si hay un texto de búsqueda, filtrar las promociones
    this.filteredPromociones = this.promociones.filter((promocion) =>
      promocion.codigoPromocion.toLowerCase().includes(this.searchQuery.toLowerCase()) // Filtrar por nombre
    )
  }

  // Método para seleccionar un usuario
  selectUser(promocion: Promocion): void {
    this.selectedPromocion = promocion; // Guardamos el usuario completo

    // Establecer el nombre del usuario seleccionado en la barra de búsqueda
    this.searchQuery = promocion.codigoPromocion;

    // Filtramos las promociones para mostrar solo el usuario seleccionado en la tabla
    this.filteredPromociones = [promocion];

    this.isInputDisabled = true;

  }

  // Método para resetear el filtro y mostrar todos las promociones de nuevo
  resetFilter(): void {
    this.selectedPromocion = null; // Limpiar el usuario seleccionado
    this.searchQuery = ''; // Limpiar la búsqueda
    this.filteredPromociones = [...this.promociones]; // Mostrar todos las promociones
    this.isInputDisabled = false;
  }

  selectUserFromTable(promocion: Promocion): void {
    this.selectedPromocion = promocion; // Solo seleccionamos el usuario, pero no filtramos la tabla
    this.searchQuery = '';// Establecer el nombre del usuario seleccionado en la barra de búsqueda
    this.filteredPromociones = [...this.promociones]; // Aseguramos que se muestren todos las promociones
    console.log(`Usuario seleccionado desde la tabla: ${promocion}`);
  }

}
 