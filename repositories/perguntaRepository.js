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