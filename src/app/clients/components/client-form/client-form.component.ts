import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ClientModelForm } from '../../client.models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-form',
  imports: [
    FormsModule, // Módulo necessário para trabalhar com formulários em Angular
    MatInputModule, // Módulo do Angular Material para campos de entrada
    MatFormFieldModule, // Módulo do Angular Material para form-fields
    MatButtonModule, // Módulo do Angular Material para botões
    NgxMaskDirective // Diretiva para aplicar máscaras nos campos de entrada
  ],
  templateUrl: './client-form.component.html', // Caminho do template HTML do componente
  styleUrls: ['./client-form.component.scss'] 
})
export class ClientFormComponent {

  // Propriedade recebida como entrada, contendo os dados do cliente
  @Input() client: ClientModelForm = {
    id: 0,
    name: '',
    email: '',
    phone: ''
  };

  // Evento que será emitido quando o formulário for submetido
  @Output() clientSubmited = new EventEmitter<ClientModelForm>();

  // Método chamado ao enviar o formulário
  onSubmit(_: NgForm) {
    this.clientSubmited.emit(this.client);
  }
}
