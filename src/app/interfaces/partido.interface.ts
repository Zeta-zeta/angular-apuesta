export interface Partido {
  id: number
  idEquipoLocal: Equipo
  idEquipoVisitante: Equipo
  golesLocal: number
  golesVisitante: number
  fechahora: string
  estado: string
  idEquipoGanador: number

}

export interface Equipo {
  id: number;
  nombre: string;
  pais: string;
  fechaFundacion: string;
  presidente: string;
}
