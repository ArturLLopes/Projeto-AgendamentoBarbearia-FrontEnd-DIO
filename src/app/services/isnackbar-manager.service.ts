/**
 * Interface para o serviço de gerenciamento de Snackbar.
 * Utilizado para exibir mensagens temporárias na tela.
 */
export interface ISnackbarManagerService {

  /**
   * Exibe uma mensagem em um Snackbar.
   * @param message A mensagem a ser exibida no Snackbar.
   * @param action (Opcional) A ação que será exibida no Snackbar. Exemplo: "Desfazer".
   * @param duration (Opcional) A duração em milissegundos para exibição da mensagem. Se não for fornecido, o Snackbar ficará visível por um tempo padrão.
   */
  show(message: string, action?: string, duration?: number): void;

}
