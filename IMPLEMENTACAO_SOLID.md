# Implementação com SOLID

## Funcionalidade implementada

A funcionalidade escolhida foi a **busca de perguntas por palavra-chave**.

A implementação permite que o usuário informe um termo no frontend e visualize apenas as perguntas cujo texto contém a palavra pesquisada.

A funcionalidade foi implementada no backend e integrada ao frontend React.

## Estrutura criada

Para evitar concentração de responsabilidades em um único arquivo, a implementação foi dividida em módulos:

```text
repositories/
  perguntaRepository.js

services/
  buscaPerguntasService.js
  estrategiaBuscaTexto.js

routes/
  buscaPerguntas.js
```

Além disso, o `server.js` foi atualizado para realizar a composição dessas dependências e registrar a nova rota.

---

# Aplicação dos Princípios SOLID

## 1. Single Responsibility Principle - SRP

O princípio SRP determina que cada módulo deve ter uma responsabilidade bem definida.

Na implementação da busca, cada parte do sistema ficou responsável por uma função específica.

### Repository

O arquivo `perguntaRepository.js` ficou responsável apenas pelo acesso aos dados das perguntas:

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

module.exports = { criarPerguntaRepository };
```

Esse módulo não conhece regras de busca nem tratamento de requisições HTTP.

### Service

O arquivo `buscaPerguntasService.js` ficou responsável apenas pela regra de negócio da busca:

```javascript
function criarBuscaPerguntasService(perguntaRepository, estrategiaBusca) {
  return {
    buscar(termo) {
      const perguntas = perguntaRepository.listar();
      const termoNormalizado = String(termo || '').trim();

      if (!termoNormalizado) {
        return perguntas;
      }

      return perguntas.filter(pergunta =>
        estrategiaBusca.corresponde(pergunta, termoNormalizado)
      );
    }
  };
}

module.exports = { criarBuscaPerguntasService };
```

Esse módulo não acessa diretamente o banco de dados e também não trata requisições HTTP.

### Route

O arquivo `buscaPerguntas.js` ficou responsável pela comunicação HTTP:

```javascript
function criarBuscaPerguntasRouter(express, buscaPerguntasService) {
  const router = express.Router();

  router.get('/', (req, res) => {
    try {
      const termo = req.query.termo;
      const perguntas = buscaPerguntasService.buscar(termo);

      res.json(perguntas);
    }
    catch (erro) {
      res.status(500).json(erro.message);
    }
  });

  return router;
}

module.exports = { criarBuscaPerguntasRouter };
```

A rota recebe o termo enviado pelo usuário, chama o serviço e devolve a resposta em JSON.

Essa separação reduz o acoplamento e facilita manutenção, testes e futuras alterações.

---

## 2. Dependency Inversion Principle - DIP

O princípio DIP recomenda que módulos de alto nível não dependam diretamente de implementações concretas.

Na implementação da busca, o serviço não cria diretamente o repository nem acessa o banco.

Ele recebe essas dependências externamente:

```javascript
function criarBuscaPerguntasService(perguntaRepository, estrategiaBusca) {
```

O repository também recebe a dependência do banco de dados:

```javascript
function criarPerguntaRepository(bd) {
```

A composição das dependências é realizada no `server.js`:

```javascript
const perguntaRepository = criarPerguntaRepository(bd);

const buscaPerguntasService = criarBuscaPerguntasService(
  perguntaRepository,
  estrategiaBuscaTexto
);
```

Dessa forma, o serviço depende do comportamento esperado das dependências e não de uma implementação criada internamente.

Isso facilita, por exemplo, a substituição do banco real por uma implementação simulada durante testes.

---

## 3. Open/Closed Principle - OCP

O princípio OCP estabelece que o código deve estar aberto para extensão, mas fechado para modificação.

Para isso, a lógica que define como uma pergunta corresponde ao termo pesquisado foi separada em uma estratégia:

```javascript
const estrategiaBuscaTexto = {
  corresponde(pergunta, termo) {
    const texto = String(pergunta.texto || '').toLowerCase();
    const termoNormalizado = String(termo || '').toLowerCase();

    return texto.includes(termoNormalizado);
  }
};

module.exports = { estrategiaBuscaTexto };
```

O serviço de busca não conhece os detalhes dessa comparação.

Ele apenas executa:

```javascript
return perguntas.filter(pergunta =>
  estrategiaBusca.corresponde(pergunta, termoNormalizado)
);
```

Com essa estrutura, seria possível criar futuramente novas estratégias, por exemplo:

- busca por categoria;
- busca por relevância;
- busca por múltiplas palavras;
- busca que ignore acentuação.

Essas novas estratégias poderiam ser criadas sem alterar a lógica principal do serviço de busca.

---

# Integração com o Frontend

O frontend React foi atualizado para incluir um campo de busca.

Quando o usuário informa uma palavra e seleciona a opção de buscar, o frontend realiza uma requisição para:

```text
GET /perguntas/busca?termo=palavra
```

O backend processa a busca e retorna apenas as perguntas relacionadas ao termo informado.

Quando o campo de busca é limpo, a lista completa de perguntas volta a ser exibida.

---

# Resultado

A funcionalidade foi testada utilizando termos existentes e inexistentes.

Exemplo:

```text
/perguntas/busca?termo=3
```

retorna as perguntas que possuem o termo pesquisado.

Já uma busca por um termo inexistente, como:

```text
/perguntas/busca?termo=banana
```

retorna uma lista vazia:

```json
[]
```

A implementação permitiu adicionar a nova funcionalidade mantendo responsabilidades separadas e aplicando os princípios SRP, DIP e OCP de forma explícita.