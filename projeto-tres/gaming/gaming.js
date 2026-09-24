const botaoMenu = document.getElementById("botao-menu");
const menuNavegacao = document.getElementById("menu-navegacao");

botaoMenu.addEventListener('click', () => {
    menuNavegacao.classList.toggle('escondido');
});

const fantasmas = document.querySelectorAll('.item-fantasma button');
const partesLabirinto = [
    document.getElementById('peca-supesq'),
    document.getElementById('peca-supdir'),
    document.getElementById('peca-infdir'),
    document.getElementById('peca-infesq')
];

fantasmas.forEach((fantasma, index) => {
    const idFantasma = fantasma.id;
    const urlDestino = fantasma.getAttribute('data-url');

    if (localStorage.getItem(idFantasma) === 'visitado') {
        fantasma.innerHTML = '<img src="imagens/pacman.svg" alt="Pac-Man">';
        partesLabirinto[index].classList.remove('escondido');
    }

    fantasma.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem(idFantasma, 'visitado');
        setTimeout(() => {
            window.location.href = urlDestino;
        }, 100);
    });
});

function verificarProgresso() {
    fantasmas.forEach((fantasma, index) => {
        if (localStorage.getItem(fantasma.id) === 'visitado') {
            partesLabirinto[index].classList.remove('escondido');
        }
    });
}

verificarProgresso();