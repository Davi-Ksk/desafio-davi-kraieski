import { cardapio } from "./cardapio.js";
class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {

    if (itens === undefined){
        console.log("Não há itens no carrinho de compra!");
        return;
    }

    const itensPedido = itens.map(item => {
    const [codigoItem, quantidadeItemStr] = item.split(', ');
    const quantidadeItem = parseInt(quantidadeItemStr);

    if (quantidadeItem <= 0) {
        console.log(`Quantidade inválida!`);
    }

    return { codigoItem, quantidadeItem };
    });

    const itensPedidoStr = JSON.stringify(itensPedido);

    function calculaValorTotal() {
        let valorPedido = 0;

        for (const valor in pedido) {
            valorPedido = valorPedido + pedido[valor].valor * itensPedido[valor].quantidadeItem;
        }

        switch (metodoDePagamento) {
            case "dinheiro":
                valorPedido = valorPedido - (valorPedido * 0.05);
            break;
            case "credito" || "debito":
                valorPedido = valorPedido + (valorPedido * 0.03);
            break;
            default:
                console.log("Forma de pagamento inválida!");
            break;
        }
        
        let valorPedidoReal = valorPedido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

        return valorPedidoReal;
    }

    const pedido = [];

    for (const itemPedido in itensPedido) {

        const itemProcurado = cardapio.find((item) => item.codigo === itensPedido[itemPedido].codigoItem);

        if (itemProcurado === undefined) {
            console.log(`Item inválido!`);
            return;
        } else {

            if (itemProcurado.adicional) {
                if (!itensPedidoStr.includes(itemProcurado.adicional)) {
                     console.log("Item extra não pode ser pedido sem o principal.");
                     return;
                }  
            }

        }


        pedido.push(itemProcurado);
    }

    console.log(calculaValorTotal());

        return "";
    }

}
export { CaixaDaLanchonete };
