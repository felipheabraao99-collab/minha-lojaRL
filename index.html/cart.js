// =========================
// CARRINHO
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// PEGAR CARRINHO ATUAL
// =========================

function getCart() {

    return JSON.parse(localStorage.getItem("cart")) || [];

}


// =========================
// ATUALIZAR CONTADORES
// =========================

function atualizarContadoresCarrinho() {

    const carrinhoAtual = getCart();

    let quantidade = 0;

    carrinhoAtual.forEach(item => {

        quantidade += Number(item.qtd) || 1;

    });


    // =========================
    // CONTADOR PRINCIPAL
    // =========================

    const totalItens =
        document.getElementById("total-itens");

    if (totalItens) {

        totalItens.textContent = quantidade;

    }


    // =========================
    // OUTROS POSSÍVEIS CONTADORES
    // =========================

    const outrosContadores = document.querySelectorAll(
        "#cart-count, " +
        ".cart-count, " +
        ".cart-badge, " +
        ".cart-quantity, " +
        ".cart-counter"
    );


    outrosContadores.forEach(elemento => {

        elemento.textContent = quantidade;

    });


    // =========================
    // ESCONDER CONTADOR QUANDO 0
    // =========================

    const todosContadores = document.querySelectorAll(
        "#total-itens, " +
        "#cart-count, " +
        ".cart-count, " +
        ".cart-badge, " +
        ".cart-quantity, " +
        ".cart-counter"
    );


    todosContadores.forEach(elemento => {

        if (quantidade === 0) {

            elemento.textContent = "0";

            // Caso seu CSS use display
            elemento.style.display = "none";

        } else {

            elemento.textContent = quantidade;

            elemento.style.display = "";

        }

    });

}


