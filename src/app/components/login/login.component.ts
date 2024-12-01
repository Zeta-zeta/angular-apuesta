import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ComunicacionService } from '../../services/comunicacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: LoginService,
    private router: Router,
    private comunicacionService: ComunicacionService

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          if (response) {
            // Si la respuesta no es null, proceder con el login
            localStorage.setItem('usuario', JSON.stringify(response));
            console.log('Login exitoso:', response);
            this.comunicacionService.emitirFondosActualizados();
            this.router.navigate(['']);
          } else {
            // Si la respuesta es null, mostrar mensaje de error
            alert('Credenciales inválidas. Verifique su email y contraseña.');
          }
        },
        error => {
          // Manejar errores
          alert('Error en la autenticación. Intente nuevamente.');
          console.error('Error de autenticación:', error);
        }
      );
    } else {
      alert('Por favor, complete el formulario correctamente.');
    }
  }
}
