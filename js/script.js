document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".form-contato");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            alert("Mensagem enviada com sucesso!");

            form.reset();
        });
    }

});