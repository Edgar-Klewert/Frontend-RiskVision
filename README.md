# Frontend-RiskVision

## Descrição

O **Frontend-RiskVision** é a interface do sistema **RiskVision**, que tem como objetivo auxiliar investidores e analistas financeiros a tomarem decisões rápidas e embasadas, utilizando a análise de sentimentos e avaliação de risco de notícias financeiras. O frontend foi desenvolvido com **React.js** ou **Next.js** e comunica-se diretamente com a **API** fornecida pelo backend para exibir dados e gráficos em tempo real.

A interface inclui painéis interativos com gráficos e informações sobre o mercado financeiro, ajudando os usuários a filtrar e analisar os dados relevantes para tomar decisões estratégicas.

---

## Tecnologias Utilizadas

O **Frontend-RiskVision** utiliza as seguintes tecnologias:

* **Next.js / React.js**: Frameworks para construção da interface do usuário.
* **TypeScript**: Para uma programação mais segura e com tipagem estática.
* **Tailwind CSS**: Framework para estilização rápida e responsiva.
* **Recharts / D3.js / Plotly**: Bibliotecas para criação de gráficos e visualizações interativas.
* **JWT (JSON Web Tokens)**: Para autenticação segura entre o frontend e o backend.

---

## Repositórios Relacionados

Este repositório é uma parte do sistema **RiskVision**, que está dividido em três repositórios principais:

* [**Frontend-RiskVision**](https://github.com/Edgar-Klewert/Frontend-RiskVision): Este repositório, contendo o frontend do sistema.
* [**RiskVision-Backend**](https://github.com/Yuri-Severo/RiskVision-Backend): Repositório que contém o backend, desenvolvido com **FastAPI**.
* [**Relatorio-Dados-RiskVision**](https://github.com/Edgar-Klewert/Relatorio-Dados-RiskVision): Repositório dedicado à análise de dados do sistema e geração de relatórios.

---

## Como Executar o Frontend

### 1. Pré-requisitos

Antes de rodar o frontend, é necessário ter os seguintes requisitos:

* **Node.js** (versão 16 ou superior).
* **Yarn**, **pnpm** ou **npm** (gerenciadores de pacotes).

### 2. Clone o Repositório

Clone o repositório **Frontend-RiskVision**:

```bash
git clone https://github.com/Edgar-Klewert/Frontend-RiskVision.git
```

### 3. Instalar as Dependências

Dentro do diretório do projeto, execute o seguinte comando para instalar as dependências do projeto:

```bash
npm install
```

Ou, se preferir usar o **Yarn**:

```bash
yarn install
```

Ou, com **Pnpm**:

```bash
pnpm install
```

### 4. Variáveis de Ambiente

No diretório **Frontend-RiskVision**, crie um arquivo `.env` a partir do arquivo `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com os seguintes valores:

```ini
NODE_ENV=development
API_URL=http://localhost:3333
NEXT_PUBLIC_API_URL=http://localhost:3333
JWT_SECRET=seu_segredo
```

### 5. Rodar o Projeto

Para rodar o frontend em modo de desenvolvimento, utilize o comando:

```bash
npm run dev
```

Ou, com **Yarn**:

```bash
yarn dev
```

Ou, com **Pnpm**:

```bash
pnpm dev
```

O frontend estará disponível em `http://localhost:3000`.

---

## Integração com o Backend

O **Frontend-RiskVision** se comunica com o **Backend-RiskVision**, que expõe a **API** para processar as informações financeiras. Certifique-se de que o backend esteja rodando no **Docker** ou localmente antes de iniciar o frontend.

### Como Rodar o Backend em Desenvolvimento

Se o backend não estiver configurado, você pode seguir as instruções no repositório [**RiskVision-Backend**](https://github.com/Yuri-Severo/RiskVision-Backend) para rodar o backend em um ambiente de desenvolvimento utilizando **Docker**.

---

## Estrutura do Projeto

Aqui está a estrutura do repositório do **Frontend-RiskVision**:

```
Frontend-RiskVision/
│
├── public/                # Arquivos estáticos (imagens, ícones, fontes, etc.)
├── src/                   # Código fonte do frontend
│   ├── actions/           # Funções para interação com a API
│   ├── components/        # Componentes reutilizáveis
│   ├── hooks/             # Hooks personalizados
│   ├── pages/             # Páginas da aplicação
│   ├── routers/           # Roteamento das páginas
│   ├── schemas/           # Validação de dados (ex: login, registro)
│   ├── styles/            # Arquivos de estilo (Tailwind CSS)
│   ├── utils/             # Funções utilitárias
│   ├── lib/               # Bibliotecas externas
│   └── env.ts             # Arquivo de configuração de variáveis de ambiente
├── .env.example           # Exemplo de arquivo de variáveis de ambiente
├── Dockerfile             # Dockerfile para containerização do frontend
├── package.json           # Dependências e scripts do projeto
└── README.md              # Documentação do frontend
```

### Páginas

* **Home**: Página inicial com informações sobre o sistema.
* **Dashboard**: Página que exibe os dados financeiros processados pelo backend.
* **Login**: Página para o login dos usuários.
* **Cadastro**: Página para registrar novos usuários.

---

## Contribuindo

Se você deseja contribuir para o projeto **RiskVision**, fique à vontade para fazer um **fork** do repositório, criar sua **branch** e enviar um **pull request**.

---
