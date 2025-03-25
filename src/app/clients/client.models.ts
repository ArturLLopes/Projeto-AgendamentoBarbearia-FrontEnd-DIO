// Interface usada para representar um cliente no formulário de criação/edição
export interface ClientModelForm {
  id: number;        // O ID do cliente (geralmente 0 para novos clientes)
  name: string;      // Nome do cliente
  email: string;     // E-mail do cliente
  phone: string;     // Telefone do cliente
}

// Interface usada para representar um cliente exibido na tabela (normalmente já com id)
export interface ClientModelTable {
  id: number;        // ID do cliente (único para cada cliente)
  name: string;      // Nome do cliente
  email: string;     // E-mail do cliente
  phone: string;     // Telefone do cliente
}
