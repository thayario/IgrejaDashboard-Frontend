export interface PessoaDto {
  codigo: number | null;
  nome: string;
  email: string;
  sexo: number | null;
  status: number | null;
}

export interface DashboardTotaisDto {
  totalMembros: number;
  totalMasculino: number;
  totalFeminino: number;
}
