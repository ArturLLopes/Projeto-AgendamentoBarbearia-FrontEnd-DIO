import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-no-dialog',
  imports: [MatButtonModule, MatDialogModule],  // Importações dos módulos necessários
  templateUrl: './yes-no-dialog.component.html',  // Caminho do template
  styleUrls: ['./yes-no-dialog.component.scss'], // Caminho do arquivo de estilo
})
export class YesNoDialogComponent {
  // A injeção de dados do diálogo através do MAT_DIALOG_DATA
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  // A variável 'data' será acessível dentro do template,
  // permitindo passar qualquer informação (como título e conteúdo do diálogo)
}
