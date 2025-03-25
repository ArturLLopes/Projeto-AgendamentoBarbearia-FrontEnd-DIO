import { InjectionToken } from "@angular/core";
import { IClientService } from "./api-client/clients/iclients.service";
import { ISnackbarManagerService } from "./isnackbar-manager.service";
import { IDialogManagerService } from "./idialog-manager.service";
import { IScheduleService } from "./api-client/schedules/ischedules.service";

/**
 * Define tokens de injeção de dependências para diferentes serviços.
 * Utilizado pelo Angular para injetar implementações específicas nos componentes ou serviços que precisem deles.
 */
export const SERVICES_TOKEN = {
  HTTP: {
    // Token para o serviço de clientes
    CLIENT: new InjectionToken<IClientService>('SERVICES_TOKEN.HTTP.CLIENT'),

    // Token para o serviço de agendamentos
    SCHEDULE: new InjectionToken<IScheduleService>('SERVICES_TOKEN.HTTP.SCHEDULE'),
  },

  // Token para o serviço de Snackbar (gerenciamento de mensagens temporárias)
  SNACKBAR: new InjectionToken<ISnackbarManagerService>('SERVICES_TOKEN.SNACKBAR'),

  // Token para o serviço de diálogos (gerenciamento de janelas modais)
  DIALOG: new InjectionToken<IDialogManagerService>('SERVICES_TOKEN.DIALOG')
}
