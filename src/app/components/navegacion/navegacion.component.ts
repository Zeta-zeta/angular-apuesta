import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AutenticacionServiceService } from '../../services/autenticacion-service.service';
import { ComunicacionService } from '../../services/comunicacion.service'; // Ajusta la ruta

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.scss'
})
export class NavegacionComponent implements OnInit{

  isLoggedIn: boolean = false;
  userBalance: string = '';
  userName: string = '';

  constructor(
    private authService: AutenticacionServiceService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private comunicacionService: ComunicacionService
  ){}

  ngOnInit(): void {
    this.authService.autenticado$.subscribe(() => {
      this.actualizarEstadoAutenticacion();
    });

    this.comunicacionService.fondosActualizados$.subscribe(() => {
      console.log('Evento de fondos actualizados recibido');
      this.actualizarEstadoAutenticacion(); // Actualizar el estado de los fondos
    });

    this.actualizarEstadoAutenticacion();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Refresca la página
    });
  }

  //iniciarSesion(usuario: any) {
  //  this.authService.guardarUsuario(usuario);
  //  this.router.navigate(['/']).then(() => {
  //    window.location.reload(); // Refresca la página
  //  });
  //}

  actualizarEstadoAutenticacion() {
    const user = this.authService.obtenerUsuario();
    if (user) {
      this.isLoggedIn = true;
      this.userName = user.nombre;
      this.userBalance = `s/${user.fondos}`;
      console.log('Estado de autenticación actualizado:', this.userBalance);
    } else {
      this.isLoggedIn = false;
    }
    this.cdr.detectChanges(); // Forzar la detección de cambios si es necesario
  }

  actualizarEstadoUsuario() {
    const user = this.authService.obtenerUsuario();
    if (user) {
      this.userName = user.nombre;
      this.userBalance = `s/${user.fondos}`;
    }
  }





}
