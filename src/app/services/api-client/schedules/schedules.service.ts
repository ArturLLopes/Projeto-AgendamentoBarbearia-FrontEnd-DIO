import { Injectable } from '@angular/core';
import { IScheduleService } from './ischedules.service';
import { Observable } from 'rxjs';
import { SaveScheduleRequest, SaveScheduleResponse, ScheduleAppointmentMonthResponse } from './schedule.models';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

/**
 * Serviço responsável por gerenciar agendamentos.
 * Implementa a interface IScheduleService.
 */
@Injectable({
  providedIn: 'root'
})
export class SchedulesService implements IScheduleService {

  // URL base da API, obtida a partir das variáveis de ambiente
  private readonly basePath = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Salva um novo agendamento.
   * @param request Dados do agendamento a ser salvo.
   * @returns Observable com a resposta contendo os dados do agendamento salvo.
   */
  save(request: SaveScheduleRequest): Observable<SaveScheduleResponse> {
    return this.http.post<SaveScheduleResponse>(`${this.basePath}schedules`, request);
  }

  /**
   * Deleta um agendamento existente.
   * @param id ID do agendamento a ser deletado.
   * @returns Observable vazio indicando a conclusão da exclusão.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}schedules/${id}`);
  }

  /**
   * Lista os agendamentos de um determinado mês.
   * @param year Ano do mês a ser consultado.
   * @param month Mês do ano a ser consultado.
   * @returns Observable com os agendamentos do mês solicitado.
   */
  listInMonth(year: number, month: number): Observable<ScheduleAppointmentMonthResponse> {
    return this.http.get<ScheduleAppointmentMonthResponse>(`${this.basePath}schedules/${year}/${month}`);
  }
}
