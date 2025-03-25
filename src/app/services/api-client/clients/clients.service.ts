import { Injectable } from '@angular/core';
import { IClientService } from './iclients.service';
import { Observable } from 'rxjs';
import { SaveClientRequest, SaveClientResponse, UpdateClientResponse, ListClientResponse, DetailClientResponse, UpdateClientRequest } from './client.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root' // Torna o serviço acessível em toda a aplicação
})
export class ClientsService implements IClientService {

  // Caminho base da API, extraído do arquivo de configuração do ambiente
  private readonly basePath = `${environment.apiUrl}clients`;

  constructor(private http: HttpClient) { }

  // Salva um novo cliente
  save(request: SaveClientRequest): Observable<SaveClientResponse> {
    return this.http.post<SaveClientResponse>(this.basePath, request);
  }

  // Atualiza os dados de um cliente existente
  update(id: number, request: UpdateClientRequest): Observable<UpdateClientResponse> {
    return this.http.put<UpdateClientResponse>(`${this.basePath}/${id}`, request);
  }

  // Deleta um cliente pelo seu ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${id}`);
  }

  // Lista todos os clientes
  list(): Observable<ListClientResponse[]> {
    return this.http.get<ListClientResponse[]>(this.basePath);
  }

  // Encontra um cliente específico pelo seu ID
  findById(id: number): Observable<DetailClientResponse> {
    return this.http.get<DetailClientResponse>(`${this.basePath}/${id}`);
  }
}
