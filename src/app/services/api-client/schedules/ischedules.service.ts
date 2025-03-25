import { Observable } from "rxjs";
import { SaveScheduleRequest, SaveScheduleResponse, ScheduleAppointmentMonthResponse } from "./schedule.models";

/**
 * Interface que define os métodos de serviço para gerenciar os agendamentos.
 */
export interface IScheduleService {

  /**
   * Salva um novo agendamento.
   * @param request Dados do agendamento a ser salvo.
   * @returns Observable com a resposta de sucesso do salvamento.
   */
  save(request: SaveScheduleRequest): Observable<SaveScheduleResponse>;

  /**
   * Deleta um agendamento existente.
   * @param id ID do agendamento a ser deletado.
   * @returns Observable vazio indicando a conclusão da exclusão.
   */
  delete(id: number): Observable<void>;

  /**
   * Lista os agendamentos de um determinado mês.
   * @param year Ano do mês a ser consultado.
   * @param month Mês do ano a ser consultado.
   * @returns Observable com os agendamentos do mês solicitado.
   */
  listInMonth(year: number, month: number): Observable<ScheduleAppointmentMonthResponse>;
}
