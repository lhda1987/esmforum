# Análise SOLID

## Contexto

O enunciado da atividade menciona a análise das pastas `routes/` e `models/`. Na versão atual do repositório utilizado neste trabalho, essas pastas não existem.

A lógica equivalente está concentrada principalmente nos arquivos `server.js`, responsável pelas rotas HTTP, e `modelo.js`, responsável pelas operações relacionadas aos dados da aplicação.

A análise abaixo considera essa estrutura real do projeto.

# Pontos Positivos

## 1. Separação entre rotas e operações do modelo — SRP

O arquivo `server.js` recebe as requisições HTTP e delega as operações relacionadas aos dados para o módulo `modelo.js`.

Exemplo:

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
```

A rota não executa diretamente consultas SQL. Ela solicita ao modelo os dados necessários e fica responsável principalmente pelo tratamento da requisição e da resposta HTTP.

Essa separação aproxima o projeto do **Single Responsibility Principle (SRP)**, pois evita que toda a lógica da aplicação fique concentrada na rota.

## 2. Funções pequenas e específicas no modelo — SRP

No arquivo `modelo.js`, as operações estão divididas em funções específicas:

```javascript
function get_pergunta(id_pergunta) {
  return bd.query(
    'select * from perguntas where id_pergunta = ?',
    [id_pergunta]
  );
}

function get_respostas(id_pergunta) {
  return bd.queryAll(
    'select * from respostas where id_pergunta = ?',
    [id_pergunta]
  );
}
```

Cada função executa uma operação específica, facilitando a leitura, manutenção e teste do código.

Essa organização também está relacionada ao SRP, pois cada função possui uma responsabilidade bem definida.

## 3. Possibilidade de substituir a dependência do banco em testes — DIP

O modelo possui a função:

```javascript
function reconfig_bd(mock_bd) {
  bd = mock_bd;
}
```

Ela permite substituir o módulo de banco de dados por uma implementação simulada durante os testes.

Embora a implementação ainda possa ser melhorada, essa possibilidade reduz o acoplamento durante os testes e se aproxima do **Dependency Inversion Principle (DIP)**, pois o modelo pode trabalhar com outra implementação que ofereça as mesmas operações esperadas.

# Oportunidades de Melhoria

## 1. Dependência direta do módulo de banco — DIP

No início de `modelo.js`, existe uma dependência direta:

```javascript
var bd = require('./bd/bd_utils.js');
```

O módulo de negócio conhece diretamente a implementação utilizada para acesso ao banco.

Isso dificulta a substituição da camada de dados e caracteriza uma oportunidade de melhoria relacionada ao **Dependency Inversion Principle**.

Uma alternativa seria receber a dependência externamente:

```javascript
function criarModelo(bd) {
  return {
    listar_perguntas() {
      return bd.queryAll('select * from perguntas', []);
    }
  };
}
```

Dessa forma, o modelo dependeria apenas das operações esperadas e não precisaria decidir qual implementação concreta de banco utilizar.

## 2. Muitas responsabilidades no `server.js` — SRP

O arquivo `server.js` atualmente realiza várias tarefas:

- cria e configura a aplicação Express;
- configura CORS;
- define as rotas;
- trata requisições;
- inicia o servidor.

Exemplo:

```javascript
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
```

No mesmo arquivo também são declaradas todas as rotas e executado:

```javascript
app.listen(port, 'localhost', () => {
  console.log(`ESM Forum rodando em ${port}`);
});
```

Isso enfraquece o **Single Responsibility Principle**, pois mudanças na configuração, nas rotas ou na inicialização do servidor exigem alterações no mesmo módulo.

Uma melhoria seria separar a estrutura em módulos, por exemplo:

```text
routes/
services/
repositories/
server.js
```

Assim, cada camada teria uma responsabilidade mais específica.

# Conclusão

O ESM Forum apresenta uma estrutura pequena e de fácil entendimento, com alguns aspectos que já favorecem princípios SOLID, principalmente pela separação existente entre o tratamento HTTP e as operações do modelo.

Ao mesmo tempo, existem oportunidades de reduzir o acoplamento com o banco de dados e dividir melhor as responsabilidades atualmente concentradas no `server.js`.

Essas melhorias serão consideradas na implementação da nova funcionalidade, buscando aplicar principalmente SRP, DIP e OCP.