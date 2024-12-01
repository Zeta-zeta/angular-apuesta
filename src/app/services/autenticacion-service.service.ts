import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionServiceService {

  private autenticado = new BehaviorSubject<boolean>(this.estaAutenticado());
  autenticado$ = this.autenticado.asObservable();
  constructor() { }

  cambiarEstadoAutenticacion(estado: boolean) {
    this.autenticado.next(estado);
  }

  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.cambiarEstadoAutenticacion(true);
  }

  obtenerUsuario() {
    // Devuelve el usuario actualizado desde localStorage
    return JSON.parse(localStorage.getItem('usuario')!);
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.cambiarEstadoAutenticacion(false);
  }

  estaAutenticado(): boolean {
    return this.obtenerUsuario() !== null;
  }
}
