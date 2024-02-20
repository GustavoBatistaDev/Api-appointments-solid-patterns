CREATE TABLE
  public.agendamentos (
    id serial NOT NULL,
    dia date NOT NULL,
    razao_consulta text NOT NULL,
    necessidade_especial text NULL,
    pcd boolean NOT NULL,
    doenca_cronica boolean NOT NULL,
    status text NOT NULL,
    cancelado boolean NOT NULL DEFAULT false,
    pacientes_id integer NOT NULL,
    especialidades_id integer NOT NULL,
    doutores_id integer NOT NULL,
    criado_em timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
    horas time without time zone NULL
  );

ALTER TABLE
  public.agendamentos
ADD
  CONSTRAINT agendamentos_pkey PRIMARY KEY (id)


CREATE TABLE
      public.pacientes (
      id serial NOT NULL,
      nome text NOT NULL,
      ultimo_nome text NULL,
      email text NOT NULL,
      cpf text NULL,
      senha text NOT NULL,
      criado_em timestamp without time zone NULL DEFAULT CURRENT_TIMESTAMP,
      ativo boolean NOT NULL DEFAULT false,
      foto text NULL,
      rg text NULL,
      data_nascimento date NULL,
      numero_celular text NULL
);

ALTER TABLE
public.pacientes
ADD
CONSTRAINT pacientes_pkey PRIMARY KEY (id)


CREATE TABLE
  public.especialidades (
    id serial NOT NULL,
    nome text NOT NULL,
    criado_em timestamp without time zone NULL DEFAULT now()
  );

ALTER TABLE
  public.especialidades
ADD
  CONSTRAINT especialidades_pkey PRIMARY KEY (id)



CREATE TABLE
  public.doutores (
    id serial NOT NULL,
    nome text NOT NULL,
    created_at timestamp without time zone NULL DEFAULT now(),
    crm text NULL,
    especialidades_id integer NULL
  );

ALTER TABLE
  public.doutores
ADD
  CONSTRAINT doutores_pkey PRIMARY KEY (id)