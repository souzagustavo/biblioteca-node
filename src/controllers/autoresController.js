import autores from "../models/Autor.js";
import creatorQueries from "../utils/creatorQueries.js";

class AutorController{

  static listarAutores = async (req, res) => {
    try{

      let criteria = creatorQueries.creteForMongoDBFromQueryParam(req.query);

      let todosAutores = await autores.find(criteria);

      res.status(200).json(todosAutores);
    }
    catch(err){
      res.status(500).send({message : `${err.message} - erro do obter Autores.`});
    }
  };

  static obterAutorPorId = async (req, res) => {
    try{
      let id = req.params.id;

      let autor = await autores.findById(id);

      if (autor == null)
        res.status(404).send({message : "Autor não encontrado"});
      else
        res.status(200).json(autor);
    }
    catch(err){
      res.status(400).send({message : `${err.message} - erro ao obter o autor.`});
    }
  };

  static cadastrarAutor = async (req, res) => {
    try{
      const autor = new autores(req.body);

      await autor.save(autor);

      res.status(201).json(autor);
    }
    catch(err){
      res.status(500).send({message : `${err.message} - erro do cadastrar autor.`});
    }
  };

  static atualizarAutor = async (req, res) => {
    try{
      let id = req.params.id;

      let autorAtualizado = await autores.findByIdAndUpdate(id, { $set : req.body });

      if (autorAtualizado == null)
        res.status(404).send({message : "Autor não encontrado"});
      else
        res.status(204).send();
    }
    catch(err){
      res.status(500).send({message : `${err.message} - erro do atualizar autor.`});
    }
  };

  static excluirAutor = async (req, res) => {
    try{
      let id = req.params.id;

      let autorRemovido = await autores.findByIdAndDelete(id);

      if (autorRemovido == null)
        res.status(404).send({message : "Autor não encontrado"});
      else
        res.status(204).send();
    }
    catch(err){
      res.status(500).send({message : `${err.message} - erro do deletar autor.`});
    }
  };

}

export default AutorController;