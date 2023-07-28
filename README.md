# Biblioteca Node

Web Api Rest desenvolvida em Node.js usando express que contém operações CRUD com MongoDB.

## Funcionalidades

### Autores 
- Cadastro com validação de atributos
- Filtro dinâmico pelos campos titulo e editora com busca de texto parcial, paginação e ordenação
- Atualização completa
- Exclusão

### Livros
- Cadastro com validação de atributos
- Filtro dinâmico pelos campos nome e nacionalidade com busca de texto parcial, paginação e ordenação
- Atualização completa
- Exclusão

## Como executar localmente

Subindo MongoDB
```bash
docker-compose up -d
```
Iniciando web api
```bash
npm run dev
```

Para executar as chamadas REST utilize os scripts do diretório `\requests`

Requer o uso da extensão [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
