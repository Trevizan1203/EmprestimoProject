export interface ClienteModel {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  editing?: boolean;
}
