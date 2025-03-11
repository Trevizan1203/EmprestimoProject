export interface EmprestimoModel {
  id: number;
  clienteId: number;
  dataEmprestimo: Date;
  moeda: String;
  valorObtido: number;
  dataVencimento: Date;
  taxaConversao: number;
  valorFinal: number;
  meses: number;
  expandido?: boolean;
}
