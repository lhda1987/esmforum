# Caso de Uso: Votar em Pergunta

## Atores

Usuário do fórum.

## Pré-condições

- A pergunta deve existir no sistema.
- O usuário deve estar identificado pelo sistema.
- A pergunta deve estar disponível para votação.

## Fluxo Principal

1. O sistema exibe a lista de perguntas.
2. O sistema apresenta, em cada pergunta, as opções de upvote e downvote.
3. O usuário escolhe uma das opções de voto.
4. O sistema identifica o usuário e a pergunta selecionada.
5. O sistema verifica se já existe voto desse usuário para a pergunta.
6. Caso não exista voto anterior, o sistema registra o novo voto.
7. O sistema recalcula o total de votos da pergunta.
8. O sistema atualiza o valor exibido na interface.

## Fluxo Alternativo 1: Usuário altera o voto

5a. O sistema identifica que o usuário já possui um voto registrado para a pergunta.

5b. O sistema verifica que o novo voto é diferente do voto anterior.

5c. O sistema substitui o voto anterior pelo novo voto.

5d. O fluxo retorna ao passo 7 do fluxo principal.

## Fluxo Alternativo 2: Usuário seleciona novamente o mesmo voto

5a. O sistema identifica que o usuário já possui o mesmo voto registrado.

5b. O sistema não cria um novo registro de voto.

5c. O total de votos permanece inalterado.

## Pós-condições

- O voto válido do usuário fica registrado no sistema.
- A pergunta apresenta o total de votos atualizado.
- O usuário mantém apenas um voto ativo por pergunta.