
# Documentação da API

#### Retorna todos os pacientes

```http
  GET /pacient
```

<br />

#### Retorna um paciente

```http
  GET /pacient/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do pacient que você quer |

<br />

#### Cadastra novo Paciente

```http
  POST /pacient
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. Nome do Paciente |
| `age`      | `number` | **Obrigatório**. Idade do Paciente |
| `sex`      | `string` | **Obrigatório**. Sexo do Paciente |
| `cityBorn`      | `string` | **Obrigatório**. Cidade de Nascimento do Paciente|
| `preServiceDescription`      | `string` | **Obrigatório**. Descrição do caso do Paciente |
| `photo`      | `file` | **Obrigatório**. Photo para perfil do Paciente |

<br />

#### Deletar um paciente

```http
  DELETE /pacient/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do pacient que você quer deletar |

```http
  PUT /pacient/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. Nome do Paciente |
| `age`      | `number` | **Obrigatório**. Idade do Paciente |
| `sex`      | `string` | **Obrigatório**. Sexo do Paciente |
| `cityBorn`      | `string` | **Obrigatório**. Cidade de Nascimento do Paciente|
| `preServiceDescription`      | `string` | **Obrigatório**. Descrição do caso do Paciente |
| `photo`      | `file` | **Obrigatório**. Photo para perfil do Paciente |