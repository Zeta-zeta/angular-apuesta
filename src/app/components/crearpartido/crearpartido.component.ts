import { Component, OnInit } from '@angular/core';
import { Partido } from '../../interfaces/partido.interface';
import { EquiposService } from '../../services/equipos.service';
import { PartidosService } from '../../services/partidos.service';
import { Router } from '@angular/router';
import { AutenticacionServiceService } from '../../services/autenticacion-service.service';

interface Equipo {
  id: number;
  nombre: string;
  disabled?: boolean; // Agregado para controlar si está deshabilitado en la selección
}

@Component({
  selector: 'app-crearpartido',
  templateUrl: './crearpartido.component.html',
  styleUrl: './crearpartido.component.scss'
})
export class CrearpartidoComponent implements OnInit{
  equipos: Equipo[] = [];
  formData: any = {
    equipoLocal: '',
    equipoVisitante: '',
    golesLocal: 0,
    golesVisitante: 0,
    fechaPartido: '',
    horaPartido: '',
    estado: 'Proximo',
    idEquipoGandor: null
  };
  successMessage: string | null = null;
  counter: number = 5; // Contador para la redirección
  submitted: boolean = false;
  fechaHoraPartido: string = '';

  constructor(
    private equipoService: EquiposService,
    private partidoService: PartidosService,
    private router: Router,
    private authService: AutenticacionServiceService
  ) {}

  ngOnInit(): void {
    if (!this.authService.obtenerUsuario()) {
      this.router.navigate(['/login']);
    }else{
      this.cargarEquipos();
    }


  }

  cargarEquipos(): void {
    this.equipoService.getEquipos().subscribe((equipos: Equipo[]) => {
      this.equipos = equipos;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formData.equipoLocal && this.formData.equipoVisitante && this.formData.fechaPartido && this.formData.horaPartido) {
      const fechaHora = new Date(`${this.formData.fechaPartido}T${this.formData.horaPartido}:00.000+00:00`);
      const ahora = new Date();

      if (fechaHora < ahora) {
        alert('La fecha y hora del partido no pueden ser anteriores a la fecha y hora actuales.');
        return;
      }

      const nuevoPartido: Partial<Partido> = {
        idEquipoLocal: this.formData.equipoLocal,
        idEquipoVisitante: this.formData.equipoVisitante,
        golesLocal: this.formData.golesLocal,
        golesVisitante: this.formData.golesVisitante,
        fechahora: `${this.formData.fechaPartido}T${this.formData.horaPartido}:00.000+00:00`,
        estado: this.formData.estado,
        idEquipoGanador: this.formData.idEquipoGanador
      };

      this.partidoService.crearPartido(nuevoPartido).subscribe(response => {
        this.successMessage = 'Partido creado exitosamente';
        this.redirigir();
      });
    }
  }



  redirigir(): void {
    const interval = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        clearInterval(interval);
        this.router.navigate(['/']); // Redirige a la lista de partidos
      }
    }, 1000);
  }

  onEquipoLocalChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const equipoId = Number(target.value); // Convertir el valor a número
      this.formData.equipoLocal = equipoId;
      this.filterEquipos();
    }
  }

  onEquipoVisitanteChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const equipoId = Number(target.value); // Convertir el valor a número
      this.formData.equipoVisitante = equipoId;
      this.filterEquipos();
    }
  }

  private filterEquipos() {
    // Actualiza la lista de equipos disponibles para selección
    this.equipos.forEach(equipo => {
      equipo.disabled = equipo.id === this.formData.equipoLocal || equipo.id === this.formData.equipoVisitante;
    });
  }
}
