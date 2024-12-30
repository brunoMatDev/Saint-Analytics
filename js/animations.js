
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


let ultimaPosicionScroll = window.scrollY;
let header = document.getElementById('header');
let headerOculto = false; // Variable para controlar si el header está oculto

window.addEventListener('scroll', function () {
    let posicionActual = window.scrollY;

    if (posicionActual > ultimaPosicionScroll && !headerOculto) {
        // Usuario hace scroll hacia abajo y el header no está oculto
        header.style.visibility = "hidden"; // Ocultar el header
        headerOculto = true;
    } else if (posicionActual < ultimaPosicionScroll && headerOculto) {
        // Usuario hace scroll hacia arriba y el header está oculto
        header.style.visibility = "visible"; // Mostrar el header
        headerOculto = false;
    }

    ultimaPosicionScroll = posicionActual; // Actualizar la posición del scroll
});


let MenuCelu = document.getElementById('menuCELU');
let button = document.getElementById('burguer');
let body = document.getElementById('body');
let logoNavBar = document.getElementById('logonav')

button.addEventListener('click', function(){
    if(MenuCelu.style.left == '0px'){
        body.style.overflow = 'auto';
        MenuCelu.style.left = '-100%';
        logoNavBar.style.visibility = 'visible';
    }else{
        body.style.overflow = 'hidden';
        MenuCelu.style.left = '0px';
        logoNavBar.style.visibility = 'hidden';

    }
})

document.querySelector('#contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
  
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    if (result.success) {
      alert('Correo enviado exitosamente.');
    } else {
      alert('Error al enviar el correo: ' + result.message);
    }
  });
  

