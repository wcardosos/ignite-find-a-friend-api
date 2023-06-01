# Find a friend API

## Requisitos funcionais
- [ ] Deve ser possível cadastrar uma ORG;
- [ ] Deve ser possível se autenticar em uma ORG;
- [ ] Deve ser possível cadastrar um pet (com sexo);
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [ ] Deve ser possível filtrar pets por suas características;
- [ ] Deve ser possível visualizar detalhes de um pet para adoção;
- [ ] Deve ser possível cadastrar requisitos de adoção em um pet;

## Regras de negócio
- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [ ] Um pet deve estar ligado a uma ORG;
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [ ] Todos os filtros, além da cidade, são opcionais;
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;
- [ ] Apenas uma ORG pode cadastrar um pet;

## Requisitos não-funcionais
- [ ] A senha dos usuários devem estar criptografadas;
- [ ] As listas de dados precisam ser paginadas com no máximo 50 itens por página;
- [ ] Será utilizado o banco de dados PostgreSQL;
- [ ] O usuário deverá ser identificado por um JWT;