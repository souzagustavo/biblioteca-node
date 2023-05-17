import livros from "../models/Livro.js"

class LivroController{

    static listarLivros = async (req, res) => {
        try{
            let todosLivros = await livros.find();
            res.status(200).json(todosLivros)
        }
        catch(err){
            res.status(500).send({message : `${err.message} - erro do obter livros.`});
        }
    }

    static obterLivroPorId = async (req, res) => {
        try{
            let id = req.params.id;

            let livro = await livros.findById(id);

            if (livro == null)
                res.status(404).send({message : 'Livro não encontrado'});
            else
                res.status(200).json(livro);
        }
        catch(err){
            res.status(400).send({message : `${err.message} - erro ao obter o livro.`});
        }
    }

    static cadastrarLivro = async (req, res) => {
        try{
            const livro = new livros(req.body);

            await livro.save(livro);

            res.status(201).json(livro)
        }
        catch(err){
            res.status(500).send({message : `${err.message} - erro do cadastrar livro.`});
        }
    }

    static atualizarLivro = async (req, res) => {
        try{
            let id = req.params.id;

            let livroAtualizado = await livros.findByIdAndUpdate(id, { $set : req.body });

            if (livroAtualizado == null)
                res.status(404).send({message : 'Livro não encontrado'});
            else
                res.status(200).json(livroAtualizado);
        }
        catch(err){
            res.status(500).send({message : `${err.message} - erro do atualizar livro.`});
        }
    }

    static excluirLivro = async (req, res) => {
        try{
            let id = req.params.id;

            let livroRemovido = await livros.findByIdAndDelete(id);

            if (livroRemovido == null)
                res.status(404).send({message : 'Livro não encontrado'});
            else
                res.status(200).send({message: 'Livro deletado com sucesso'});
        }
        catch(err){
            res.status(500).send({message : `${err.message} - erro do deletar livro.`});
        }
    }

}

export default LivroController;