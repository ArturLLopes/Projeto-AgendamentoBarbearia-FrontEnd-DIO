import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { SERVICES_TOKEN } from '../../services/service.token';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { Subscription } from 'rxjs';
import { ClientModelTable } from '../client.models';
import { Router } from '@angular/router';
import { ClientTableComponent } from '../components/client-table/client-table.component';

@Component({
  selector: 'app-list-clients',
  imports: [ClientTableComponent],
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ]
})
export class ListClientsComponent implements OnInit, OnDestroy {

  private httpSubscriptions: Subscription[] = []; // Array para armazenar as subscriptions
  clients: ClientModelTable[] = []; // Lista de clientes

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService, // Serviço de cliente
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService, // Serviço de Snackbar para mensagens
    private readonly router: Router // Serviço de roteamento para navegação entre páginas
  ) { }

  // Método de inicialização do componente
  ngOnInit(): void {
    // Fazendo requisição para obter a lista de clientes e assinando a resposta
    this.httpSubscriptions.push(
      this.httpService.list().subscribe(
        data => {
          this.clients = data; // Armazena os clientes retornados pela API
        },
        error => {
          // Caso haja um erro na requisição, exibe uma mensagem de erro
          this.snackBarManager.show('Erro ao carregar a lista de clientes');
        }
      )
    );
  }

  // Método que é chamado quando o componente é destruído para limpar as subscriptions
  ngOnDestroy(): void {
    // Desfazendo todas as subscriptions para evitar vazamentos de memória
    this.httpSubscriptions.forEach(s => s.unsubscribe());
  }

  // Método para navegação à página de edição de cliente
  update(client: ClientModelTable): void {
    // Redireciona para a página de edição passando o id do cliente
    this.router.navigate(['clients/edit-client', client.id]);
  }

  // Método para excluir um cliente
  delete(client: ClientModelTable): void {
    // Fazendo requisição para deletar o cliente selecionado
    this.httpSubscriptions.push(
      this.httpService.delete(client.id).subscribe(
        () => {
          // Exibe uma mensagem de sucesso após exclusão
          this.snackBarManager.show(`O cliente ${client.name} foi excluído com sucesso`);
          // Após a exclusão, refaz a requisição para atualizar a lista de clientes
          this.httpService.list().subscribe(
            data => {
              this.clients = data; // Atualiza a lista com os clientes restantes
            },
            error => {
              this.snackBarManager.show('Erro ao atualizar a lista de clientes após exclusão');
            }
          );
        },
        error => {
          // Em caso de erro ao tentar excluir, exibe uma mensagem de erro
          this.snackBarManager.show('Erro ao excluir cliente');
        }
      )
    );
  }

}
