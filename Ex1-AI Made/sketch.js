// ===== SKETCH.JS - Lógica do Jogo =====

// 1. Variáveis Globais Essenciais ==================================================================

// Variáveis de Estado do Jogo
let estadoJogo = 'ESPERA'; // PODE SER: 'ESPERA', 'PIT_STOP', 'FIM'
let sequenciaCompleta = []; // O array que guarda as teclas a premir (ex: ['P', 'R', 'N'])
let indiceAtual = 0;      // O índice da tarefa atual na sequência
let teclasValidas = ['A', 'S', 'D', 'F', 'G']; // Conjunto de possíveis tarefas (ex: Pneu, Asa, etc.)

// Variáveis de Tempo e Pontuação
let tempoInicio; // millis() quando o pit stop começa
let tempoDecorrido = 0; // O tempo total do pit stop
let pontuacaoRecorde = Infinity; // Para guardar o highscore
let leaderboard = []; // Array para armazenar os melhores tempos

// 1. ===============================================================================================

// 2. A Lógica da Sequência e Geração (setup e draw) ================================================

function geraSequencia(tamanho) {
  sequenciaCompleta = [];
  // Usa o ciclo 'for' (requisito obrigatório) para criar o array de tarefas
  for (let i = 0; i < tamanho; i++) {
    let tarefaAleatoria = random(teclasValidas);
    sequenciaCompleta.push(tarefaAleatoria);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  // Gera uma sequência inicial de 5 tarefas
  geraSequencia(5); 
  erroFlashTimer = 0;
  carregarLeaderboard();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function carregarLeaderboard() {
  // Carrega o leaderboard do localStorage
  let dadosLeaderboard = localStorage.getItem('f1PitStopLeaderboard');
  if (dadosLeaderboard) {
    leaderboard = JSON.parse(dadosLeaderboard);
    // Ordena por tempo crescente (mais rápido primeiro)
    leaderboard.sort((a, b) => a - b);
    // Mantém apenas os top 10
    leaderboard = leaderboard.slice(0, 10);
    pontuacaoRecorde = leaderboard[0];
  } else {
    leaderboard = [];
    pontuacaoRecorde = Infinity;
  }
}

function guardarLeaderboard() {
  // Adiciona o novo tempo ao leaderboard
  leaderboard.push(tempoDecorrido);
  // Ordena por tempo crescente
  leaderboard.sort((a, b) => a - b);
  // Mantém apenas os top 10
  leaderboard = leaderboard.slice(0, 10);
  // Atualiza o recorde se necessário
  if (leaderboard.length > 0) {
    pontuacaoRecorde = leaderboard[0];
  }
  // Guarda no localStorage
  localStorage.setItem('f1PitStopLeaderboard', JSON.stringify(leaderboard));
}

function draw() {
  background(20); // Fundo escuro
  
  // Mostrar feedback visual de erro
  mostrarFlashErro();
  
  // Lógica principal baseada no estado do jogo
  if (estadoJogo === 'ESPERA') {
    mostrarMenuInicial();
  } else if (estadoJogo === 'PIT_STOP') {
    // Medir o tempo
    tempoDecorrido = millis() - tempoInicio;
    
    // Mostrar a pontuação/tempo primeiro (background)
    mostrarTempo();
    
    // Mostrar o carro (background)
    desenharCarro();
    
    // Mostrar a sequência atual (foreground - on top)
    mostrarSequencia();
  } else if (estadoJogo === 'FIM') {
    mostrarResultadoFinal();
  }
}

// 2. ===============================================================================================

// 3. Controlo do Jogo (Uso de keyPressed e Condicionais) ===========================================

function keyPressed() {
  if (estadoJogo === 'ESPERA' && key === ' ') {
    // Iniciar o jogo
    estadoJogo = 'PIT_STOP';
    indiceAtual = 0;
    tempoInicio = millis(); // Iniciar o cronómetro
  } 
  
  else if (estadoJogo === 'PIT_STOP') {
    // 1. OBRIGATÓRIO: Lógica Condicional para acertar ou errar
    let teclaEsperada = sequenciaCompleta[indiceAtual];
    
    // Converte a tecla premida para Maiúscula para comparação
    if (key.toUpperCase() === teclaEsperada) {
      // ACERTO: Avança para a próxima tarefa
      indiceAtual++;
      
      // Condicional de VITORIA
      if (indiceAtual >= sequenciaCompleta.length) {
        finalizarPitStop();
      }
      
    } else if (teclasValidas.includes(key.toUpperCase())) {
      // ERRO: Premida a tecla errada. Penalidade ou Fim do jogo (Hardcore)
      // Exemplo: penalidade de tempo
      tempoInicio -= 1000; // Penaliza com 1 segundo extra
      erroFlashTimer = 10; // Ativa o flash vermelho por 10 frames
    }
  }
  
  else if (estadoJogo === 'FIM' && key === ' ') {
    // Reinicia as variáveis
    estadoJogo = 'ESPERA';
    geraSequencia(5); // Gera nova sequência
  }
  
  return false;
}

// 3. ===============================================================================================

// 4. Condicional de Sucesso e Pontuação ============================================================

function finalizarPitStop() {
  estadoJogo = 'FIM';
  
  // Atualizar o Recorde (Pontuação)
  if (tempoDecorrido < pontuacaoRecorde) {
    pontuacaoRecorde = tempoDecorrido;
  }
  
  // Guarda o tempo no leaderboard
  guardarLeaderboard();
}

// 4. ===============================================================================================
