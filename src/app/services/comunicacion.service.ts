import { Injectable } from '@angular/core';
import { Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  private fondosActualizadosSource = new Subject <void>();
  fondosActualizados$ = this.fondosActualizadosSource.asObservable();

  emitirFondosActualizados() {
    this.fondosActualizadosSource.next();
  }
}
