import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from '../../services/registro.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  counter: number = 5;
  successMessage: string = '';
  errorContrasena: string = '';
  errorFechaNacimiento: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  mostrarPassword: boolean = false;
  mostrarConfirmarPassword: boolean = false;
  formData = {
      dni:"",
      nombre: "",
      email: "",
      password: "",
      fechaNacimiento: "",
      fondos: 0,
  }


  constructor(private registerService: RegistroService,
    private router: Router
  ){}

  // Función para manejar el cambio de contraseña
  //manejarCambioContrasena(event: Event) {
  //  this.contrasena = (event.target as HTMLInputElement).value;
  //  this.validarContrasenas();
  //}

  // Función para manejar el cambio de confirmar contraseña
  //manejarCambioConfirmarContrasena(event: Event) {
  //  this.confirmarContrasena = (event.target as HTMLInputElement).value;
   // this.validarContrasenas();
 // }

  // Validar que las contraseñas coincidan
  validarContrasenas(): boolean {
    if (this.contrasena !== this.confirmarContrasena) {
      this.errorContrasena = 'Las contraseñas no coinciden';
      return false;
    }
    this.errorContrasena = '';
    return true;
  }

  // Función para manejar el cambio de fecha de nacimiento
  manejarCambioFecha(event: Event) {
    this.formData.fechaNacimiento = (event.target as HTMLInputElement).value;
    this.validarFechaNacimiento(this.formData.fechaNacimiento);
  }

  // Validar que la fecha de nacimiento indique una edad de al menos 18 años
  validarFechaNacimiento(fecha: string) {
    const hoy = new Date();
    const fechaNacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();

    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    if (edad < 18) {
      this.errorFechaNacimiento = 'Debes tener al menos 18 años.';
    } else {
      this.errorFechaNacimiento = '';
    }
  }

  enviarData() {
    const contrasenasValidas = this.validarContrasenas();
    const fechaNacimientoValida = !this.errorFechaNacimiento;
    if (this.validarContrasenas() && !this.errorFechaNacimiento) {
      this.formData.password = this.contrasena;
      this.registerService.postData(this.formData).subscribe(
        (response) => {
          this.successMessage = '¡Registro completado con éxito!';
          this.startRedirectCountdown();
        },
        (error) => {
          alert('Error al Registrar');
        }
      );
    }
  }




  startRedirectCountdown() {
    const intervalId = setInterval(() => {
      this.counter--;
    }, 1000);

    const timeoutId = setTimeout(() => {
      this.router.navigate(['/login']);
      clearInterval(intervalId);  // Limpiamos el intervalo después de la redirección
    }, 5000);
  }
}
