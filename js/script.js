document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".form-contato");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const nome = form.querySelector('input[name="nome"]');
            const email = form.querySelector('input[name="email"]');
            const mensagem = form.querySelector('textarea[name="mensagem"]');

            // VALIDAÇÃO
            if (!nome.value || !email.value || !mensagem.value) {
                mostrarMensagem("Preencha todos os campos!", "erro");
                return;
            }

            if (!email.value.includes("@")) {
                mostrarMensagem("Email inválido!", "erro");
                return;
            }

            // SUCESSO
            mostrarMensagem("Mensagem enviada com sucesso!", "sucesso");

            form.reset();
        });
    }

    function mostrarMensagem(texto, tipo) {
        let msg = document.querySelector(".msg-feedback");

        if (!msg) {
            msg = document.createElement("div");
            msg.classList.add("msg-feedback");
            document.body.appendChild(msg);
        }

        msg.textContent = texto;
        msg.style.display = "block";

        msg.style.background = tipo === "erro" ? "#ef4444" : "#22c55e";

        setTimeout(() => {
            msg.style.display = "none";
        }, 3000);
    }

});