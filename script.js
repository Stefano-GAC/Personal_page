// Selecciona todos los elementos con clase hidden
const hiddenElements = document.querySelectorAll(".hidden");

// Crea un observador para detectar cuando aparecen en pantalla
const observer = new IntersectionObserver((entries) => {
    
    entries.forEach(entry => {

        // Si el elemento es visible en pantalla
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});

// Observa cada elemento oculto
hiddenElements.forEach(el => observer.observe(el));

const backToTop = document.getElementById("backToTop");

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};

backToTop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// texto que se escribirá
const text = "Desarrollador Web Full Stack";

// elemento donde se mostrará
const typingElement = document.getElementById("typing");

let index = 0;

// función que escribe letra por letra
function typeEffect() {

    if(index < text.length){
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 80);
    }

}

// inicia el efecto cuando carga la página
typeEffect();