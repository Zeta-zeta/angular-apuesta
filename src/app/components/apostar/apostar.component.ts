import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../services/equipos.service';
import { PartidosService } from '../../services/partidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo, Partido } from '../../interfaces/partido.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApostarService } from '../../services/apostar.service';
import { AutenticacionServiceService } from '../../services/autenticacion-service.service';
import { MiBilleteraService } from '../../services/mi-billetera.service';
import { ComunicacionService } from '../../services/comunicacion.service';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-apostar',
  templateUrl: './apostar.component.html',
  styleUrl: './apostar.component.scss'
})
export class ApostarComponent implements OnInit{
  apuestaForm: FormGroup;
  partido!: Partido;
  equipos: Equipo[] = [];
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apuestaService: ApostarService,
    private authService:AutenticacionServiceService,
    private billeteraService: MiBilleteraService,
    private comunicacionService: ComunicacionService,
    private router: Router,
    private usuarioService: UsuarioService,
  ) {
    this.apuestaForm = this.formBuilder.group({
      montoApuesta: ['', [Validators.required, Validators.min(1)]],
      equipoApuesta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.authService.obtenerUsuario()) {
      this.router.navigate(['/login']);
    }
    const partidoId = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerDetallesPartido(partidoId);

  }

  obtenerDetallesPartido(partidoId: number): void {
    // Supongamos que este servicio devuelve los detalles del partido con los equipos cargados
    this.apuestaService.obtenerDetallesPartido(partidoId).subscribe(
      (partido: Partido) => {
        this.partido = partido;
        this.equipos = [
          partido.idEquipoLocal,
          partido.idEquipoVisitante,
          { id: -1, nombre: 'Empate', pais: '', fechaFundacion: '', presidente: '' }
        ];
      },
      error => {
        console.error('Error al obtener los detalles del partido:', error);
      }
    );
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    const usuario = this.authService.obtenerUsuario();

    if (this.apuestaForm.valid) {
      const apuestaData = {
        idPartido: this.partido.id,
        idUsuario: usuario.id,
        montoApuesta: this.apuestaForm.get('montoApuesta')?.value,
        fecha: new Date().toISOString().split('T')[0],
        resultado: null,
        idEquipoApuesta: this.apuestaForm.get('equipoApuesta')?.value.id
      };

      this.apuestaService.crearApuesta(apuestaData).subscribe(
        async response => {
          this.successMessage = 'Apuesta realizada exitosamente';

          // Actualizar el usuario en el servidor y luego en localStorage
          const usuarioJSON = localStorage.getItem('usuario');
          if (usuarioJSON) {
            const usuarioOldStorage = JSON.parse(usuarioJSON);
            await this.usuarioService.actualizarLocalStorageConDatosDelAPI(usuarioOldStorage.id);
            this.comunicacionService.emitirFondosActualizados();
          }

          // Redirigir después de un tiempo
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000);
        },
        error => {
          this.errorMessage = 'Error al realizar la apuesta.';
          console.error('Error al realizar la apuesta:', error);
        }
      );
    }
  }
}
