import { Component, Inject, OnDestroy } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientModelForm } from '../client.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ClientFormComponent } from '../components/client-form/client-form.component';

@Component({
  selector: 'app-new-client',
  imports: [ClientFormComponent],  // Importa o componente de formulário para o novo cliente
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss'],  // Usando styleUrls ao invés de styleUrl para consistência
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },  // Serviço de client
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }  // Serviço de Snackbar para feedback
  ]
})
export class NewClientComponent implements OnDestroy {

  private httpSubscription?: Subscription;  // Subscription para gerenciar a requisição HTTP

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService,  // Serviço de API para clientes
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService,  // Serviço de Snackbar
    private readonly router: Router  // Serviço de roteamento para navegar para outras páginas
  ) { }

  // Método para limpar a subscription quando o componente for destruído
  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();  // Limpa a subscription para evitar vazamentos de memória
    }
  }

  // Método chamado ao submeter o formulário
  onSubmitClient(value: ClientModelForm): void {
    const { id, ...request } = value;  // Desestruturação para excluir o id, já que não é necessário na criação de um novo cliente

    // Fazendo a requisição para salvar o cliente
    this.httpSubscription = this.httpService.save(request).subscribe(
      () => {
        // Caso a requisição seja bem-sucedida, mostra uma mensagem de sucesso e navega para a lista de clientes
        this.snackBarManager.show('Usuário cadastrado com sucesso');
        this.router.navigate(['clients/list']);
      },
      (error) => {
        // Em caso de erro na requisição, mostra uma mensagem de erro
        this.snackBarManager.show('Erro ao cadastrar o cliente. Tente novamente.');
        console.error(error);  // Log do erro para depuração
      }
    );
  }

}
