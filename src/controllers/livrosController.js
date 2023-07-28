import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import { autores, livros } from "../models/index.js";
import creatorQueries from "../utils/mongoDBQueries.js";

const messagemNaoEncontrado = "Livro não encontrado";

class LivroController{

  static listarLivros = async (req, res, next) => {
    try{      

      const criteria = await createCriteria(req);

      const todosLivros = livros.find(criteria);
      
      req.resultado = todosLivros;

      next();
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

async function createCriteria(req) {
  
  let criteria = creatorQueries.creteFromQueryParam(
    req.query, true, ["titulo","editora"]);

  let { minPaginas, maxPaginas, nomeAutor } = req.query;

  if (minPaginas)
    criteria.numeroPaginas = { $gte : minPaginas };
  
  if (maxPaginas)
    criteria.numeroPaginas = { $lte : maxPaginas };

  if (nomeAutor) {
    const autor = await autores.findOne({ nome : nomeAutor });
   
    if (autor !== null)
      criteria.autor = autor._id;
    else
      criteria.autor = null;
  }

  return criteria;
}

export default LivroController;