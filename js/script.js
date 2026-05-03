document.addEventListener("DOMContentLoaded", () => {

    console.log("JS carregado");

    const form = document.querySelector(".form-contato");

    if (!form) {
        console.log("Form não encontrado");
        return;
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const nome = form.querySelector('input[name="nome"]');
        const email = form.querySelector('input[name="email"]');
        const mensagem = form.querySelector('textarea[name="mensagem"]');

        // 🔥 SEGURANÇA (evita erro null)
        if (!nome || !email || !mensagem) {
            console.log("Campos não encontrados");
            mostrarMensagem("Erro interno no formulário.", "erro");
            return;
        }

        // 🔥 REMOVE espaços
        const nomeValue = nome.value.trim();
        const emailValue = email.value.trim();
        const mensagemValue = mensagem.value.trim();

        // 🔥 VALIDAÇÃO
        if (!nomeValue || !emailValue || !mensagemValue) {
            mostrarMensagem("Preencha todos os campos!", "erro");
            return;
        }

        // validação de email melhor
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(emailValue)) {
            mostrarMensagem("Digite um email válido!", "erro");
            return;
        }

        // 🔥 SUCESSO
        mostrarMensagem("Mensagem enviada com sucesso!", "sucesso");

        form.reset();
    });

    function mostrarMensagem(texto, tipo) {
        let msg = document.querySelector(".msg-feedback");

        if (!msg) {
            msg = document.createElement("div");
            msg.classList.add("msg-feedback");
            document.body.appendChild(msg);
        }

        msg.textContent = texto;
        msg.style.display = "block";
        msg.style.opacity = "1";

        msg.style.background = tipo === "erro" ? "#ef4444" : "#22c55e";

        // animação leve
        msg.style.transform = "translateY(0)";
        
        setTimeout(() => {
            msg.style.opacity = "0";
            msg.style.transform = "translateY(-10px)";
        }, 2500);

        setTimeout(() => {
            msg.style.display = "none";
        }, 3000);
    }

});