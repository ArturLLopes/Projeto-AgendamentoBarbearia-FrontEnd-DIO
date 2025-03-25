import { Observable } from 'rxjs';
import {
  DetailClientResponse,
  ListClientResponse,
  SaveClientRequest,
  SaveClientResponse,
  UpdateClientRequest,
  UpdateClientResponse,
} from './client.models';

/**
 * Interface que define os métodos de serviço para gerenciar os clientes.
 */
export interface IClientService {

  /**
   * Salva um novo cliente.
   * @param request Dados do cliente a ser salvo.
   * @returns Observable com a resposta de sucesso do salvamento.
   */
  save(request: SaveClientRequest): Observable<SaveClientResponse>;

  /**
   * Atualiza os dados de um cliente existente.
   * @param id ID do cliente a ser atualizado.
   * @param request Dados atualizados do cliente.
   * @returns Observable com a resposta da atualização.
   */
  update(id: number, request: UpdateClientRequest): Observable<UpdateClientResponse>;

  /**
   * Deleta um cliente.
   * @param id ID do cliente a ser deletado.
   * @returns Observable vazio indicando a conclusão da exclusão.
   */
  delete(id: number): Observable<void>;

  /**
   * Lista todos os clientes.
   * @returns Observable com a lista de todos os clientes.
   */
  list(): Observable<ListClientResponse[]>;

  /**
   * Busca detalhes de um cliente pelo ID.
   * @param id ID do cliente a ser buscado.
   * @returns Observable com os detalhes do cliente.
   */
  findById(id: number): Observable<DetailClientResponse>;
}
