import ErroBase from "./ErroBase.js";

class ErroNaoEncontrado extends ErroBase {
  constructor(message = "Erro não encontrado"){
    super(message, 404);
  }    
}
  
export default ErroNaoEncontrado;