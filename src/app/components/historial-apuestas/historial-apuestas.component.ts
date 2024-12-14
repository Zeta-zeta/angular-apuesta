import { Component, OnInit } from '@angular/core';
import { Apuesta } from '../../interfaces/apuesta.interface';
import { HistorialApuestasService } from '../../services/historial-apuestas.service';
import { AutenticacionServiceService } from '../../services/autenticacion-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-historial-apuestas',
  templateUrl: './historial-apuestas.component.html',
  styleUrls: ['./historial-apuestas.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class HistorialApuestasComponent implements OnInit {
  listaApuestas: Apuesta[] = [];
  apuestas: Apuesta[] = [];
  filteredApuestas: Apuesta[] = [];
  suggestions: Apuesta[] = [];
  searchQuery: string = '';
  selectedApuesta: any = null;
  isInputDisabled: boolean = false;
  userId: number = 0;

  constructor(
    private historialApuestas: HistorialApuestasService,
    private authService: AutenticacionServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const user = this.authService.obtenerUsuario();
    if (user) {
      this.userId = user.id;
      this.loadApuestas();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadApuestas(): void {
    this.historialApuestas.getApuestasPorUsuario(this.userId).subscribe(
      (apuestas) => {
        this.listaApuestas = apuestas;
        this.apuestas = apuestas;
        this.filteredApuestas = [...this.apuestas]; // Mostrar todas las apuestas inicialmente
      },
      (error: HttpErrorResponse) => {
        console.error('Error al cargar las apuestas:', error.message);
      }
    );
  }

  filterApuestas(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim();

    if (this.searchQuery === '') {
      this.filteredApuestas = [...this.apuestas];
      this.suggestions = [];
      return;
    }

    this.filteredApuestas = this.apuestas.filter((apuesta) =>
      apuesta.fecha.includes(this.searchQuery)
    );

    this.suggestions = this.filteredApuestas;
  }

  selectSuggestion(apuesta: Apuesta): void {
    this.searchQuery = apuesta.fecha;
    this.filteredApuestas = [apuesta];
    this.isInputDisabled = true;
    this.suggestions = [];
  }

  resetFilter(): void {
    this.selectedApuesta = null;
    this.searchQuery = '';
    this.filteredApuestas = [...this.apuestas];
    this.isInputDisabled = false;
    this.suggestions = [];
  }

  selectApuestaFromTable(apuesta: Apuesta): void {
    this.selectedApuesta = apuesta;
    this.searchQuery = '';
    this.filteredApuestas = [...this.apuestas];
    console.log('Apuesta seleccionada: ', apuesta);
  }

  get apuestasGanadas(): Apuesta[] {
    return this.listaApuestas.filter(apuesta => apuesta.resultado);
  }

  get apuestasPerdidas(): Apuesta[] {
    return this.listaApuestas.filter(apuesta => !apuesta.resultado);
  }

  getEquipoLogo(id: number, tipo: 'local' | 'visitante'): string {
    const apuesta = this.listaApuestas.find(a => a.idPartido.idEquipoLocal.id === id || a.idPartido.idEquipoVisitante.id === id);
    return tipo === 'local' ? `/img/${apuesta?.idPartido.idEquipoLocal.nombre.toLowerCase()}.png` : `/img/${apuesta?.idPartido.idEquipoVisitante.nombre.toLowerCase()}.png`;
  }
}
