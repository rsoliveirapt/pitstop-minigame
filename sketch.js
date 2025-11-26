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
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  // Gera uma sequência inicial de 5 tarefas
  geraSequencia(5); 
}

function draw() {
  background(20); // Fundo escuro
  
  // Lógica principal baseada no estado do jogo
  if (estadoJogo === 'ESPERA') {
    mostrarMenuInicial();
  } else if (estadoJogo === 'PIT_STOP') {
    // Medir o tempo
    tempoDecorrido = millis() - tempoInicio;
    
    // Mostrar a pista e o carro (estética)
    // Mostrar a sequência atual
    mostrarSequencia();
    
    // Mostrar a pontuação/tempo
    mostrarTempo();
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
      
      // OBRIGATÓRIO: Adicionar feedback visual de erro (ex: piscar a vermelho)
      
    }
  }
}

// 3. ===============================================================================================

// 4. Condicional de Sucesso e Pontuação ============================================================

function finalizarPitStop() {
  estadoJogo = 'FIM';
  
  // Atualizar o Recorde (Pontuação)
  if (tempoDecorrido < pontuacaoRecorde) {
    pontuacaoRecorde = tempoDecorrido;
  }
  
  // (Opcional) Guardar recorde com localStorage (Desafio Adicional)
  // localStorage.setItem('f1Recorde', pontuacaoRecorde);
}

// 4. ===============================================================================================

// 5. Visualização da Sequência de Tarefas ==========================================================

function mostrarSequencia() {
  let tamanhoSequencia = sequenciaCompleta.length;
  let larguraItem = 80;
  let espacamento = 20;
  let larguraTotal = (tamanhoSequencia * larguraItem) + ((tamanhoSequencia - 1) * espacamento);
  let startX = (width - larguraTotal) / 2; // Centraliza a sequência

  for (let i = 0; i < tamanhoSequencia; i++) {
    let x = startX + i * (larguraItem + espacamento) + (larguraItem / 2);

    push();
    rectMode(CENTER);

    // 1. Destaque para a Tarefa Atual
    if (i === indiceAtual) {
      fill(255, 255, 0); // Amarelo brilhante para a tarefa em curso
      stroke(255);
      strokeWeight(4);
      rect(x, height / 2, larguraItem + 10, larguraItem + 10, 5); // Rectângulo de destaque
    } 
    
    // 2. Tarefas Já Completadas
    else if (i < indiceAtual) {
      fill(0, 200, 0); // Verde para tarefas concluídas
      noStroke();
      rect(x, height / 2, larguraItem, larguraItem, 5);
      
      // Adicionar um símbolo de "check" ou "X" visualmente
      fill(255);
      textSize(larguraItem / 2);
      text('✓', x, height / 2);
    } 
    
    // 3. Próximas Tarefas (A aguardar)
    else {
      fill(50); // Cinzento escuro
      stroke(150);
      strokeWeight(2);
      rect(x, height / 2, larguraItem, larguraItem, 5);
    }

    // Mostrar a Tecla
    fill(255);
    textSize(24);
    // Assegura que o texto da tecla aparece sobre o destaque
    if (i === indiceAtual) {
        fill(0); // Texto preto no destaque amarelo
    } else {
        fill(255);
    }
    
    text(sequenciaCompleta[i], x, height / 2);
    pop();
  }
}

// 5. ===============================================================================================

// 6. Feedback de Tempo e Pontuação =================================================================

function mostrarTempo() {
  push();
  fill(255);
  noStroke();
  textSize(48);
  
  // Converte o tempo (em ms) para um formato mais legível (segundos)
  let segundos = nf(tempoDecorrido / 1000, 0, 2); // Ex: 08.56
  
  // Título e valor do tempo
  text('TEMPO DO PIT STOP', width / 2, 50);
  fill(255, 100, 100); // Vermelho de F1
  text(segundos, width / 2, 100); 
  
  // Mostrar o recorde (highscore)
  textSize(18);
  fill(150);
  let recordeSegundos = pontuacaoRecorde === Infinity ? 'N/A' : nf(pontuacaoRecorde / 1000, 0, 2);
  text(`RECORDE: ${recordeSegundos}s`, width / 2, 150);
  
  pop();
}

// 6. ===============================================================================================

// 7. Implementação do Feedback de Erro (Condicionais) ==============================================

let erroFlashTimer = 0;

function draw() {
  background(20); // Fundo escuro
  
  // Se houver um erro recente, sobrepõe um flash vermelho
  if (erroFlashTimer > 0) {
    fill(255, 0, 0, 100); // Vermelho semi-transparente
    rect(width / 2, height / 2, width, height);
    erroFlashTimer--;
  }

  // ... (Resto do código draw)
}

