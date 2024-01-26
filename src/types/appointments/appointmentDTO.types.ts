export type DataAppointmentDTO = {
  id?: number;
  dia: string;
  razao_consulta: string;
  necessidade_especial: string;
  pcd: boolean;
  doenca_cronica: string;
  especialidades_id: number;
  criado_em?: string;
  status?: string;
  cancelado?: boolean;
  pacientes_id?: number;
  doutores_id?: number;
  horas: string;
};

export type DataJoinnedAppointment = {
  id?: number;
  dia: string;
  razao_consulta: string;
  necessidade_especial: string;
  pcd: boolean;
  doenca_cronica: string;
  especialidades_id: number;
  criado_em?: string;
  status?: string;
  cancelado?: boolean;
  pacientes_id?: number;
  doutores_id?: number;
  horas: string;
  nomePaciente: string;
  nomeDoutor: string;
  nomeEspecialidade: string;
};
