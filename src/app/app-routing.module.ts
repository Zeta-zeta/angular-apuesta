import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormsModule } from '@angular/forms';
import { EquiposComponent } from './components/equipos/equipos.component';
import { HistorialApuestasComponent } from './components/historial-apuestas/historial-apuestas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { MiBilleteraComponent } from './components/mi-billetera/mi-billetera.component';
import { CrearpartidoComponent } from './components/crearpartido/crearpartido.component';
import { ApostarComponent } from './components/apostar/apostar.component';
import { PartidospendientesComponent } from './components/partidospendientes/partidospendientes.component';
import { DefinirpartidoComponent } from './components/definirpartido/definirpartido.component';
import { CrearequipoComponent } from './components/crearequipo/crearequipo.component';
import { ListadoComponent } from './components/listado/listado.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path:'equipo',
    component:EquiposComponent
  },
  {
    path:'misApuestas',
    component:HistorialApuestasComponent
  },
  {
    path:'registro',
    component:RegistroComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: 'billetera',
    component: MiBilleteraComponent
  },
  {
    path: 'crearpartido',
    component: CrearpartidoComponent
  },
  {
    path: 'apostar/:id',
    component: ApostarComponent
  },
  {
    path:'partidospendientes',
    component:PartidospendientesComponent
  },
  {
    path:'definirpartido/:id',
    component:DefinirpartidoComponent
  },
  {
    path: 'nuevoequipo',
    component:CrearequipoComponent
  },
  {
    path: 'listado',
    component:ListadoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    FormsModule]
})
export class AppRoutingModule { }
