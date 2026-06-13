/*==================================================
        PORTFÓLIO DANIEL LIMA - JS FINAL
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* MENU MOBILE */

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });
    }

    /* SCROLL SUAVE */

    const linksMenu = document.querySelectorAll('a[href^="#"]');

    linksMenu.forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (!href || href === "#") return;

            const destino = document.querySelector(href);

            if (destino) {
                e.preventDefault();

                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                if (menu) {
                    menu.classList.remove("active");
                }

                if (menuToggle) {
                    const icon = menuToggle.querySelector("i");

                    if (icon) {
                        icon.classList.add("fa-bars");
                        icon.classList.remove("fa-xmark");
                    }
                }
            }
        });
    });

    /* NAVBAR AO ROLAR */

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                navbar.style.background = "rgba(7, 13, 24, .92)";
                navbar.style.boxShadow = "0 20px 60px rgba(0,0,0,.45)";
                navbar.style.borderColor = "rgba(56,189,248,.28)";
            } else {
                navbar.style.background = "rgba(7, 13, 24, .78)";
                navbar.style.boxShadow = "0 20px 60px rgba(0,0,0,.30)";
                navbar.style.borderColor = "rgba(148,163,184,.18)";
            }
        });
    }

    /* EFEITO DIGITAÇÃO */

    const textoDigitado = "Analista de Business Intelligence";
    const subtitulo = document.querySelector(".hero h2");

    if (subtitulo) {
        let i = 0;
        subtitulo.textContent = "";

        function escrever() {
            if (i < textoDigitado.length) {
                subtitulo.textContent += textoDigitado.charAt(i);
                i++;
                setTimeout(escrever, 65);
            }
        }

        escrever();
    }

    /* CONTADORES */

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
                    const incremento = Math.max(1, numero / 70);

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
            threshold: 0.45
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    /* REVEAL AO ROLAR */

    const reveals = document.querySelectorAll(".reveal");

    if (reveals.length > 0) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        reveals.forEach(item => revealObserver.observe(item));
    }

    /* FORMULÁRIO */

    const formulario = document.querySelector("form");
    const botaoEnviar = formulario ? formulario.querySelector("button") : null;

    if (formulario && botaoEnviar) {
        const textoOriginal = botaoEnviar.innerHTML;

        formulario.addEventListener("submit", () => {
            botaoEnviar.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Enviando...`;
            botaoEnviar.disabled = true;

            setTimeout(() => {
                botaoEnviar.innerHTML = textoOriginal;
                botaoEnviar.disabled = false;
            }, 6000);
        });
    }

    /* ANO AUTOMÁTICO */

    const anoAtual = new Date().getFullYear();
    const footerTexto = document.querySelector("footer p:last-child");

    if (footerTexto) {
        footerTexto.innerHTML = `© ${anoAtual} Daniel Lima. Todos os direitos reservados.`;
    }

    /* WHATSAPP COM MENSAGEM PRONTA */

    const whatsappFloat = document.querySelector(".whatsapp-float");

    if (whatsappFloat) {
        const mensagem = encodeURIComponent(
            "Olá, Daniel! Vi seu portfólio e gostaria de conversar sobre dados/BI."
        );

        whatsappFloat.href = `https://wa.me/5585994012461?text=${mensagem}`;
    }

    /* MENU ATIVO AO ROLAR */

    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".menu a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

});