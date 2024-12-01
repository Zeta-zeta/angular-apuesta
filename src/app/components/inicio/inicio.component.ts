import { Component, OnInit } from '@angular/core';
import { InicioService } from '../../services/inicio.service';
import { Partido } from '../../interfaces/partido.interface';
import { ComunicacionService } from '../../services/comunicacion.service';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit{

  listaPartidos: Partido[] = [];
  partidosEnVivo: Partido[] = [];
  partidosProximos: Partido[] = [];
  partidosTerminados: Partido[] = [];

  constructor(
    private inicioService: InicioService,
    private comunicacionService:ComunicacionService,
    private usuarioService: UsuarioService,
  ){}

  async ngOnInit(): Promise<void> {
    this.getPartidos();
    const usuarioJSON = localStorage.getItem('usuario');
          if (usuarioJSON) {
            const usuarioOldStorage = JSON.parse(usuarioJSON);
            await this.usuarioService.actualizarLocalStorageConDatosDelAPI(usuarioOldStorage.id);
            this.comunicacionService.emitirFondosActualizados();
          }
  }


  getPartidos(): void{
    this.inicioService.getPartidos().subscribe({
      next: (result) =>{
        this.listaPartidos = result;
        this.filtrarPartidos();
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }

  filtrarPartidos(): void {
    this.partidosEnVivo = this.listaPartidos.filter(partido => partido.estado === 'En vivo');
    this.partidosProximos = this.listaPartidos.filter(partido => partido.estado === 'Proximo');
    this.partidosTerminados = this.listaPartidos.filter(partido => partido.estado === 'Terminado');
  }

  hayPartidosProximos(): boolean{
    return this.partidosProximos.length>0;
  }

  hayPartidosEnVivo(): boolean{
    return this.partidosEnVivo.length>0;
  }

}
