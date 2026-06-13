/*==================================================
            PORTFÓLIO DANIEL LIMA
====================================================*/

/*==============================================
        SCROLL SUAVE DO MENU
==============================================*/

const linksMenu = document.querySelectorAll('nav a');

linksMenu.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href && href.startsWith("#")) {
            const destino = document.querySelector(href);

            if (destino) {
                e.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});

/*==============================================
            NAVBAR AO ROLAR
==============================================*/

const navbar = document.querySelector("nav");

if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.style.background = "rgba(11,17,32,.98)";
            navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,.35)";
            navbar.style.backdropFilter = "blur(12px)";
        } else {
            navbar.style.background = "rgba(11,17,32,.90)";
            navbar.style.boxShadow = "none";
            navbar.style.backdropFilter = "blur(8px)";
        }
    });
}

/*==============================================
            EFEITO DIGITAÇÃO
==============================================*/

const textoDigitado = "Analista de Business Intelligence";
const subtitulo = document.querySelector(".hero h2");

if (subtitulo) {
    let i = 0;
    subtitulo.textContent = "";

    function escrever() {
        if (i < textoDigitado.length) {
            subtitulo.textContent += textoDigitado.charAt(i);
            i++;
            setTimeout(escrever, 70);
        }
    }

    escrever();
}

/*==============================================
        CONTADORES COM OBSERVER
==============================================*/

const counters = document.querySelectorAll(".stat h3");

if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const original = counter.innerText;
                const numero = parseInt(original.replace(/\D/g, ""));

                if (isNaN(numero)) return;

                const possuiK = original.toLowerCase().includes("k");
                const possuiMais = original.includes("+");

                let atual = 0;
                const incremento = Math.max(1, numero / 80);

                function contar() {
                    atual += incremento;

                    if (atual < numero) {
                        if (possuiK && possuiMais) {
                            counter.innerText = Math.floor(atual) + "k+";
                        } else if (possuiK) {
                            counter.innerText = Math.floor(atual) + "k";
                        } else if (possuiMais) {
                            counter.innerText = Math.floor(atual) + "+";
                        } else {
                            counter.innerText = Math.floor(atual);
                        }

                        requestAnimationFrame(contar);
                    } else {
                        counter.innerText = original;
                    }
                }

                contar();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));
}

/*==============================================
        REVEAL AO ROLAR A PÁGINA
==============================================*/

const reveals = document.querySelectorAll(".reveal");

if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(item => revealObserver.observe(item));
}

/*==============================================
        FORMULÁRIO - FEEDBACK VISUAL
==============================================*/

const formulario = document.querySelector("form");
const botaoEnviar = formulario ? formulario.querySelector("button") : null;

if (formulario && botaoEnviar) {
    formulario.addEventListener("submit", () => {
        botaoEnviar.innerText = "Enviando...";
        botaoEnviar.disabled = true;
    });
}

/*==============================================
        ANO AUTOMÁTICO NO FOOTER
==============================================*/

const anoAtual = new Date().getFullYear();
const footerTexto = document.querySelector("footer p:last-child");

if (footerTexto) {
    footerTexto.innerHTML = `© ${anoAtual} Daniel Lima. Todos os direitos reservados.`;
}