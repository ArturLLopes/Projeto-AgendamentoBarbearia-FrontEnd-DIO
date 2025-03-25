import { ComponentType } from "@angular/cdk/portal";
import { Observable } from "rxjs";
import { YesNoDialogComponent } from "../commons/components/yes-no-dialog/yes-no-dialog.component";

/**
 * Interface que define os métodos para gerenciar diálogos modais no sistema.
 */
export interface IDialogManagerService {

  /**
   * Abre um diálogo de confirmação com as opções "Sim" ou "Não".
   * @param component O componente do diálogo a ser exibido. Neste caso, o componente `YesNoDialogComponent`.
   * @param data Dados que serão passados para o diálogo, incluindo o título e o conteúdo.
   * @returns Observable que emite o resultado após o fechamento do diálogo (geralmente "Sim" ou "Não").
   */
  showYesNoDialog(
    component: ComponentType<YesNoDialogComponent>,
    data: { title: string, content: string }
  ): Observable<any>;

}
