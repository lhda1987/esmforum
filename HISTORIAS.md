# Histórias de Usuário

## História 1: Busca de Perguntas por Palavra-chave

**Como** usuário do fórum,  
**Eu quero** buscar perguntas utilizando palavras-chave,  
**Para** encontrar rapidamente conteúdos relacionados ao assunto que estou procurando.

### Critérios de Aceitação

- [ ] O sistema deve disponibilizar um campo para busca de perguntas
- [ ] A busca deve considerar o texto das perguntas cadastradas
- [ ] O sistema deve exibir apenas perguntas relacionadas ao termo informado
- [ ] Caso nenhuma pergunta seja encontrada, o sistema deve informar que não existem resultados
- [ ] A lista completa deve voltar a ser exibida quando o campo de busca for limpo

---

## História 2: Categorização de Perguntas

**Como** usuário do fórum,  
**Eu quero** associar categorias às perguntas,  
**Para** organizar melhor os assuntos e facilitar a localização de conteúdos relacionados.

### Critérios de Aceitação

- [ ] Cada pergunta deve possuir uma categoria
- [ ] O usuário deve poder selecionar uma categoria ao cadastrar uma nova pergunta
- [ ] A categoria deve ser exibida junto com a pergunta
- [ ] O sistema deve permitir visualizar perguntas de uma categoria específica
- [ ] As categorias disponíveis devem ser previamente definidas pelo sistema

---

## História 3: Sistema de Votação em Perguntas

**Como** usuário do fórum,  
**Eu quero** votar positivamente ou negativamente nas perguntas,  
**Para** indicar quais conteúdos considero mais úteis ou relevantes.

### Critérios de Aceitação

- [ ] Cada pergunta deve exibir opções de upvote e downvote
- [ ] O sistema deve registrar o voto realizado
- [ ] O total de votos deve ser atualizado após a votação
- [ ] Um usuário não deve registrar mais de um voto simultâneo na mesma pergunta
- [ ] O usuário deve poder alterar seu voto entre upvote e downvote

---

# Priorização

As histórias foram priorizadas na seguinte ordem:

1. Busca de Perguntas por Palavra-chave
2. Categorização de Perguntas
3. Sistema de Votação em Perguntas

A busca foi definida como primeira prioridade porque melhora diretamente o acesso às perguntas que já existem no sistema e pode ser implementada sem depender das demais funcionalidades.

A categorização aparece em seguida porque melhora a organização do conteúdo e também pode complementar futuramente o mecanismo de busca e filtragem.

O sistema de votação foi colocado como terceira prioridade porque adiciona uma nova forma de interação entre os usuários e as perguntas, exigindo também o armazenamento e o controle dos votos realizados.