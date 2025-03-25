export interface ScheduleAppointementMonthModel {
  year: number;
  month: number;
  scheduledAppointments: ClientScheduleAppointmentModel[];
}

export interface ClientScheduleAppointmentModel {
  id: number;
  day: number;
  startAt: Date; // Pode ser ajustado para string ou number, se necessário
  endAt: Date; // O mesmo para endAt, dependendo do seu uso
  clientId: number;
  clientName: string;

}

export interface SaveScheduleModel {
  startAt?: Date; // Considerando que startAt pode ser opcional
  endAt?: Date; // Considerando que endAt também pode ser opcional
  clientId?: number; // Para um novo agendamento, clientId pode ser opcional até ser definido
}

export interface SelectClientModel {
  id: number;
  name: string;
  
}
