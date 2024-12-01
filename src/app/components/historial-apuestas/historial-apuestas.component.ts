import { Component, OnInit } from '@angular/core';
import { Apuesta } from '../../interfaces/apuesta.interface';
import { HistorialApuestasService } from '../../services/historial-apuestas.service';
import { AutenticacionServiceService } from '../../services/autenticacion-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-historial-apuestas',
  templateUrl: './historial-apuestas.component.html',
  styleUrl: './historial-apuestas.component.scss'
})
export class HistorialApuestasComponent implements OnInit{
  listaApuestas: Apuesta[] = [];

  constructor(
    private historialApuestas: HistorialApuestasService,
    private authService: AutenticacionServiceService,
    private router: Router
  ){}

  ngOnInit(): void {
      const user = this.authService.obtenerUsuario();
      if(user){
        this.historialApuestas.getApuestasPorUsuario(user.id).subscribe(
          data => {
            this.listaApuestas = data;
          },
          error => {
            console.error('Error al obtener Apuestas', error);
          }
        )
      }else{
        this.router.navigate(['/login']);
      }

  }

  obtenerApuestas(): void {
    this.historialApuestas.getApuestas().subscribe({
      next: (apuestas) => {
        this.listaApuestas = apuestas;
      },
      error: (err) => {
        console.error('Error al obtener las apuestas:', err);
      }
    });
  }

  obtenerApuestasDeUsuario(usuarioId: number): void {
    this.historialApuestas.getApuestasPorUsuario(usuarioId).subscribe({
      next: (apuestas) => {
        this.listaApuestas = apuestas;
      },
      error: (err) => {
        console.error('Error al obtener las apuestas del usuario:', err);
      }
    });


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
