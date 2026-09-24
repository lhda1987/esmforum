# Padrões de Projeto Existentes

## Introdução

O ESM Forum possui uma estrutura relativamente simples, mas alguns padrões de projeto podem ser identificados no código atual, especialmente após a implementação da funcionalidade de busca por palavra-chave.

Os padrões abaixo aparecem de forma completa ou parcial e ajudam a reduzir acoplamento e organizar melhor as responsabilidades do sistema.

# 1. Strategy

## Onde está aplicado

O padrão Strategy aparece na funcionalidade de busca, principalmente nos arquivos:

```text
services/estrategiaBuscaTexto.js
services/buscaPerguntasService.js
```

A estratégia responsável por decidir se uma pergunta corresponde ao termo pesquisado foi isolada:

```javascript
const estrategiaBuscaTexto = {
  corresponde(pergunta, termo) {
    const texto = String(pergunta.texto || '').toLowerCase();
    const termoNormalizado = String(termo || '').toLowerCase();

    return texto.includes(termoNormalizado);
  }
};
```

O serviço de busca utiliza essa estratégia sem conhecer os detalhes de sua implementação:

```javascript
return perguntas.filter(pergunta =>
  estrategiaBusca.corresponde(pergunta, termoNormalizado)
);
```

## Avaliação

A implementação representa o padrão Strategy de forma simples.

A principal vantagem é permitir que outras formas de busca sejam criadas futuramente, como busca por categoria, relevância ou múltiplas palavras, sem alterar a lógica principal do serviço.

O padrão poderia ser ampliado com novas estratégias e algum mecanismo para selecionar qual estratégia utilizar.

---

# 2. Repository

## Onde está aplicado

O padrão Repository pode ser identificado no arquivo:

```text
repositories/perguntaRepository.js
```

Esse módulo concentra o acesso aos dados relacionados às perguntas:

```javascript
function criarPerguntaRepository(bd) {
  return {
    listar() {
      return bd.queryAll(`
        SELECT
          p.*,
          (
            SELECT COUNT(*)
            FROM respostas r
            WHERE r.id_pergunta = p.id_pergunta
          ) AS num_respostas
        FROM perguntas p
      `, []);
    }
  };
}
```

O serviço de busca não executa diretamente consultas SQL. Ele solicita as informações ao repository:

```javascript
const perguntas = perguntaRepository.listar();
```

## Avaliação

A implementação é parcial, pois apenas a funcionalidade de busca utiliza atualmente um repository próprio.

Outras operações do sistema ainda permanecem concentradas no arquivo `modelo.js`.

Uma melhoria seria criar repositories também para operações de cadastro de perguntas, respostas e demais entidades do sistema.

---

# 3. Factory Function

## Onde está aplicado

A criação de alguns componentes utiliza funções responsáveis por construir e devolver objetos configurados.

Exemplos:

```javascript
function criarPerguntaRepository(bd) {
```

```javascript
function criarBuscaPerguntasService(perguntaRepository, estrategiaBusca) {
```

```javascript
function criarBuscaPerguntasRouter(express, buscaPerguntasService) {
```

Essas funções recebem as dependências necessárias e devolvem o componente pronto para uso.

No `server.js`, os objetos são criados da seguinte forma:

```javascript
const perguntaRepository = criarPerguntaRepository(bd);

const buscaPerguntasService = criarBuscaPerguntasService(
  perguntaRepository,
  estrategiaBuscaTexto
);

const buscaPerguntasRouter = criarBuscaPerguntasRouter(
  express,
  buscaPerguntasService
);
```

## Avaliação

Essa abordagem possui características semelhantes ao padrão Factory, pois concentra a criação e configuração dos objetos em funções específicas.

A implementação ainda é simples e não existe uma fábrica central responsável pela criação de diferentes tipos de componentes.

Caso o sistema cresça, essa organização poderia ser ampliada para reduzir ainda mais a responsabilidade do `server.js` na composição das dependências.

---

# Conclusão

Os principais padrões identificados no código são:

- Strategy, utilizado na lógica de busca;
- Repository, utilizado no acesso aos dados das perguntas;
- Factory Function, utilizado na criação e configuração dos componentes.

O projeto ainda possui uma estrutura pequena, portanto alguns desses padrões aparecem de maneira simplificada ou parcial.

Mesmo assim, eles já contribuem para separar responsabilidades, reduzir dependências diretas e facilitar futuras extensões do sistema.