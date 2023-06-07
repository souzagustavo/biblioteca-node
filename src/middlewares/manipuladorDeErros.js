import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
export default function (erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError){
    new RequisicaoIncorreta().enviarResposta(res);
  }
  else if (erro instanceof mongoose.Error.ValidationError){
    new ErroValidacao(erro).enviarResposta(res);
  }
  else if (erro instanceof ErroNaoEncontrado){
    erro.enviarResposta(res);
  }
  else{
    new ErroBase().enviarResposta(res);
  }

}