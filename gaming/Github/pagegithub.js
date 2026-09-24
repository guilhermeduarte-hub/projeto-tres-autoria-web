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

const btnValidarGit = document.getElementById("btn-validar-git");
const gitInput = document.getElementById("resposta-git");
const feedbackGit = document.getElementById("feedback-git");
const secaoProvaFinal = document.getElementById("secao-prova-final");

if (localStorage.getItem('fase_github') === 'concluido') {
    feedbackGit.style.color = '#00ff00';
    feedbackGit.textContent = '✅ Fase GitHub Concluída!';
    gitInput.value = 'git push';
    secaoProvaFinal.classList.remove('escondido');
}

btnValidarGit.addEventListener('click', () => {
    const cmd = gitInput.value.trim().toLowerCase();
    
    if (cmd === 'git push') {
        feedbackGit.style.color = '#00ff00';
        feedbackGit.textContent = '✅ Excelente! Código publicado no GitHub (+50 XP). A Prova Final foi liberada abaixo!';
        
        localStorage.setItem('fase_github', 'concluido');
        localStorage.setItem('clyde', 'visitado');
        
        let xpAtual = parseInt(localStorage.getItem('xp_player') || '120');
        localStorage.setItem('xp_player', Math.min(300, xpAtual + 50));
        
        secaoProvaFinal.classList.remove('escondido');
        atualizarProgresso();
    } else {
        feedbackGit.style.color = '#ff0000';
        feedbackGit.textContent = '❌ Comando incorreto. Dica: use "git push".';
    }
});

const formProva = document.getElementById("formulario-prova");
const feedbackProva = document.getElementById("feedback-prova");

if (localStorage.getItem('prova_final') === 'aprovado') {
    feedbackProva.style.color = '#00ff00';
    feedbackProva.textContent = '🏆 Parabéns! Você já foi APROVADO na prova final com 100% de aproveitamento!';
}

formProva.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const resp1 = formProva.q1.value;
    const resp2 = formProva.q2.value;
    const resp3 = formProva.q3.value;
    const resp4 = formProva.q4.value;

    if (resp1 === 'a' && resp2 === 'padding' && resp3 === 'localStorage.setItem' && resp4 === 'git init') {
        feedbackProva.style.color = '#00ff00';
        feedbackProva.textContent = '🎉 PERFEITO! Você acertou todas as questões! Você completou 300/300 XP do projeto!';
        
        localStorage.setItem('prova_final', 'aprovado');
        localStorage.setItem('xp_player', '300'); 
        
        setTimeout(() => {
            window.location.href = '../../cards/cards.html';
        }, 2000);
    } else {
        feedbackProva.style.color = '#ff0000';
        feedbackProva.textContent = '❌ Algumas respostas estão incorretas. Revise o material das fases e tente novamente!';
    }
});