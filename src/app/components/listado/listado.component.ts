import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service'; // Asegúrate de que este servicio existe
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Usuario } from '../../interfaces/apuesta.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  standalone: true,
})
export class ListadoComponent implements OnInit {
  users: Usuario[] = []; // Todos los usuarios
  filteredUsers: Usuario[] = []; // Los usuarios que se muestran en la tabla (filtrados por búsqueda)
  searchQuery: string = ''; // El valor del input de búsqueda
  selectedUser: any = null; // El usuario seleccionado
  isInputDisabled: boolean = false;


  constructor(private userService: UsuarioService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadUsers(); // Cargar los usuarios al inicializar el componente
  }

  // Obtener usuarios de la base de datos (API)
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users; // Asignar los usuarios a la variable
        this.filteredUsers = [...this.users]; // Inicialmente mostrar todos los usuarios

      },
      (error: HttpErrorResponse) => {
        console.error('Error al cargar los usuarios:', error.message);
      }
    );
  }

  // Filtrar usuarios por nombre mientras escribes
  filterUsers(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim(); // Obtener el valor del input

    if (this.searchQuery === '') {
      // Si no hay búsqueda, mostrar solo los nombres de los usuarios
      this.filteredUsers = [...this.users];
      return;
    }

    // Si hay un texto de búsqueda, filtrar los usuarios
    this.filteredUsers = this.users.filter((user) =>
      user.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) // Filtrar por nombre
    )
  }



  // Método para seleccionar un usuario
  selectUser(user: Usuario): void {
    this.selectedUser = user; // Guardamos el usuario completo

    // Establecer el nombre del usuario seleccionado en la barra de búsqueda
    this.searchQuery = user.nombre;

    // Filtramos los usuarios para mostrar solo el usuario seleccionado en la tabla
    this.filteredUsers = [user];

    this.isInputDisabled = true;

  }

  // Método para resetear el filtro y mostrar todos los usuarios de nuevo
  resetFilter(): void {
    this.selectedUser = null; // Limpiar el usuario seleccionado
    this.searchQuery = ''; // Limpiar la búsqueda
    this.filteredUsers = [...this.users]; // Mostrar todos los usuarios
    this.isInputDisabled = false;
  }

  selectUserFromTable(user: Usuario): void {
    this.selectedUser = user; // Solo seleccionamos el usuario, pero no filtramos la tabla
    this.searchQuery = '';// Establecer el nombre del usuario seleccionado en la barra de búsqueda
    this.filteredUsers = [...this.users]; // Aseguramos que se muestren todos los usuarios
    console.log(`Usuario seleccionado desde la tabla: ${user}`);
  }

  formatDate(date: any): string {
    if (!date) return 'Fecha no disponible';  // Si la fecha es nula o indefinida
    if (typeof date === 'string') {
      // Si la fecha es una cadena, la convertimos en objeto Date
      date = new Date(date);
    }
    return this.datePipe.transform(date, 'dd/MM/yyyy') || 'Fecha inválida';
  }
}
