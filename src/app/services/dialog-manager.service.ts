import { Injectable } from '@angular/core';
import { IDialogManagerService } from './idialog-manager.service';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { YesNoDialogComponent } from '../commons/components/yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Serviço que gerencia a exibição de diálogos de confirmação.
 * Implementa a interface IDialogManagerService.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogManagerService implements IDialogManagerService {

  // Injeção do serviço MatDialog, que permite abrir diálogos modais
  constructor(private readonly dialog: MatDialog) { }

  /**
   * Abre um diálogo de confirmação com as opções "Sim" ou "Não".
   * @param component Componente do diálogo a ser exibido.
   * @param data Dados a serem passados para o diálogo, como título e conteúdo.
   * @returns Observable que emite o resultado do fechamento do diálogo (sim ou não).
   */
  showYesNoDialog(
    component: ComponentType<YesNoDialogComponent>,
    data: { title: string; content: string; }
  ): Observable<any> {
    // Abre o diálogo passando o componente e os dados fornecidos
    const dialogRef = this.dialog.open(component, {
      width: '400px',  // Define a largura do diálogo
      data            // Passa os dados do título e conteúdo para o diálogo
    });

    // Retorna o Observable que emite o resultado após o fechamento do diálogo
    return dialogRef.afterClosed();
  }
}
