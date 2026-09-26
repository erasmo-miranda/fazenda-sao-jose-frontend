document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. LÓGICA DA PÁGINA PRINCIPAL (INDEX.HTML)
    // ==========================================
    const btnAbrirLogin = document.getElementById("btn-abrir-login") || document.querySelector(".btn-restrita");
    const modalLogin = document.getElementById("modal-login");
    const fecharModal = document.getElementById("fechar-modal");
    const formLogin = document.getElementById("form-login");
    const usuarioInput = document.getElementById("usuario");
    const senhaInput = document.getElementById("senha");

    // Abrir Modal
    if (btnAbrirLogin && modalLogin) {
        btnAbrirLogin.addEventListener("click", (e) => {
            e.preventDefault();
            modalLogin.classList.remove("hidden");
        });
    }

    // Fechar Modal no X
    if (fecharModal && modalLogin) {
        fecharModal.addEventListener("click", () => {
            modalLogin.classList.add("hidden");
        });
    }

    // Fechar Modal clicando fora da caixa
    window.addEventListener("click", (e) => {
        if (e.target === modalLogin) {
            modalLogin.classList.add("hidden");
        }
    });

    // Enviar formulário de login para o backend
    if (formLogin) {
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();

            const usuario = usuarioInput ? usuarioInput.value.trim() : "";
            const senha = senhaInput ? senhaInput.value.trim() : "";

            try {
                const resposta = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: usuario,
                        password: senha
                    })
                });

                if (resposta.ok) {
                    const dados = await resposta.json();
                    sessionStorage.setItem("adminAutenticado", "true");
                    if (dados.token) {
                        sessionStorage.setItem("token", dados.token);
                    }
                    window.location.assign("painel.html");
                } else {
                    const dados = await resposta.json().catch(() => ({}));
                    alert(dados.error || "E-mail ou senha inválidos!");
                }
            } catch (erro) {
                console.error("Erro ao conectar com a API:", erro);
                alert("Não foi possível conectar ao servidor backend.");
            }
        });
    }

    // Carregar preços atualizados na página inicial
    if (document.getElementById("preco-mel")) {
        const pMel = localStorage.getItem("precoMel");
        const pRapadura = localStorage.getItem("precoRapadura");
        const pAlfinim = localStorage.getItem("precoAlfinim");
        const pBatida = localStorage.getItem("precoBatida");

        if (pMel) document.getElementById("preco-mel").innerText = pMel;
        if (pRapadura) document.getElementById("preco-rapadura").innerText = pRapadura;
        if (pAlfinim) document.getElementById("preco-alfinim").innerText = pAlfinim;
        if (pBatida) document.getElementById("preco-batida").innerText = pBatida;
    }
});

// ==========================================
// 2. LÓGICA DO PAINEL (PAINEL.HTML)
// ==========================================
const btnSair = document.getElementById("btn-sair");
if (btnSair) {
    btnSair.addEventListener("click", () => {
        sessionStorage.removeItem("adminAutenticado");
        sessionStorage.removeItem("perfilUsuario");
        sessionStorage.removeItem("token");
        window.location.assign("index.html");
    });
}