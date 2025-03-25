import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ClientModelTable } from '../../client.models';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { SERVICES_TOKEN } from '../../../services/service.token';
import { IDialogManagerService } from '../../../services/idialog-manager.service';
import { DialogManagerService } from '../../../services/dialog-manager.service';
import { YesNoDialogComponent } from '../../../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'app-client-table',
  imports: [
    MatTableModule, // Módulo necessário para usar o Material Table
    MatButtonModule, // Módulo para usar botões do Angular Material
    MatIconModule, // Módulo para ícones do Angular Material
    MatPaginatorModule, // Módulo necessário para paginação
    MatTooltipModule, // Módulo para tooltips do Angular Material
  ],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
  providers: [
    { provide: SERVICES_TOKEN.DIALOG, useClass: DialogManagerService }, // Injeção de dependência do serviço de diálogo
    { provide: MatPaginatorIntl, useClass: CustomPaginator }, // Customização do paginator
  ]
})
export class ClientTableComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() clients: ClientModelTable[] = [] // Entrada de dados para a lista de clientes

  dataSource!: MatTableDataSource<ClientModelTable> // Fonte de dados da tabela

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referência ao paginator da tabela

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions']; // Colunas a serem exibidas na tabela

  private dialogManagerServiceSubscriptions?: Subscription; // Assinaturas do serviço de diálogo

  @Output() onConfirmDelete = new EventEmitter<ClientModelTable>(); // Emissor de evento para confirmar exclusão

  @Output() onRequestUpdate = new EventEmitter<ClientModelTable>(); // Emissor de evento para atualizar cliente

  constructor(
    @Inject(SERVICES_TOKEN.DIALOG) private readonly dialogManagerService: IDialogManagerService, // Injeção de dependência do serviço de diálogo
  ) { }

  // Método chamado após a visualização do componente ser inicializada
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Configura a páginação para o dataSource
  }

  // Método chamado quando há mudanças nas entradas do componente
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clients'] && this.clients) {
      this.dataSource = new MatTableDataSource<ClientModelTable>(this.clients); // Atualiza a fonte de dados da tabela
      if (this.paginator) {
        this.dataSource.paginator = this.paginator; // Atribui o paginator à fonte de dados
      }
    }
  }

  // Método chamado quando o componente é destruído, para limpar as assinaturas
  ngOnDestroy(): void {
    if (this.dialogManagerServiceSubscriptions) {
      this.dialogManagerServiceSubscriptions.unsubscribe(); // Limpeza das assinaturas
    }
  }

  // Método para formatar o número de telefone
  formatPhone(phone: string): string {
    return `( ${phone.substring(0, 2)} ) ${phone.substring(2, 7)} - ${phone.substring(7)}`;
  }

  // Método para emitir evento de atualização do cliente
  update(client: ClientModelTable): void {
    this.onRequestUpdate.emit(client); // Emite evento de solicitação de atualização
  }

  // Método para excluir um cliente
  delete(client: ClientModelTable): void {
    // Exibe um diálogo de confirmação antes de excluir o cliente
    this.dialogManagerService.showYesNoDialog(
      YesNoDialogComponent,
      { title: 'Exclusão de cliente', content: `Confirma a exclusão do cliente ${client.name}` }
    )
      .subscribe(result => {
        if (result) {
          // Se o usuário confirmar a exclusão, emite o evento de exclusão
          this.onConfirmDelete.emit(client);

          // Atualiza a lista removendo o cliente excluído
          const updatedList = this.dataSource.data.filter(c => c.id !== client.id);
          this.dataSource = new MatTableDataSource<ClientModelTable>(updatedList); // Atualiza a fonte de dados da tabela
        }
      });
  }

}
