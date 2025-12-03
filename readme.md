# 🤖 staf.ai

Automação Inteligente de Backlog com Integração JIRA

Uma aplicação Full Stack que lê arquivos PDF de escopo de projeto, utiliza Inteligência Artificial para extrair tarefas técnicas e cria automaticamente um backlog no JIRA.

---

## 🚀 Demonstração Online

O projeto está implantado e rodando em produção:

- Frontend (Interface): Acesse na Vercel (Link de exemplo)
- Backend (API): Hospedado no Render

---

## 🛠️ Tecnologias e Ferramentas

A arquitetura foi desenhada priorizando escalabilidade, segurança e separação de responsabilidades.

**Front-end**

- Angular 18+: Framework principal (Standalone Components).
- Angular Material: Design System para componentes visuais (Stepper, Cards, Inputs).
- TypeScript: Lógica de componentes e serviços.
- Vercel: Plataforma de hospedagem e CI/CD do Frontend.

**Back-end**

- Node.js: Ambiente de execução.
- Express: Framework de API REST.
- Multer: Processamento de upload de arquivos.
- PDF-Parse: Extração de texto de arquivos binários.
- Render: Plataforma de hospedagem do Backend (Container).

**Integrações**

- Google Gemini AI: Processamento de linguagem natural.
- JIRA REST API: Criação e autenticação de tarefas.

  ---

📋 Preparando o Ambiente (Pré-Requisitos)

Para rodar este projeto localmente, você precisa ter instalado no seu computador:

1. **Node.js (Versão LTS)**

* O motor que roda o JavaScript.

* 📥 Baixar aqui

2. **Angular CLI**

* Ferramenta de comando do Angular.

* Após instalar o Node, abra o terminal e rode:
```bash
npm install -g @angular/cli
```

3. **Git**

Para clonar o repositório.

⚙️ Configuração e Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

1. Clonar o Repositório

git clone [https://github.com/seu-usuario/staf-ai.git](https://github.com/seu-usuario/staf-ai.git)
cd staf-ai


2. Configurar o Backend (Servidor)

Entre na pasta do servidor e instale as dependências:

cd backend
npm install


Variáveis de Ambiente (.env):
Crie um arquivo chamado .env na raiz da pasta backend e adicione sua chave da IA (opcional se estiver usando Mock, mas recomendado):

PORT=3000
GEMINI_API_KEY=Sua_Chave_Google_Aqui


3. Configurar o Frontend (Interface)

Em um novo terminal, entre na pasta da interface e instale as dependências:

cd frontend
npm install


▶️ Como Rodar o Projeto

Você precisará de dois terminais abertos simultaneamente (um para o servidor e outro para o site).

Terminal 1: Backend

cd backend
node server.js


✅ O terminal exibirá: "Servidor rodando na porta 3000"

Terminal 2: Frontend

cd frontend
ng serve


✅ Aguarde a compilação. O terminal exibirá: "Listening on http://localhost:4200/"

🎮 Como Utilizar a Aplicação

Acesso: Abra seu navegador em http://localhost:4200 (ou no link da Vercel).

Configuração:

Insira o Link do seu quadro JIRA.

Insira seu E-mail.

Insira seu API Token (Gerado na Atlassian).

Dica: Marque "Salvar meus dados" para não digitar novamente.

Upload: Escolha um arquivo PDF contendo o escopo do projeto.

Análise: O sistema lerá o arquivo e sugerirá tarefas.

Revisão: Edite os títulos, descrições ou exclua tarefas indesejadas na tela de revisão.

Confirmação: Clique em "CONFIRMAR ENVIO".

Sucesso: As tarefas aparecerão magicamente no seu quadro do JIRA!

Desenvolvido como MVP para o desafio Coding The Future.
