import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id : {type: String},
    titulo : {
      type: String,
      required:
      [true, "O titulo é requerido"]
    },
    autor : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required:
      [true, "O autor(a) é requerido(a)"]},
    editora : {
      type: String,
      required:
      [true, "A editora é requerida"]},
    numeroPaginas: {type: Number},
  }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;