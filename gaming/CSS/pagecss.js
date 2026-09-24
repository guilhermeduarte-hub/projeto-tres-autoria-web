const botaoMenu = document.getElementById("botao-menu");
const menuNavegacao = document.getElementById("menu-navegacao");

botaoMenu.addEventListener('click', () => {
    menuNavegacao.classList.toggle('escondido');
});

function atualizarProgresso() {
    const fases = ['fase_html', 'fase_css', 'fase_js', 'fase_github'];
    let concluidas = 0;
    fases.forEach(fase => {
        if (localStorage.getItem(fase) === 'concluido') concluidas++;
    });

    const porcentagem = Math.round((concluidas / fases.length) * 100);
    document.getElementById('barra-preenchimento').style.width = `${porcentagem}%`;
    document.getElementById('texto-progresso').textContent = `${porcentagem}%`;
}

atualizarProgresso();

const btnValidar = document.getElementById("btn-validar");
const propInput = document.getElementById("resposta-css-prop");
const valInput = document.getElementById("resposta-css-val");
const feedback = document.getElementById("feedback");
const fantasmaTexto = document.getElementById("fantasma-texto");

if (localStorage.getItem('fase_css') === 'concluido') {
    feedback.style.color = '#00ff00';
    feedback.textContent = '🏆 Fase Concluída Anteriormente!';
    fantasmaTexto.style.color = 'red';
}

btnValidar.addEventListener('click', () => {
    const prop = propInput.value.trim().toLowerCase();
    const val = valInput.value.trim().toLowerCase();
    
    if (prop === 'color' && (val === 'red' || val === '#ff0000' || val === 'vermelho')) {
        feedback.style.color = '#00ff00';
        feedback.textContent = '✅ Perfeito! Cor aplicada com sucesso ao fantasma. (+50 XP)';
        fantasmaTexto.style.color = 'red';
        
        localStorage.setItem('fase_css', 'concluido');
        localStorage.setItem('blinky', 'visitado');
        
        let xpAtual = parseInt(localStorage.getItem('xp_player') || '120');
        localStorage.setItem('xp_player', Math.min(300, xpAtual + 50));
        
        atualizarProgresso();
    } else {
        feedback.style.color = '#ff0000';
        feedback.textContent = '❌ Incorreto. A propriedade deve ser "color" e o valor "red".';
    }
});