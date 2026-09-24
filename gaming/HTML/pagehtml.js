const botaoMenu = document.getElementById("botao-menu");
const menuNavegacao = document.getElementById("menu-navegacao");

botaoMenu.addEventListener('click', () => {
    menuNavegacao.classList.toggle('escondido');
});

// Atualização da Barra de Progresso Global
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

// Desafio da Fase
const btnValidar = document.getElementById("btn-validar");
const respostaInput = document.getElementById("resposta-html");
const feedback = document.getElementById("feedback");

if (localStorage.getItem('fase_html') === 'concluido') {
    feedback.style.color = '#00ff00';
    feedback.textContent = '🏆 Fase Concluída Anteriormente!';
    respostaInput.value = 'p';
    respostaInput.disabled = true;
}

btnValidar.addEventListener('click', () => {
    const valor = respostaInput.value.trim().toLowerCase();
    
    if (valor === 'p') {
        feedback.style.color = '#00ff00';
        feedback.textContent = '✅ Excelente! Tag <p> inserida corretamente. (+50 XP Adicionado)';
        
        localStorage.setItem('fase_html', 'concluido');
        localStorage.setItem('inky', 'visitado'); // Fantasma da Home
        
        // Adiciona XP global
        let xpAtual = parseInt(localStorage.getItem('xp_player') || '120');
        localStorage.setItem('xp_player', Math.min(300, xpAtual + 50));
        
        atualizarProgresso();
    } else {
        feedback.style.color = '#ff0000';
        feedback.textContent = '❌ Tag incorreta. Lembre-se qual tag representa um parágrafo!';
    }
});