// =========================
// DOM CARREGADO
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const itemsDiv =
        document.getElementById("cart-items");

    const totalSpan =
        document.getElementById("cart-total");

    const totalItensSpan =
        document.getElementById("total-itens");

    const inputValor =
        document.getElementById("valor");

    const inputProdutos =
        document.getElementById("produtos");

    const formPedido =
        document.querySelector("form");


    // =========================
    // RENDERIZAR CARRINHO
    // =========================

    window.renderCart = function () {

        // Sempre pega o carrinho atualizado
        cart = getCart();


        let total = 0;

        let totalQtd = 0;


        // =========================
        // CALCULAR TOTAL
        // =========================

        cart.forEach(item => {

            const preco =
                typeof item.price === "string"
                    ? Number(
                        item.price.replace(",", ".")
                    )
                    : Number(item.price) || 0;


            const qtd =
                Number(item.qtd) || 1;


            total += preco * qtd;

            totalQtd += qtd;

        });


        // =========================
        // ATUALIZAR QUANTIDADE
        // =========================

        if (totalItensSpan) {

            totalItensSpan.textContent =
                totalQtd;

        }


        // =========================
        // ATUALIZAR TOTAL
        // =========================

        if (totalSpan) {

            totalSpan.textContent =
                total.toFixed(2).replace(".", ",");

        }


        // =========================
        // ATUALIZAR CAMPO VALOR
        // =========================

        if (inputValor) {

            inputValor.value =
                total.toFixed(2);

        }


        // =========================
        // ATUALIZAR CAMPO PRODUTOS
        // =========================

        if (inputProdutos) {

            inputProdutos.value =
                cart
                    .map(item => {

                        const cor =
                            item.color &&
                            typeof item.color === "string" &&
                            item.color.trim()
                                ? ` - Cor: ${item.color.trim()}`
                                : "";


                        return (
                            `${item.name || "Produto"}` +
                            `${cor}` +
                            ` (Qtd: ${item.qtd || 1})`
                        );

                    })
                    .join(", ");

        }


        // =========================
        // ATUALIZAR CONTADOR
        // =========================

        atualizarContadoresCarrinho();


        // =========================
        // SE NÃO EXISTIR A LISTA
        // =========================

        if (!itemsDiv) {

            return;

        }


        // =========================
        // LIMPAR LISTA
        // =========================

        itemsDiv.innerHTML = "";


        // =========================
        // CARRINHO VAZIO
        // =========================

        if (cart.length === 0) {

            itemsDiv.innerHTML = `
                <p style="
                    text-align:center;
                    color:#777;
                    padding:20px;
                ">
                    Seu carrinho está vazio.
                </p>
            `;

            return;

        }


        // =========================
        // PRODUTOS
        // =========================

        cart.forEach((item, index) => {

            const preco =
                typeof item.price === "string"
                    ? Number(
                        item.price.replace(",", ".")
                    )
                    : Number(item.price) || 0;


            const qtd =
                Number(item.qtd) || 1;


            const subtotal =
                preco * qtd;


            // =========================
            // COR
            // =========================

            const cor =
                item.color &&
                typeof item.color === "string" &&
                item.color.trim()
                    ? item.color.trim()
                    : "";


            // =========================
            // PRODUTO
            // =========================

            itemsDiv.innerHTML += `

                <div
                    class="cart-item"
                    style="
                        display:flex;
                        align-items:center;
                        gap:15px;
                        margin-bottom:15px;
                        border-bottom:1px solid #eee;
                        padding-bottom:10px;
                    "
                >

                    <img
                        src="${item.img || ""}"
                        width="60"
                        height="60"
                        style="
                            border-radius:5px;
                            object-fit:cover;
                        "
                        onerror="
                            this.style.display='none';
                        "
                    >


                    <div style="flex:1">


                        <strong style="color:#333;">
                            ${item.name || "Produto"}
                        </strong>


                        ${
                            cor
                                ? `
                                    <br>

                                    <span
                                        style="
                                            color:#777;
                                            font-size:14px;
                                        "
                                    >
                                        Cor: ${cor}
                                    </span>
                                `
                                : ""
                        }


                        <br>


                        <span
                            style="
                                color:#666;
                                font-size:14px;
                            "
                        >
                            Qtd: ${qtd}
                        </span>


                        <br>


                        <strong
                            style="
                                color:#27ae60;
                            "
                        >
                            R$
                            ${subtotal
                                .toFixed(2)
                                .replace(".", ",")
                            }
                        </strong>


                    </div>


                    <button
                        type="button"
                        onclick="removeItem(${index})"
                        class="btn-remove"
                        style="
                            background:none;
                            border:none;
                            cursor:pointer;
                            font-size:18px;
                        "
                    >
                        ❌
                    </button>

                </div>

            `;

        });

    };


    // =========================
    // ENVIO DO PEDIDO
    // =========================

    if (formPedido) {

        formPedido.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                // Pega o carrinho atualizado
                cart = getCart();


                // =========================
                // CARRINHO VAZIO
                // =========================

                if (cart.length === 0) {

                    alert(
                        "Seu carrinho está vazio!"
                    );

                    return;

                }


                // =========================
                // NOME
                // =========================

                const nomeElemento =
                    document.getElementById("nome");


                const nomeCliente =
                    nomeElemento
                        ? nomeElemento.value.trim()
                        : "Não informado";


                // =========================
                // ENDEREÇO
                // =========================

                let enderecoCliente = "";


                const camposEndereco = [
                    "endereco",
                    "address",
                    "rua",
                    "logradouro",
                    "endereco-entrega",
                    "enderecoEntrega"
                ];


                for (
                    const id of camposEndereco
                ) {

                    const campo =
                        document.getElementById(id);


                    if (
                        campo &&
                        campo.value &&
                        campo.value.trim()
                    ) {

                        enderecoCliente =
                            campo.value.trim();

                        break;

                    }

                }


                // =========================
                // ENDEREÇO PELO NAME
                // =========================

                if (!enderecoCliente) {

                    const campoEndereco =
                        formPedido.querySelector(
                            '[name="endereco"], ' +
                            '[name="address"], ' +
                            '[name="rua"], ' +
                            '[name="logradouro"]'
                        );


                    if (
                        campoEndereco &&
                        campoEndereco.value
                    ) {

                        enderecoCliente =
                            campoEndereco.value.trim();

                    }

                }


                // =========================
                // PAGAMENTO
                // =========================

                const pagamentoElemento =
                    document.getElementById(
                        "pagamento"
                    );


                const formaPagamento =
                    pagamentoElemento
                        ? pagamentoElemento.value.trim()
                        : "";


                const pagamentoLower =
                    formaPagamento.toLowerCase();


                // =========================
                // CARTÃO BLOQUEADO
                // =========================

                if (
                    pagamentoLower.includes("cart")
                ) {

                    alert(
                        "Pagamento com cartão não está disponível. Escolha Pix ou Dinheiro."
                    );

                    return;

                }


                // =========================
                // PAGAMENTO OBRIGATÓRIO
                // =========================

                if (
                    !pagamentoLower.includes("pix") &&
                    !pagamentoLower.includes("dinheiro")
                ) {

                    alert(
                        "Escolha uma forma de pagamento: Pix ou Dinheiro."
                    );

                    return;

                }


                // =========================
                // MENSAGEM
                // =========================

                let mensagem =
                    `*NOVO PEDIDO - A.F RELÓGIOS IMPORTS*\n\n`;


                // =========================
                // CLIENTE
                // =========================

                mensagem +=
                    `*Cliente:* ${
                        nomeCliente ||
                        "Não informado"
                    }\n`;


                // =========================
                // ENDEREÇO
                // =========================

                mensagem +=
                    `*Endereço:* ${
                        enderecoCliente ||
                        "Não informado"
                    }\n`;


                // =========================
                // PAGAMENTO
                // =========================

                mensagem +=
                    `*Pagamento:* ${
                        formaPagamento
                    }\n\n`;


                // =========================
                // PRODUTOS
                // =========================

                mensagem +=
                    `*PRODUTOS ESCOLHIDOS:*\n\n`;


                cart.forEach(item => {

                    const preco =
                        typeof item.price === "string"
                            ? Number(
                                item.price.replace(
                                    ",",
                                    "."
                                )
                            )
                            : Number(item.price) || 0;


                    const qtd =
                        Number(item.qtd) || 1;


                    const subtotal =
                        preco * qtd;


                    // =========================
                    // COR
                    // =========================

                    const cor =
                        item.color &&
                        typeof item.color === "string" &&
                        item.color.trim()
                            ? item.color.trim()
                            : "Não informada";


                    mensagem +=
                        `• *${
                            item.name ||
                            "Produto"
                        }*\n`;


                    mensagem +=
                        `  Cor: ${cor}\n`;


                    mensagem +=
                        `  Qtd: ${qtd}\n`;


                    mensagem +=
                        `  Valor: R$ ${
                            subtotal
                                .toFixed(2)
                                .replace(
                                    ".",
                                    ","
                                )
                        }\n\n`;

                });


                // =========================
                // TOTAL
                // =========================

                const totalCalculado =
                    cart.reduce(
                        (
                            soma,
                            item
                        ) => {

                            const preco =
                                typeof item.price === "string"
                                    ? Number(
                                        item.price.replace(
                                            ",",
                                            "."
                                        )
                                    )
                                    : Number(
                                        item.price
                                    ) || 0;


                            const qtd =
                                Number(
                                    item.qtd
                                ) || 1;


                            return soma +
                                (
                                    preco *
                                    qtd
                                );

                        },
                        0
                    );


                const totalFinal =
                    totalCalculado
                        .toFixed(2)
                        .replace(
                            ".",
                            ","
                        );


                mensagem +=
                    `*VALOR TOTAL: R$ ${totalFinal}*\n`;


                // =========================
                // PIX
                // =========================

                if (
                    pagamentoLower.includes("pix")
                ) {

                    mensagem +=
                        `\n*Pagamento via Pix.*`;

                }


                // =========================
                // DINHEIRO
                // =========================

                if (
                    pagamentoLower.includes(
                        "dinheiro"
                    )
                ) {

                    mensagem +=
                        `\n*Pagamento em dinheiro.*`;

                }


                // =========================
                // WHATSAPP
                // =========================

                const numeroWhats =
                    "5584994029361";


                const linkWhatsapp =
                    `https://wa.me/${numeroWhats}` +
                    `?text=${encodeURIComponent(
                        mensagem
                    )}`;


                // =========================
                // ABRIR WHATSAPP
                // =========================

                window.open(
                    linkWhatsapp,
                    "_blank"
                );


                // =========================
                // LIMPAR CARRINHO
                // =========================

                cart = [];


                localStorage.removeItem(
                    "cart"
                );


                // =========================
                // ATUALIZAR TUDO
                // =========================

                window.renderCart();


                atualizarContadoresCarrinho();

            }
        );

    }


    // =========================
    // RENDERIZAR AO ABRIR
    // =========================

    window.renderCart();


    atualizarContadoresCarrinho();

});


// =========================
// REMOVER PRODUTO
// =========================

window.removeItem = function (index) {

    // Pega o carrinho mais atual
    cart = getCart();


    // =========================
    // VERIFICAR ÍNDICE
    // =========================

    if (
        index < 0 ||
        index >= cart.length
    ) {

        return;

    }


    // =========================
    // REMOVER PRODUTO
    // =========================

    cart.splice(
        index,
        1
    );


    // =========================
    // SALVAR CARRINHO
    // =========================

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // =========================
    // ATUALIZAR LISTA
    // =========================

    if (
        typeof window.renderCart === "function"
    ) {

        window.renderCart();

    }


    // =========================
    // ATUALIZAR CONTADOR
    // =========================

    atualizarContadoresCarrinho();

};
