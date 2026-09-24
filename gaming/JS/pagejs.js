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
const eventoInput = document.getElementById("resposta-js-evento");
const feedback = document.getElementById("feedback");

if (localStorage.getItem('fase_js') === 'concluido') {
    feedback.style.color = '#00ff00';
    feedback.textContent = '🏆 Fase Concluída Anteriormente!';
    eventoInput.value = 'click';
}

btnValidar.addEventListener('click', () => {
    const evento = eventoInput.value.trim().toLowerCase();
    
    if (evento === 'click') {
        feedback.style.color = '#00ff00';
        feedback.textContent = '✅ Resposta exata! Evento "click" capturado com sucesso (+50 XP)';
        
        localStorage.setItem('fase_js', 'concluido');
        localStorage.setItem('pinky', 'visitado');
        
        let xpAtual = parseInt(localStorage.getItem('xp_player') || '120');
        localStorage.setItem('xp_player', Math.min(300, xpAtual + 50));
        
        atualizarProgresso();
    } else {
        feedback.style.color = '#ff0000';
        feedback.textContent = '❌ Incorreto. Qual palavra em inglês indica o ato de clicar?';
    }
});