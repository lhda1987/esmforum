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