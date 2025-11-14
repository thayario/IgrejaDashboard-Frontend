# Igreja Dashboard – Frontend

Aplicação **Angular 18** para gerenciamento de membros da igreja, integração com a API backend, dashboard de totais e CRUD completo.  
Utiliza **Angular Material**, **RxJS** e comunicação via **HttpClient**.

---

## 📦 Dependências e Versões

- Angular: 18.2.0 
- Angular Material: 18.2.14  
- RxJS: ~7.8.0  
- TypeScript: ~5.5.2
- RouterModule: 18.2

> Outras dependências são listadas no `package.json`.

---

## 📂 Estrutura do Projeto
igreja-dashboard/
├── src/
│ ├── app/
│ │ ├── core/
│ │ ├── features/
│ │ │ └── dashboard/
│ │ ├── shared/
│ │ │ └── dialogs/
│ │ ├── models/
│ │ ├── services/
│ │ └── app.module.ts
│ └── index.html
├── angular.json
├── package.json
└── tsconfig.json

## ⚙️ Configuração da API

A URL da API é configurada diretamente no **service** utilizado (`DashboardService`).  
Exemplo:

private apiUrl = 'http://localhost:5136/api/pessoas';

*Ajuste a porta caso seu backend esteja rodando em outra porta.


## Rodando a Aplicação
Pré-requisitos

Angular CLI global instalado:

npm install -g @angular/cli

Passos

Abra o terminal na raiz do projeto frontend igreja-dashboard/.

Instale as dependências:

npm install


Execute a aplicação:

ng serve -o


ou

npm start


O navegador será aberto automaticamente em http://localhost:4200.
