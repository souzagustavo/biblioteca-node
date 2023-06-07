import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import livros from "../models/Livro.js";
import creatorQueries from "../utils/creatorQueries.js";

const messagemNaoEncontrado = "Livro não encontrado";

class LivroController{

  static listarLivros = async (req, res, next) => {
    try{           
      let criteria = creatorQueries.creteForMongoDBFromQueryParam(req.query);

      let todosLivros =
                await livros
                  .find(criteria)
                  .populate("autor", "nome");

      res.status(200).json(todosLivros);
    }
    catch(erro){
      next(erro);
    }
  };

  static obterLivroPorId = async (req, res, next) => {
    try{
      let id = req.params.id;

      let livro =
                await livros
                  .findById(id)
                  .populate("autor", "nome");

      if (livro == null)
        next(new ErroNaoEncontrado(messagemNaoEncontrado));
      else
        res.status(200).json(livro);
    }
    catch(erro){
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try{
      const livro = new livros(req.body);

      await livro.save(livro);

      res.status(201).json(livro);
    }
    catch(erro){
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try{
      let id = req.params.id;

      let livroAtualizado = await livros.findByIdAndUpdate(id, { $set : req.body });

      if (livroAtualizado == null)
        next(new ErroNaoEncontrado(messagemNaoEncontrado));
      else
        res.status(204).send();
    }
    catch(erro){
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try{
      let id = req.params.id;

      let livroRemovido = await livros.findByIdAndDelete(id);

      if (livroRemovido == null)
        next(new ErroNaoEncontrado(messagemNaoEncontrado));
      else
        res.status(204).send();
    }
    catch(erro){
      next(erro);
    }
  };
}

export default LivroController;