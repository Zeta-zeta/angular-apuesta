import { Component } from '@angular/core';
import { Partido } from '../../interfaces/partido.interface';
import { Router } from '@angular/router';
import { PartidosService } from '../../services/partidos.service';
import { AutenticacionServiceService } from '../../services/autenticacion-service.service';
@Component({
  selector: 'app-partidospendientes',
  templateUrl: './partidospendientes.component.html',
  styleUrl: './partidospendientes.component.scss'
})
export class PartidospendientesComponent {
  partidosProximos: Partido[] = [];
  partidosEnVivo: Partido[]=[];

  constructor(private partidosService: PartidosService, private router: Router,private authService: AutenticacionServiceService,) {}

  ngOnInit(): void {
    this.cargarPartidosPendientes();
    if (!this.authService.obtenerUsuario()) {
      this.router.navigate(['/login']);
    }
  }

  cargarPartidosPendientes(): void {
    this.partidosService.obtenerPartidosProximos().subscribe((partidos: Partido[]) => {
      this.partidosProximos = partidos;
    });
    this.partidosService.obtenerPartidosEnVivo().subscribe((partidos: Partido[]) => {
      this.partidosEnVivo = partidos;
    });
  }

  definirResultado(partidoId: number): void {
    this.router.navigate(['/definirpartido', partidoId]);
  }

  cambiarEstadoAEnVivo(partidoId: number): void {
    this.partidosService.cambiarEstadoAEnVivo(partidoId).subscribe(
      partidoActualizado => {
        this.partidosProximos = this.partidosProximos.filter(p => p.id !== partidoActualizado.id);
        this.partidosEnVivo.push(partidoActualizado);
      },
      error => {
        console.error('Error al cambiar el estado del partido:', error);
      }
    );
  }
}
