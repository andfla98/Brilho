document.addEventListener('DOMContentLoaded', function() {
    const formRoupa = document.getElementById('form-roupa');
    const listaRoupasContainer = document.getElementById('lista-roupas-container');
    const carrinhoIcon = document.querySelector('.carrinho-icon');
    const carrinhoLink = document.getElementById('carrinho-link');
    const modalCarrinho = document.getElementById('modal-carrinho');
    const fecharModal = document.querySelectorAll('.fechar-modal');
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    const modalRoupa = document.getElementById('modal-roupa');
    const abrirModalRoupa = document.getElementById('abrir-modal-roupa');
    const fecharModalRoupa = document.getElementById('fechar-modal-roupa');
    let carrinho = [];

    let roupas = [
        {
            nome: "Vestido Floral",
            tamanho: "P,M,G",
            descricao: "Vestido leve com estampa floral, perfeito para o dia a dia.",
            preco: 79.90,
            imagemURL: "https://http2.mlstatic.com/D_NQ_NP_615227-MLB70787825981_072023-O.webp"
        },
        {
            nome: "Blusa Cropped",
            tamanho: "P,M",
            descricao: "Blusa cropped moderna, ideal para um look casual.",
            preco: 39.90,
            imagemURL: "https://http2.mlstatic.com/D_NQ_NP_913252-MLB72115938312_102023-O.webp" 
        },
        {
            nome: "Calça Moleton",
            tamanho: "M,G",
            descricao: "Calça Moleton, perfeita para os dias mais frios.",
            preco: 59.90,
            imagemURL: "https://4949028l.ha.azioncdn.net/img/2023/03/produto/9635/16-0602-02.jpg?ims=fit-in/630x945/filters:fill(white)"
        },
        {
            nome: "Jaqueta Jeans",
            tamanho: "P,M",
            descricao: "Jaqueta jeans descolada, ideal para dias mais frescos.",
            preco: 119.90,
            imagemURL: "https://http2.mlstatic.com/D_NQ_NP_625119-CBT75520087449_042024-O.webp"
        },
        {
            nome: "Saia Plissada",
            tamanho: "P,M,G",
            descricao: "Saia plissada elegante, perfeita para diversas ocasiões.",
            preco: 69.90,
            imagemURL: "https://global.cdn.magazord.com.br/bituah/img/2022/08/produto/357/sf001-1-saia-infantil-menina.jpg"
        },
        {
            nome: "Camisa Social",
            tamanho: "M,G",
            descricao: "Camisa social Infantil.",
            preco: 89.90,
            imagemURL: "https://th.bing.com/th/id/OIP.F6qL8wGmoesWC84akiHWZwHaJ4?rs=1&pid=ImgDetMain"
        }
    ];

    function atualizarListaRoupas() {
        listaRoupasContainer.innerHTML = '';

        roupas.forEach(roupa => {
            const novaRoupa = document.createElement('li');
            novaRoupa.classList.add('roupa-item');
            novaRoupa.innerHTML = `
                <h3>${roupa.nome}</h3>
                <img src="${roupa.imagemURL}" alt="${roupa.nome}">
                <p><strong>Tamanho:</strong> ${roupa.tamanho}</p>
                <p><strong>Descrição:</strong> ${roupa.descricao}</p>
                <p><strong>Preço:</strong> R$ ${roupa.preco.toFixed(2)}</p>
                <button class="adicionar-ao-carrinho">Adicionar ao Carrinho</button>
            `;

            const addToCartButton = novaRoupa.querySelector('.adicionar-ao-carrinho');
            addToCartButton.addEventListener('click', function() {
                addToCarrinho(roupa);
            });

            listaRoupasContainer.appendChild(novaRoupa);
        });
    }

    formRoupa.addEventListener('submit', function(event) {
        event.preventDefault();

        const nomeRoupa = document.getElementById('nome-roupa').value;
        const tamanhoRoupa = document.getElementById('tamanho-roupa').value;
        const descricaoRoupa = document.getElementById('descricao-roupa').value;
        const precoRoupa = parseFloat(document.getElementById('preco-roupa').value);
        const imagemRoupa = document.getElementById('imagem-roupa').value;

        const novaRoupa = {
            nome: nomeRoupa,
            tamanho: tamanhoRoupa,
            descricao: descricaoRoupa,
            preco: precoRoupa,
            imagemURL: imagemRoupa
        };

        roupas.push(novaRoupa);
        atualizarListaRoupas();

        formRoupa.reset();
        fecharModalRoupa.click();
    });

    function addToCarrinho(roupa) {
        const itemExistente = carrinho.find(item => item.roupa.nome === roupa.nome);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ roupa: roupa, quantidade: 1 });
        }

        atualizarCarrinhoIcon();
        alert(`"${roupa.nome}" adicionado ao carrinho!`);
    }

    function atualizarCarrinhoIcon() {
        let totalItens = 0;
        carrinho.forEach(item => {
            totalItens += item.quantidade;
        });
        carrinhoIcon.textContent = `🛒 (${totalItens})`;
    }

    function abrirModalCarrinho() {
        modalCarrinho.style.display = "block";
        atualizarItensCarrinho();
    }

    function fecharModalCarrinho() {
        modalCarrinho.style.display = "none";
    }

    function atualizarItensCarrinho() {
        itensCarrinho.innerHTML = '';
        let total = 0;

        carrinho.forEach(item => {
            const itemLista = document.createElement('li');
            itemLista.innerHTML = `
                ${item.roupa.nome} - Tamanho: ${item.roupa.tamanho} -
                Preço: R$ ${item.roupa.preco.toFixed(2)} - 
                Quantidade: ${item.quantidade} 
                <button class="remover-item" data-nome="${item.roupa.nome}">Remover</button>
            `;
            itensCarrinho.appendChild(itemLista);
            total += item.roupa.preco * item.quantidade;

            const removerBotao = itemLista.querySelector('.remover-item');
            removerBotao.addEventListener('click', function() {
                const nomeRoupaParaRemover = this.getAttribute('data-nome');
                removerDoCarrinho(nomeRoupaParaRemover);
            });
        });

        totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    function removerDoCarrinho(nomeRoupa) {
        carrinho = carrinho.filter(item => item.roupa.nome !== nomeRoupa);
        atualizarCarrinhoIcon();
        atualizarItensCarrinho();
    }

    carrinhoLink.addEventListener('click', abrirModalCarrinho);

    fecharModal.forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.parentElement.style.display = 'none';
        });
    });

    window.onclick = function(event) {
        if (event.target == modalCarrinho || event.target == modalRoupa) {
            event.target.style.display = "none";
        }
    };

    abrirModalRoupa.addEventListener('click', function() {
        modalRoupa.style.display = "block";
    });

    atualizarListaRoupas();
});