function keyPressed() {
    // ... (Lógica de acerto)
    
    // Lógica de ERRO
    else if (teclasValidas.includes(key.toUpperCase())) {
      tempoInicio -= 1000; // Penaliza com 1 segundo extra
      erroFlashTimer = 10; // Ativa o flash vermelho por 10 frames
    }
}

// 7. ===============================================================================================

// 8. Desenho do Carro de F1 ========================================================================

function desenharCarro() {
  let carX = width / 2;
  let carY = height / 2;
  let carW = 150;
  let carH = 60;
  
  push();
  rectMode(CENTER);
  stroke(255);
  strokeWeight(2);
  
  // Corpo Principal do Carro
  fill(180, 0, 0); // Vermelho de F1
  rect(carX, carY, carW, carH, 10); // Carro
  
  // Asa Frontal (Foco na aerodinâmica)
  fill(50);
  rect(carX + carW/2 + 5, carY, 15, carH - 10);
  
  // Cockpit
  fill(0);
  ellipse(carX - carW/4, carY, 30, carH - 20);
  
  // Linhas de design (opcional, para estética)
  stroke(255, 255, 0); // Amarelo
  line(carX - carW/2, carY, carX + carW/2, carY);
  
  pop();
}

function draw() {
    // ... (código existente)
    if (estadoJogo === 'PIT_STOP') {
        // ...
        mostrarSequencia();
        mostrarTempo();
        desenharCarro(); // Adicionar o carro ao loop de jogo
    }
    // ...
}

// 8. ===============================================================================================

// 9. Desenvolvimento do Estado Final (FIM) =========================================================

function mostrarResultadoFinal() {
  push();
  background(20);
  
  let tempoFinal = nf(tempoDecorrido / 1000, 0, 2);
  let recordeFinal = nf(pontuacaoRecorde / 1000, 0, 2);
  
  // Título e Feedback (Venceu/Sucesso)
  textSize(60);
  fill(0, 200, 0); // Verde de vitória
  text('PIT STOP COMPLETO!', width / 2, height / 4);
  
  // Detalhes da Pontuação
  textSize(32);
  fill(255);
  text(`O SEU TEMPO: ${tempoFinal}s`, width / 2, height / 2);
  
  // Destaque do Recorde
  textSize(24);
  if (tempoDecorrido === pontuacaoRecorde) {
      fill(255, 255, 0); // Amarelo para novo recorde
      text('NOVO RECORDE!', width / 2, height / 2 + 50);
  } else {
      fill(150);
      text(`Recorde a bater: ${recordeFinal}s`, width / 2, height / 2 + 50);
  }
  
  // Instrução para Próxima Ronda
  textSize(20);
  fill(100);
  text('Prima ESPAÇO para uma nova corrida.', width / 2, height - 50);
  
  pop();
}

// ATUALIZAÇÃO: Reiniciar o jogo (Lógica de Ciclo)
function keyPressed() {
    // ... (código existente)
    
    // Reiniciar o jogo no estado FIM
    else if (estadoJogo === 'FIM' && key === ' ') {
      // Reinicia as variáveis
      estadoJogo = 'ESPERA';
      geraSequencia(5); // Gera nova sequência
    }
}

// 9. ===============================================================================================

// 10. Desenvolvimento do Estado Inicial (ESPERA) ===================================================

function mostrarMenuInicial() {
  push();
  background(10); // Fundo muito escuro
  
  // Título do Jogo
  textSize(64);
  fill(255, 100, 100); // Vermelho de F1
  text('F1 PIT STOP RÁPIDO', width / 2, height / 3);
  
  // Instruções
  textSize(24);
  fill(200);
  text('Complete a sequência de teclas o mais rápido possível.', width / 2, height / 2);
  
  // Sequência de Teclas Possíveis (Teclas Válidas)
  textSize(18);
  fill(150);
  text(`Teclas de Tarefa: ${teclasValidas.join(' / ')}`, width / 2, height / 2 + 50);
  
  // Chamada para Iniciar o Jogo
  textSize(36);
  fill(255, 255, 0); // Amarelo de 'Go'
  text('PRIMA ESPAÇO PARA COMEÇAR!', width / 2, height - 100);
  
  // Recorde (Opcional, se já tiver um valor)
  textSize(16);
  fill(100);
  let recordeInicial = pontuacaoRecorde === Infinity ? 'N/A' : nf(pontuacaoRecorde / 1000, 0, 2);
  text(`MELHOR TEMPO: ${recordeInicial}s`, width / 2, height - 50);
  
  pop();
}

// Lembrete: A função 'draw' deve chamar esta função no estado 'ESPERA'
function draw() {
    // ...
    if (estadoJogo === 'ESPERA') {
        mostrarMenuInicial(); // Chamada para o menu inicial
    } 
    // ...
}

// 10. ===============================================================================================