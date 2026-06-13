/*==================================================
            PORTFÓLIO DANIEL LIMA
====================================================*/

/*==============================================
        SCROLL SUAVE DO MENU
==============================================*/

document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener('click', function(e){

        const destino = document.querySelector(this.getAttribute('href'));

        if(destino){

            e.preventDefault();

            destino.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*==============================================
            NAVBAR AO ROLAR
==============================================*/

const navbar = document.querySelector("nav");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 80){

        navbar.style.background="rgba(11,17,32,.98)";

        navbar.style.boxShadow="0 8px 20px rgba(0,0,0,.3)";

    }

    else{

        navbar.style.background="rgba(11,17,32,.90)";

        navbar.style.boxShadow="none";

    }

});

/*==============================================
            EFEITO DIGITAÇÃO
==============================================*/

const texto = "Analista de Business Intelligence";

const subtitulo = document.querySelector(".hero h2");

let i = 0;

subtitulo.textContent="";

function escrever(){

    if(i < texto.length){

        subtitulo.textContent += texto.charAt(i);

        i++;

        setTimeout(escrever,70);

    }

}

escrever();

/*==============================================
        CONTADORES COM OBSERVER
==============================================*/

const counters = document.querySelectorAll(".stat h3");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;

            const original = counter.innerText;

            const numero = parseInt(original.replace(/\D/g,""));

            const possuiK = original.includes("k");

            const possuiMais = original.includes("+");

            let atual = 0;

            const incremento = numero / 80;

            function contar(){

                atual += incremento;

                if(atual < numero){

                    if(possuiK){

                        counter.innerText = Math.floor(atual)+"k+";

                    }

                    else if(possuiMais){

                        counter.innerText = Math.floor(atual)+"+";

                    }

                    else{

                        counter.innerText = Math.floor(atual);

                    }

                    requestAnimationFrame(contar);

                }

                else{

                    counter.innerText = original;

                }

            }

            contar();

            observer.unobserve(counter);

        }

    });

});

counters.forEach(counter=>observer.observe(counter));

/*==============================================
        REVEAL AO ROLAR A PÁGINA
==============================================*/

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:0.15
});

reveals.forEach(item=>{

    revealObserver.observe(item);

});