import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AutenticacionServiceService } from '../../services/autenticacion-service.service';
import { Router } from '@angular/router';
import { MiBilleteraService } from '../../services/mi-billetera.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunicacionService } from '../../services/comunicacion.service'; // Ajusta la ruta

@Component({
  selector: 'app-mi-billetera',
  templateUrl: './mi-billetera.component.html',
  styleUrl: './mi-billetera.component.scss'
})
export class MiBilleteraComponent implements OnInit {

  billeteraForm!: FormGroup; // Uso del modificador `!`
  successMessage: string = '';
  counter: number = 5;

  @Output() fondosActualizados: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private billeteraService: MiBilleteraService,
    private authService: AutenticacionServiceService,
    private router: Router,
    private comunicacionService: ComunicacionService
  ) {}

  ngOnInit(): void {
    this.billeteraForm = this.fb.group({
      monto: [null, [Validators.required, Validators.min(0.01)]],
      metodo: [null, Validators.required],
      tarjeta: this.fb.group({
        numeroTarjeta: [''],
        fechaExpiracion: [''],
        cvv: ['']
      }),
      paypal: this.fb.group({
        emailPaypal: ['']
      }),
      transferencia: this.fb.group({
        banco: [''],
        numeroCuenta: ['']
      })
    });

    if (!this.authService.obtenerUsuario()) {
      this.router.navigate(['/login']);
    }
  }

  manejarCambioMetodo(event: any): void {
    const metodo = event.target.value;
    if (metodo === 'tarjeta' || metodo === 'paypal' || metodo === 'transferencia') {
      this.billeteraForm.get(metodo)?.setValidators(Validators.required);
    } else {
      this.billeteraForm.get(metodo)?.clearValidators();
    }
    this.billeteraForm.get(metodo)?.updateValueAndValidity();
  }

  handleSubmit(): void {
    if (this.billeteraForm.invalid) {
      return; // Aquí puedes agregar lógica para mostrar errores de validación
    }

    const monto = this.billeteraForm.get('monto')?.value;
    const metodo = this.billeteraForm.get('metodo')?.value;
    const usuario = this.authService.obtenerUsuario();

    if (usuario) {
      this.billeteraService.agregarFondos(usuario.id, monto).subscribe(
        (actualizacion) => { // Supongamos que la respuesta contiene la información actualizada del usuario
          // Actualizar el usuario en el localStorage
          localStorage.setItem('usuario', JSON.stringify(actualizacion));
          this.successMessage = '¡Ingreso de fondos con éxito!';
          console.log('Fondos actualizados, emitiendo evento...');
          this.comunicacionService.emitirFondosActualizados();
          //this.fondosActualizados.emit();
          const intervalId = setInterval(() => {
            this.counter--;
          }, 1000);

          const timeoutId = setTimeout(() => {
            this.router.navigate(['/']);
            clearInterval(intervalId);
            clearTimeout(timeoutId);
          }, 4000);
        },
        error => {
          // Manejo de errores
        }
      );
    }
  }

}
