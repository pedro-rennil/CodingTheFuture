# 🤖 Staf.ai

Uma aplicação Full Stack que lê arquivos PDF de escopo de projeto e gera automaticamente um backlog de tarefas no JIRA.

## 🚀 Tecnologias Utilizadas

* **Frontend:** Angular 18+ (com Angular Material)
* **Backend:** Node.js & Express
* **Bibliotecas:** Multer (Upload), PDF-Parse (Leitura de arquivos)

---

## 📋 Pré-requisitos

Para rodar este projeto, você precisa ter instalado no seu computador:

1.  **Node.js** (Versão LTS)
    * [Baixar aqui](https://nodejs.org/)
2.  **Angular CLI**
    * Após instalar o Node, abra o terminal e rode:
        ```bash
        npm install -g @angular/cli
        ```

---

## ▶️ Como Rodar o Projeto

Você precisará de **dois terminais** abertos simultaneamente (um para o servidor e outro para o site).

### 1. Rodando o Backend (Servidor)

No primeiro terminal, entre na pasta do servidor, instale as dependências e inicie:

```bash
cd backend
npm install
node server.js
```

### 2. Rodando o Frontend (Interface)
No segundo terminal, entre na pasta da interface, instale as dependências e inicie:

'''bash
cd frontend
npm install
ng serve
```

✅ Aguarde a compilação. O terminal exibirá: "Listening on http://localhost:4200/"

### 🎮 Como Utilizar a Aplicação
Abra seu navegador e acesse o endereço: http://localhost:4200

Na tela inicial, clique no botão "Escolher Arquivo PDF".

Selecione o arquivo PDF que contém o escopo do projeto.

Clique no botão "GERAR BACKLOG NO JIRA".

Aguarde a barra de carregamento finalizar.

Acesse seu quadro no JIRA para visualizar as tarefas criadas automaticamente.
