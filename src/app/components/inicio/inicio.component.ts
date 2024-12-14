import { Component, OnInit } from '@angular/core';
import { InicioService } from '../../services/inicio.service';
import { Equipo, Partido } from '../../interfaces/partido.interface';
import { ComunicacionService } from '../../services/comunicacion.service';
import { UsuarioService } from '../../services/usuario.service';
import { EquiposService } from '../../services/equipos.service';
import { PartidosService } from '../../services/partidos.service';
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
  searchQuery : String = '';
  listaEquipos: Equipo[] = []
  constructor(
    private inicioService: InicioService,
    private comunicacionService:ComunicacionService,
    private usuarioService: UsuarioService,
    private equipoService: EquiposService,
    private partidoService: PartidosService

  ){}

  async ngOnInit(): Promise<void> {
    this.getPartidos();
    this.getEquipos();

    const usuarioJSON = localStorage.getItem('usuario');
          if (usuarioJSON) {
            const usuarioOldStorage = JSON.parse(usuarioJSON);
            await this.usuarioService.actualizarLocalStorageConDatosDelAPI(usuarioOldStorage.id);
            this.comunicacionService.emitirFondosActualizados();
          }
  }
  filteredEquipos: Equipo[] = [];

  filterEquipos(event: Event): void|Equipo {
    const input = event.target as HTMLInputElement; // Asegura que es un HTMLInputElement
    this.searchQuery = input.value.trim(); // Accede al valor
    if (this.searchQuery.trim() === '') {
      this.filteredEquipos = [];
      return;
    }
    this.filteredEquipos = this.listaEquipos.filter(equipo =>
      equipo.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    return;
   }

   selectEquipo(equipo: Equipo): void {
    this.partidosEnVivo = this.listaPartidos.filter(
      partido =>
        partido.idEquipoLocal.id === equipo.id && partido.estado === "En vivo" || partido.idEquipoVisitante.id === equipo.id && partido.estado === "En vivo"
    );
    this.partidosProximos = this.listaPartidos.filter(
      partido =>
        partido.idEquipoLocal.id === equipo.id && partido.estado === "Proximo" || partido.idEquipoVisitante.id === equipo.id && partido.estado === "Proximo"
    );
    this.partidosTerminados = this.listaPartidos.filter(
      partido =>
        partido.idEquipoLocal.id === equipo.id && partido.estado === "Terminado" || partido.idEquipoVisitante.id === equipo.id && partido.estado === "Terminado"
    );

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
  getEquipos(): void{
    this.equipoService.getEquipos().subscribe({
      next: (result) =>{
        this.listaEquipos = result;
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
