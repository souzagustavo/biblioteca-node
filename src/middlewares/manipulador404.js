import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";

/* eslint-disable no-unused-vars */
export default function (req, res, next) {
  next(new ErroNaoEncontrado());
}