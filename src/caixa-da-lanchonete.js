import { cardapio } from "./cardapio.js";
class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {

    console.log(itens)

    //Verifica se o carrinho de compra está vazio

    if (itens === undefined || itens.length === 0 || itens === null){

        return("Não há itens no carrinho de compra!");
    }


    //Cria um objeto com os itens do carrinho

    const itensPedido = itens.map(item => {
        const [codigoItem, quantidadeItemStr] = item.split(',');
        const quantidadeItem = parseInt(quantidadeItemStr);
            
        return { codigoItem, quantidadeItem };

    });


    //Passa os itens do pedido para String, 
    //isso serve para verificar se o item principal do item adicional está disponível.
    const itensPedidoStr = JSON.stringify(itensPedido);

    //Calcula o valor total e verifica as formas de pagamento.
    function calculaValorTotal() {
        let valorPedido = 0;

        for (const valor in pedido) {
            valorPedido = valorPedido + pedido[valor].valor * itensPedido[valor].quantidadeItem;
        }

        switch (metodoDePagamento) {
            case "dinheiro":
                valorPedido = valorPedido - (valorPedido * 0.05);
            break;
            case "credito":
                valorPedido = valorPedido + (valorPedido * 0.03);
            break;
            case "debito":
                break;
            default:
                return("Forma de pagamento inválida!");
        }
        
        let valorPedidoReal = valorPedido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

        return valorPedidoReal;
    }

    const pedido = [];


    for (const itemPedido in itensPedido) {

        const itemProcurado = cardapio.find((item) => item.codigo === itensPedido[itemPedido].codigoItem);
        
        if (itensPedido[itemPedido].quantidadeItem <= 0) {

            return("Quantidade inválida!");
        }

        if (itemProcurado === undefined) {
            return("Item inválido!")
        } else {

            //Se houver item adicional, verifica se o item principal do item adicional está disponível.
            if (itemProcurado.adicional) {
                if (!itensPedidoStr.includes(itemProcurado.adicional)) {
                     return("Item extra não pode ser pedido sem o principal.");
                }  
            }

        }

        pedido.push(itemProcurado);
    }
    
        return calculaValorTotal();
    }

}
export { CaixaDaLanchonete };
