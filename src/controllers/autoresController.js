import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import { autores } from "../models/index.js";
import creatorQueries from "../utils/mongoDBQueries.js";

const messagemNaoEncontrado = "Autor não encontrado";

class AutorController{  

  static listarAutores = async (req, res, next) => {
    try{
      
      let criteria = creatorQueries.creteFromQueryParam(
        req.query, true, ["nome","nacionalidade"]);

      let todosAutores = await autores.find(criteria);

      res.status(200).json(todosAutores);
    }
    catch(erro){
      next(erro);
    }
  };

  static obterAutorPorId = async (req, res, next) => {
    try{
      let id = req.params.id;

      let autor = await autores.findById(id);

      if (autor == null)
        next(new ErroNaoEncontrado(messagemNaoEncontrado));
      else
        res.status(200).json(autor);
    }
    catch(erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try{
      const autor = new autores(req.body);

      await autor.save(autor);

      res.status(201).json(autor);
    }
    catch(erro){
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try{
      let id = req.params.id;

      let autorAtualizado = await autores.findByIdAndUpdate(id, { $set : req.body });

      if (autorAtualizado == null)
        next(new ErroNaoEncontrado(messagemNaoEncontrado));
      else
        res.status(204).send();
    }
    catch(erro){
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try{
      let id = req.params.id;

      let autorRemovido = await autores.findByIdAndDelete(id);

      if (autorRemovido == null)
        next(new ErroNaoEncontrado(messagemNaoEncontrado));
      else
        res.status(204).send();
    }
    catch(erro){
      next(erro);
    }
  };
}

export default AutorController;