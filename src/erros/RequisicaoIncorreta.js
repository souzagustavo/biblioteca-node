import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(message = "Um ou mais parametros inválidos"){
    super(message, 400);
  }    
}
  
export default RequisicaoIncorreta;