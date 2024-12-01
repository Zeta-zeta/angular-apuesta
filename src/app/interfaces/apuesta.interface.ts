export interface Apuesta {
  id: number
  idPartido: Partido
  idUsuario: Usuario
  montoApuesta: number
  fecha: string
  resultado: boolean
  idEquipoApuesta: number
}

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
  id: number
  nombre: string
  pais: string
  fechaFundacion: string
  presidente: string
}

export interface Usuario {
  id: number
  nombre: string
  email: string
  password: string
  dni: string
  fechaNacimiento: string
  fondos: number
  roles: any[]
}
