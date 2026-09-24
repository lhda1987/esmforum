const estrategiaBuscaTexto = {
  corresponde(pergunta, termo) {
    const texto = String(pergunta.texto || '').toLowerCase();
    const termoNormalizado = String(termo || '').toLowerCase();

    return texto.includes(termoNormalizado);
  }
};

module.exports = { estrategiaBuscaTexto };