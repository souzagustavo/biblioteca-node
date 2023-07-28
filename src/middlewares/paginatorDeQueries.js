import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    let { sort = "_id:-1" } = req.query;    
    let { size = 5, page = 1 } = req.headers;

    let [orderByField, orderType] = sort.split(":");

    size = parseInt(size);
    page = parseInt(page);
    orderType = parseInt(orderType);

    const resultado = req.resultado;

    if (size > 0 && page > 0) {
      const resultadoPaginado = await resultado.find()
        .sort({ [orderByField]: orderType })
        .skip((page - 1) * size)
        .limit(size);

      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (erro) {
    next(erro);
  }
}

export default paginar;