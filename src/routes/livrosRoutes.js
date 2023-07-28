import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginatorDeQueries.js";

const router = express.Router();

router    
  .get("/livros", LivroController.listarLivros, paginar)
  .get("/livros/:id", LivroController.obterLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro);

export default router;
