import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ EquiposService } from '../../services/equipos.service';
import { interval, Subscription } from 'rxjs';
import { AutenticacionServiceService } from '../../services/autenticacion-service.service';
@Component({
  selector: 'app-crearequipo',
  templateUrl: './crearequipo.component.html',
  styleUrl: './crearequipo.component.scss'
})
export class CrearequipoComponent {
  equipoForm: FormGroup;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  counter: number = 5;
  private counterSubscription: Subscription | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private equipoService: EquiposService,
    private router: Router,
    private authService: AutenticacionServiceService,
  ) {
    this.equipoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      pais: ['', Validators.required],
      fechaFundacion: ['', Validators.required],
      presidente: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.authService.obtenerUsuario()) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.equipoForm.valid) {
      const equipoData = this.equipoForm.value;

      this.equipoService.crearEquipo(equipoData).subscribe(
        response => {
          this.successMessage = 'Equipo registrado exitosamente';
          this.startRedirectCountdown();
        },
        error => {
          this.errorMessage = 'Error al registrar el equipo';
          console.error('Error al registrar el equipo:', error);
        }
      );
    }
  }
  private startRedirectCountdown(): void {
    this.counter = 5; // Reinicia el contador a 5 segundos
    this.counterSubscription = interval(1000).subscribe(seconds => {
      this.counter--;
      if (this.counter <= 0) {
        this.counterSubscription?.unsubscribe();
        this.router.navigate(['/equipo']); // Redirige a la página deseada
      }
    });
  }
}
