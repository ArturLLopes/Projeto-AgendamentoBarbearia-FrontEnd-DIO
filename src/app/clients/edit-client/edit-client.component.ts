import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SERVICES_TOKEN } from '../../services/service.token';
import { IClientService } from '../../services/api-client/clients/iclients.service';
import { ClientsService } from '../../services/api-client/clients/clients.service';
import { ClientFormComponent } from '../components/client-form/client-form.component';
import { SnackbarManagerService } from '../../services/snackbar-manager.service';
import { ISnackbarManagerService } from '../../services/isnackbar-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientModelForm } from '../client.models';

@Component({
  selector: 'app-edit-client',
  imports: [ClientFormComponent],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.HTTP.CLIENT, useClass: ClientsService },
    { provide: SERVICES_TOKEN.SNACKBAR, useClass: SnackbarManagerService }
  ]
})
export class EditClientComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>(); // Subject para controlar a destruição de subscriptions
  client: ClientModelForm = { id: 0, name: '', email: '', phone: '' };

  constructor(
    @Inject(SERVICES_TOKEN.HTTP.CLIENT) private readonly httpService: IClientService, // Serviço de cliente
    @Inject(SERVICES_TOKEN.SNACKBAR) private readonly snackBarManager: ISnackbarManagerService, // Serviço de Snackbar para exibir mensagens
    private readonly activatedRoute: ActivatedRoute, // Roteador para pegar parâmetros da URL
    private readonly router: Router // Roteador para redirecionamento após ações
  ) { }

  // Método de inicialização do componente
  ngOnInit(): void {
    // Pegando o id do cliente da URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      // Caso não tenha o id na URL, mostra erro e redireciona para a lista
      this.snackBarManager.show('Erro ao recuperar informações do cliente');
      this.router.navigate(['clients/list']);
      return;
    }

    // Fazendo a requisição para buscar o cliente pelo id
    this.httpService.findById(Number(id)).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.client = data; // Preenche o cliente com os dados retornados
      },
      error => {
        // Caso haja erro na requisição, exibe uma mensagem e redireciona
        this.snackBarManager.show('Erro ao carregar dados do cliente');
        this.router.navigate(['clients/list']);
      }
    );
  }

  // Método que é chamado ao submeter o formulário
  onSubmitClient(value: ClientModelForm): void {
    const { id, ...request } = value; // Desestrutura o id para não enviá-lo novamente

    if (id) {
      // Se id existir, significa que estamos atualizando o cliente
      this.httpService.update(id, request).pipe(takeUntil(this.destroy$)).subscribe(
        () => {
          // Se a atualização for bem-sucedida, mostra uma mensagem e redireciona para a lista
          this.snackBarManager.show('Usuário atualizado com sucesso');
          this.router.navigate(['clients/list']);
        },
        error => {
          // Em caso de erro na atualização, exibe uma mensagem
          this.snackBarManager.show('Erro ao atualizar cliente');
        }
      );
      return;
    }

    // Caso não haja id, exibe mensagem de erro e redireciona
    this.snackBarManager.show('Um erro inesperado aconteceu');
    this.router.navigate(['clients/list']);
  }

  // Método para destruir as subscriptions e evitar vazamentos de memória
  ngOnDestroy(): void {
    this.destroy$.next();  // Notifica todas as subscriptions para que sejam desfeitas
    this.destroy$.complete(); // Finaliza o Subject
  }
}
