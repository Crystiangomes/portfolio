document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        // Validação do nome
        if (nome.length < 3) {
            mostrarMensagem("Digite um nome válido.", "erro");
            return;
        }

        // Validação do e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            mostrarMensagem("Digite um e-mail válido.", "erro");
            return;
        }

        // Validação da mensagem
        if (mensagem.length < 10) {
            mostrarMensagem(
                "A mensagem deve ter pelo menos 10 caracteres.",
                "erro"
            );
            return;
        }

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {

                mostrarMensagem(
                    "Mensagem enviada com sucesso!",
                    "sucesso"
                );

                contactForm.reset();

            } else {

                mostrarMensagem(
                    "Erro ao enviar a mensagem.",
                    "erro"
                );

            }

        } catch (error) {

            mostrarMensagem(
                "Erro de conexão. Tente novamente.",
                "erro"
            );

        }

    });

    function mostrarMensagem(texto, tipo) {

        let msg = document.querySelector(".msg-feedback");

        if (!msg) {

            msg = document.createElement("div");
            msg.classList.add("msg-feedback");

            msg.style.position = "fixed";
            msg.style.top = "20px";
            msg.style.right = "20px";
            msg.style.padding = "15px 25px";
            msg.style.borderRadius = "10px";
            msg.style.color = "#fff";
            msg.style.fontWeight = "600";
            msg.style.zIndex = "9999";

            document.body.appendChild(msg);
        }

        msg.textContent = texto;

        msg.style.background =
            tipo === "erro"
                ? "#ef4444"
                : "#22c55e";

        msg.style.display = "block";
        msg.style.opacity = "1";

        setTimeout(() => {

            msg.style.opacity = "0";

            setTimeout(() => {
                msg.style.display = "none";
            }, 300);

        }, 3000);
    }

});