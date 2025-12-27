
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

            container = newContainer;
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

        // 🔹 largura REAL de 1 card
        const firstCard = wrapper.querySelector(".testimonial-card");
        const cardStyle = getComputedStyle(firstCard);

        const cardWidth =
            firstCard.offsetWidth +
            parseInt(cardStyle.marginLeft) +
            parseInt(cardStyle.marginRight);

        /* =========================
           ATUALIZA ESTADO DAS SETAS
        ========================= */
        function updateArrows() {
            const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

            leftBtn.disabled = wrapper.scrollLeft <= 0;
            rightBtn.disabled = wrapper.scrollLeft >= maxScroll - 1;

            leftBtn.classList.toggle("disabled", leftBtn.disabled);
            rightBtn.classList.toggle("disabled", rightBtn.disabled);
        }

        /* =========================
           EVENTOS DAS SETAS
           (1 CARD POR CLIQUE)
        ========================= */
        leftBtn.addEventListener("click", () => {
            wrapper.scrollBy({ left: -cardWidth, behavior: "smooth" });
        });

        rightBtn.addEventListener("click", () => {
            wrapper.scrollBy({ left: cardWidth, behavior: "smooth" });
        });

        wrapper.addEventListener("scroll", updateArrows);
        window.addEventListener("resize", updateArrows);

        updateArrows();
    });
});


/* =========================
   PAGINAÇÃO (DOTS)
========================= */
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".testimonials-section").forEach(section => {

        const wrapper = section.querySelector(".testimonial-cards-wrapper");
        const dots = section.querySelectorAll(".carousel-pagination .dot");

        if (!wrapper || dots.length === 0) return;

        function updateDotsByScroll() {
            const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
            if (maxScroll <= 0) return;

            const segmentSize = maxScroll / (dots.length - 1);
            const index = Math.round(wrapper.scrollLeft / segmentSize);

            const safeIndex = Math.max(0, Math.min(index, dots.length - 1));

            dots.forEach(dot => dot.classList.remove("active"));
            dots[safeIndex].classList.add("active");
        }

        let ticking = false;
        wrapper.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateDotsByScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
                const target = (maxScroll / (dots.length - 1)) * index;

                wrapper.scrollTo({
                    left: target,
                    behavior: "smooth"
                });
            });
        });

        updateDotsByScroll();
    });
});


/* =========================
   ATUALIZA AO RESIZE
========================= */
window.addEventListener("resize", () => {
    document.querySelectorAll(".testimonial-cards-wrapper")
        .forEach(wrapper => wrapper.dispatchEvent(new Event("scroll")));
});

