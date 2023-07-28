import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginatorDeQueries.js";

const router = express.Router();

router
  .get("/autores", AutorController.listarAutores, paginar)
  .get("/autores/:id", AutorController.obterAutorPorId)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluirAutor);

export default router;
