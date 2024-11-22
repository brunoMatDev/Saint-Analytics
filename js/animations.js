// animations.js
function animateCountUp(element, target) {
    let count = 0;
    const duration = 1400; // Duración total de la animación en ms
    const increment = target / (duration / 30); // Incremento en cada intervalo de 30ms

    const counter = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(counter);
        }
        element.textContent = `+ ${Math.floor(count)} ${element.dataset.label}`;
    }, 30);
}

document.addEventListener("DOMContentLoaded", () => {
    const experienceElement = document.getElementById("experience");
    const clientsElement = document.getElementById("clients");

    experienceElement.dataset.label = "AÑOS DE EXPERIENCIA";
    clientsElement.dataset.label = "CLIENTES SATISFECHOS";

    animateCountUp(experienceElement, 5); // Incrementa hasta 5
    animateCountUp(clientsElement, 20); // Incrementa hasta 15
});
