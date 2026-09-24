# Design Simples

## Análise do projeto

A versão atual do ESM Forum possui uma estrutura simples, concentrando as rotas no arquivo `server.js` e as operações relacionadas aos dados no arquivo `modelo.js`.

Embora o enunciado cite os arquivos `routes/perguntas.js` e `routes/respostas.js`, esses arquivos não existem na versão atual do repositório. Por isso, a análise foi realizada sobre os arquivos equivalentes presentes no projeto.

## Aplicação do princípio YAGNI

O princípio YAGNI (You Aren't Gonna Need It) recomenda que funcionalidades, abstrações e estruturas sejam criadas apenas quando forem realmente necessárias.

O projeto atual apresenta alguns exemplos desse princípio.

### Estrutura simples entre rota e modelo

No `server.js`, as rotas chamam diretamente as funções do modelo:

```javascript
app.get('/', (req, res) => {
  try {
    const perguntas = modelo.listar_perguntas();
    res.send(perguntas);
  }
  catch(erro) {
    res.status(500).json(erro.message);
  }
});