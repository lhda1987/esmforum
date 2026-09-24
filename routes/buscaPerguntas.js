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