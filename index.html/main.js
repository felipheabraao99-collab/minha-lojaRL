
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // MENU MOBILE
    // =========================

    const mobileBtn =
        document.getElementById("mobile_btn");

    const mobileMenu =
        document.getElementById("mobile_menu");


    if (mobileBtn && mobileMenu) {

        mobileBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            const icon =
                mobileBtn.querySelector("i");


            if (icon) {

                icon.classList.toggle(
                    "fa-bars"
                );

                icon.classList.toggle(
                    "fa-x"
                );

            }

        });

    }


    // =========================
    // NAVBAR - SEÇÃO ATIVA
    // =========================

    const sections =
        document.querySelectorAll("main section");


    function atualizarNav() {

        let secaoAtual = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                secaoAtual =
                    section.id;

            }

        });


        document
            .querySelectorAll(".nav-item")
            .forEach(item => {

                item.classList.remove(
                    "active"
                );


                const link =
                    item.querySelector("a");


                if (
                    link &&
                    link.getAttribute("href") ===
                    `#${secaoAtual}`
                ) {

                    item.classList.add(
                        "active"
                    );

                }

            });

    }


    window.addEventListener(
        "scroll",
        atualizarNav
    );


    atualizarNav();


    // =========================
    // CARRINHO
    // =========================

    const cartCountSpan =
        document.getElementById("cart-count");


    // =========================
    // PEGAR CARRINHO ATUAL
    // =========================

    function getCartAtual() {

        try {

            return JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        } catch (error) {

            console.error(
                "Erro ao carregar carrinho:",
                error
            );

            return [];

        }

    }


    // =========================
    // ATUALIZAR CONTADOR
    // =========================

    function updateCartCount() {

        if (!cartCountSpan) {
            return;
        }


        // SEMPRE pega o carrinho atualizado
        const cartAtual =
            getCartAtual();


        let quantidadeTotal = 0;


        // Soma as quantidades
        cartAtual.forEach(item => {

            const qtd =
                Number(item.qtd) || 1;

            quantidadeTotal += qtd;

        });


        // Atualiza o número
        cartCountSpan.textContent =
            quantidadeTotal;


        // Esconde quando estiver vazio
        if (quantidadeTotal === 0) {

            cartCountSpan.style.display =
                "none";

        } else {

            cartCountSpan.style.display =
                "";

        }

    }


    // =========================
    // PRODUTOS
    // =========================

    document
        .querySelectorAll(".add-cart")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    // Pega o carrinho ATUAL
                    const cart =
                        getCartAtual();


                    const price =
                        parseFloat(
                            (
                                button.dataset.price ||
                                "0"
                            ).replace(",", ".")
                        );


                    const product = {

                        name:
                            button.dataset.name ||
                            "Produto",

                        price:
                            price,

                        img:
                            button.dataset.img ||
                            "",

                        color:
                            button.dataset.color ||
                            "",

                        // IMPORTANTE
                        qtd: 1

                    };


                    // Adiciona produto
                    cart.push(product);


                    // Salva
                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );


                    // Atualiza contador imediatamente
                    updateCartCount();


                    // Avisa outras partes do site
                    window.dispatchEvent(
                        new Event(
                            "cartUpdated"
                        )
                    );


                    // =========================
                    // MENSAGEM
                    // =========================

                    const mensagem =
                        document.createElement(
                            "div"
                        );


                    mensagem.textContent =
                        "✅ Produto adicionado ao carrinho!";


                    mensagem.style.position =
                        "fixed";

                    mensagem.style.top =
                        "20px";

                    mensagem.style.right =
                        "20px";

                    mensagem.style.background =
                        "#222";

                    mensagem.style.color =
                        "#fff";

                    mensagem.style.padding =
                        "14px 20px";

                    mensagem.style.borderRadius =
                        "10px";

                    mensagem.style.fontSize =
                        "14px";

                    mensagem.style.fontWeight =
                        "500";

                    mensagem.style.zIndex =
                        "99999";

                    mensagem.style.boxShadow =
                        "0 4px 15px rgba(0,0,0,0.25)";


                    document.body.appendChild(
                        mensagem
                    );


                    setTimeout(() => {

                        mensagem.remove();

                    }, 2000);

                }
            );

        });


    // =========================
    // ATUALIZAR AO ABRIR
    // =========================

    updateCartCount();


    // =========================
    // RECEBER ALTERAÇÃO DO CARRINHO
    // =========================

    window.addEventListener(
        "cartUpdated",
        () => {

            updateCartCount();

        }
    );


    // =========================
    // ATUALIZA SE MUDAR EM
    // OUTRA ABA
    // =========================

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key === "cart"
            ) {

                updateCartCount();

            }

        }
    );


    // =========================
    // BUSCA DE PRODUTOS
    // =========================

    const searchBtn =
        document.getElementById(
            "search-btn"
        );

    const searchInput =
        document.getElementById(
            "search-input"
        );


    // =========================
    // NORMALIZAR TEXTO
    // =========================

    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();

    }


    // =========================
    // PESQUISAR PRODUTOS
    // =========================

    function pesquisarProdutos() {

        if (!searchInput) {
            return;
        }


        const query =
            normalizarTexto(
                searchInput.value
            );


        // Pesquisa vazia
        if (query === "") {

            document
                .querySelectorAll(".dish")
                .forEach(dish => {

                    dish.style.display =
                        "flex";

                });

            return;

        }


        const palavrasPesquisa =
            query.split(/\s+/);


        document
            .querySelectorAll(".dish")
            .forEach(dish => {

                const button =
                    dish.querySelector(
                        ".add-cart"
                    );


                if (!button) {

                    dish.style.display =
                        "none";

                    return;

                }


                // Nome
                const nome =
                    normalizarTexto(
                        button.dataset.name ||
                        ""
                    );


                // Cor
                const cor =
                    normalizarTexto(
                        button.dataset.color ||
                        ""
                    );


                // Descrição
                const descricaoElemento =
                    dish.querySelector(
                        ".dish-description"
                    );


                const descricao =
                    descricaoElemento
                        ? normalizarTexto(
                            descricaoElemento.textContent
                        )
                        : "";


                // Junta tudo
                const produtoCompleto =
                    `${nome} ${cor} ${descricao}`;


                // Todas as palavras devem existir
                const encontrou =
                    palavrasPesquisa.every(
                        palavra =>
                            produtoCompleto.includes(
                                palavra
                            )
                    );


                if (encontrou) {

                    dish.style.display =
                        "flex";

                } else {

                    dish.style.display =
                        "none";

                }

            });

    }


    // =========================
    // BOTÃO DE PESQUISA
    // =========================

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            pesquisarProdutos
        );

    }


    // =========================
    // DIGITAÇÃO
    // =========================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            pesquisarProdutos
        );


        // Enter
        searchInput.addEventListener(
            "keypress",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    pesquisarProdutos();

                }

            }
        );

    }


    // =========================
    // SLIDER DE IMAGENS
    // =========================

    document
        .querySelectorAll(".dish-slider")
        .forEach(slider => {

            const images =
                slider.querySelectorAll("img");

            const prev =
                slider.querySelector(".prev");

            const next =
                slider.querySelector(".next");

            const indicators =
                slider.querySelector(
                    ".slider-indicators"
                );


            let index = 0;

            let startX = 0;


            // Sem imagens
            if (
                images.length === 0
            ) {

                return;

            }


            // =========================
            // INDICADORES
            // =========================

            if (indicators) {

                indicators.innerHTML = "";


                images.forEach(
                    (_, i) => {

                        const span =
                            document.createElement(
                                "span"
                            );


                        if (i === 0) {

                            span.classList.add(
                                "active"
                            );

                        }


                        indicators.appendChild(
                            span
                        );

                    }
                );

            }


            const dots =
                indicators
                    ? indicators.querySelectorAll(
                        "span"
                    )
                    : [];


            // =========================
            // ATUALIZAR SLIDER
            // =========================

            function updateSlider() {

                images.forEach(
                    (img, i) => {

                        img.classList.toggle(
                            "active",
                            i === index
                        );

                    }
                );


                dots.forEach(
                    (dot, i) => {

                        dot.classList.toggle(
                            "active",
                            i === index
                        );

                    }
                );

            }


            // =========================
            // PRÓXIMO
            // =========================

            if (next) {

                next.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        index =
                            (
                                index + 1
                            ) %
                            images.length;


                        updateSlider();

                    }
                );

            }


            // =========================
            // ANTERIOR
            // =========================

            if (prev) {

                prev.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        index =
                            (
                                index -
                                1 +
                                images.length
                            ) %
                            images.length;


                        updateSlider();

                    }
                );

            }


            // =========================
            // TOUCH START
            // =========================

            slider.addEventListener(
                "touchstart",
                event => {

                    startX =
                        event.touches[0].clientX;

                },
                {
                    passive: true
                }
            );


            // =========================
            // TOUCH END
            // =========================

            slider.addEventListener(
                "touchend",
                event => {

                    const endX =
                        event.changedTouches[0].clientX;


                    const diff =
                        startX - endX;


                    if (
                        Math.abs(diff) < 40
                    ) {

                        return;

                    }


                    // Esquerda
                    if (diff > 0) {

                        index =
                            (
                                index + 1
                            ) %
                            images.length;

                    }

                    // Direita
                    else {

                        index =
                            (
                                index -
                                1 +
                                images.length
                            ) %
                            images.length;

                    }


                    updateSlider();

                }
            );


            // Inicializa
            updateSlider();

        });

});


// =========================
// MODAL DE IMAGEM
// =========================

function abrirModal(img) {

    const modal =
        document.getElementById(
            "imageModal"
        );

    const modalImg =
        document.getElementById(
            "modalImg"
        );


    if (
        !modal ||
        !modalImg
    ) {

        return;

    }


    modal.style.display =
        "flex";


    modalImg.src =
        img.src;

}


// =========================
// FECHAR MODAL
// =========================

function fecharModal() {

    const modal =
        document.getElementById(
            "imageModal"
        );


    if (!modal) {

        return;

    }


    modal.style.display =
        "none";

}
