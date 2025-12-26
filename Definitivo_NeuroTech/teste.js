document.addEventListener("DOMContentLoaded", () => {

    // Seleciona todos os grupos de cartões do site
    const allWrappers = document.querySelectorAll(".testimonial-cards-wrapper");

    allWrappers.forEach(wrapper => {

        let container = wrapper.parentElement;

        // Se a DIV pai não for um carrossel, transformar em um
        if (!container.classList.contains("carousel-container")) {
            const newContainer = document.createElement("div");
            newContainer.classList.add("carousel-container");

            container.parentElement.insertBefore(newContainer, container);
            newContainer.appendChild(container);

            container = newContainer; // atualiza referência
        }

        wrapper.classList.add("carousel-wrapper");

        // Criar setas
        const leftBtn = document.createElement("button");
        leftBtn.classList.add("carousel-arrow", "left-arrow");
        leftBtn.innerHTML = "&#10094;";

        const rightBtn = document.createElement("button");
        rightBtn.classList.add("carousel-arrow", "right-arrow");
        rightBtn.innerHTML = "&#10095;";

        container.appendChild(leftBtn);
        container.appendChild(rightBtn);

        // Deslocamento baseado no tamanho dos cartões
        const firstCard = wrapper.querySelector(".testimonial-card");
        const scrollAmount = (firstCard?.offsetWidth || 300) + 20;

        // Eventos de clique
        leftBtn.addEventListener("click", () => {
            wrapper.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            wrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
});