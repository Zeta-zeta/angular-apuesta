
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidosService } from '../../services/partidos.service';
import { Partido } from '../../interfaces/partido.interface';
import { AutenticacionServiceService } from '../../services/autenticacion-service.service';
import { ComunicacionService } from '../../services/comunicacion.service';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-definirpartido',
  templateUrl: './definirpartido.component.html',
  styleUrl: './definirpartido.component.scss'
})
export class DefinirpartidoComponent implements OnInit{
  resultadoForm: FormGroup;
  partidoId!: number;
  equipoLocalNombre = ''; // Cambia esto con el nombre del equipo local
  equipoVisitanteNombre = '';

  constructor(
    private formBuilder: FormBuilder,
    private partidosService: PartidosService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AutenticacionServiceService,
    private usuarioService: UsuarioService,
    private comunicacionService: ComunicacionService,
  ) {
    this.resultadoForm = this.formBuilder.group({
      golesLocal: [0, [Validators.required, Validators.min(0)]],
      golesVisitante: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.partidoId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPartidoDetails();
    if (!this.authService.obtenerUsuario()) {
      this.router.navigate(['/login']);
    }
  }

  loadPartidoDetails(): void {
    this.partidosService.getPartido().subscribe(partidos => {
      const partido = partidos.find(p => p.id === this.partidoId);
      if (partido) {
        this.equipoLocalNombre = partido.idEquipoLocal.nombre;
        this.equipoVisitanteNombre = partido.idEquipoVisitante.nombre;
      } else {
        console.error('Partido no encontrado');
      }
    });
  }

  onSubmit(): void {
    if (this.resultadoForm.valid) {
      const resultadoData = this.resultadoForm.value;
      this.partidosService.definirResultado(this.partidoId, resultadoData).subscribe(
        async response => {
          const usuarioJSON = localStorage.getItem('usuario');
          if (usuarioJSON) {
            const usuarioOldStorage = JSON.parse(usuarioJSON);
            await this.usuarioService.actualizarLocalStorageConDatosDelAPI(usuarioOldStorage.id);
            this.comunicacionService.emitirFondosActualizados();
          }
          this.router.navigate(['/partidospendientes']);

        },
        error => {
          console.error('Error al definir el resultado:', error);
        }
      );
    }
  }
  validateNumber(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); // Elimina cualquier carácter no numérico
  }

}
