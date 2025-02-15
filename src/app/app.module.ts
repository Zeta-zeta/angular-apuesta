import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { FooterComponent } from './components/footer/footer.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { HistorialApuestasComponent } from './components/historial-apuestas/historial-apuestas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MiBilleteraComponent } from './components/mi-billetera/mi-billetera.component';
import { CrearpartidoComponent } from './components/crearpartido/crearpartido.component';
import { ApostarComponent } from './components/apostar/apostar.component';
import { CrearequipoComponent } from './components/crearequipo/crearequipo.component';
import { DefinirpartidoComponent } from './components/definirpartido/definirpartido.component';
import { PartidospendientesComponent } from './components/partidospendientes/partidospendientes.component';
import { ListadoComponent } from './components/listado/listado.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavegacionComponent,
    FooterComponent,
    EquiposComponent,
    HistorialApuestasComponent,
    RegistroComponent,
    LoginComponent,
    MiBilleteraComponent,
    CrearpartidoComponent,
    ApostarComponent,
    CrearequipoComponent,
    DefinirpartidoComponent,
    PartidospendientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ListadoComponent,
    FormsModule // Se importa aquí como standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

