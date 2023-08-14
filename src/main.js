import { itens } from "./itens.js";
const Pedido = ['suco, 1', 'sanduiche, 2']

const valoresSeparadosPedido = Pedido.map(item => {
  const [codigoItem, quantidadeItemStr] = item.split(', ');
  const quantidadeItem = parseInt(quantidadeItemStr);
  return { codigoItem, quantidadeItem };
});

const pedidoItens = [];

for (const valor in valoresSeparadosPedido) {
    const procuraItem = itens.find((item) => item.codigo === valoresSeparadosPedido[valor].codigoItem);
    pedidoItens.push(procuraItem);
}

let valorPedido = 0;

for (const valor in pedidoItens) {
  // const procuraQuantidade = valoresSeparadosPedido.find((item) => item.codigo === valoresSeparadosPedido[valor].quantidadeItem);
  // console.log(procuraQuantidade);
  valorPedido = valorPedido + pedidoItens[valor].valor * valoresSeparadosPedido[valor].quantidadeItem;
}

console.log(valorPedido);


console.log(pedidoItens);
