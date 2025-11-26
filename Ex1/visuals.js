// ===== VISUALS.JS - Todas as funções de renderização e design =====

// Variável global para feedback visual de erro
let erroFlashTimer = 0;

// ===== MENU INICIAL (ESPERA) =====================================================

function mostrarMenuInicial() {
  push();
  background(45, 45, 50); // Fundo cinzento escuro profissional
  
  // ===== BACKGROUND - GARAGE STRUCTURE =====
  
  // Teto
  fill(60, 60, 65);
  rect(0, 0, width, height * 0.15);
  
  // Janelas do teto - industrial style
  fill(30, 30, 35);
  let windowCount = Math.ceil(width / 120);
  for (let i = 0; i < windowCount; i++) {
    fill(35, 35, 40);
    rect(i * 120, 10, 100, 60);
    
    // Grid das janelas
    stroke(50, 50, 55);
    strokeWeight(2);
    line(i * 120 + 25, 10, i * 120 + 25, 70);
    line(i * 120 + 50, 10, i * 120 + 50, 70);
    line(i * 120 + 75, 10, i * 120 + 75, 70);
    line(i * 120, 40, i * 120 + 100, 40);
    noStroke();
  }
  
  // Parede de fundo
  fill(70, 70, 80);
  rect(0, height * 0.15, width, height * 0.25);
  
  // Pilares estruturais
  fill(50, 50, 60);
  let pilarCount = Math.ceil(width / 150);
  for (let i = 0; i < pilarCount; i++) {
    rect(i * 150, height * 0.15, 20, height * 0.25);
  }
  
  // Chão do garage
  fill(55, 55, 60);
  rect(0, height * 0.4, width, height * 0.6);
  
  // Linhas de marcação do chão (pit lane markings)
  stroke(100, 100, 120);
  strokeWeight(3);
  for (let i = 0; i < 8; i++) {
    line(i * (width / 7), height * 0.4, i * (width / 7) + width * 0.1, height * 0.55);
  }
  noStroke();
  
  // ===== PIT BOXES =====
  
  let boxWidth = width * 0.12;
  let boxHeight = height * 0.25;
  let startX = width * 0.1;
  let boxY = height * 0.42;
  let spacing = width * 0.14;
  
  // Desenhar 5 pit boxes
  for (let i = 0; i < 5; i++) {
    let boxX = startX + i * spacing;
    
    // Destaque da box selecionada (vermelha)
    if (i === 2) {
      fill(200, 30, 30);
      stroke(255, 200, 0);
      strokeWeight(4);
      rect(boxX - 5, boxY - 5, boxWidth + 10, boxHeight + 10);
      noStroke();
    }
    
    // Caixa principal
    fill(80, 80, 90);
    stroke(120, 120, 130);
    strokeWeight(2);
    rect(boxX, boxY, boxWidth, boxHeight);
    noStroke();
    
    // Piso da box
    fill(70, 70, 75);
    rect(boxX, boxY + boxHeight * 0.6, boxWidth, boxHeight * 0.4);
    
    // Indicadores de piso (grips)
    fill(90, 90, 100);
    for (let j = 0; j < 3; j++) {
      rect(boxX + boxWidth * 0.1, boxY + boxHeight * 0.65 + j * 15, boxWidth * 0.8, 8);
    }
    
    // Jacks pneumáticos (frente e trás)
    fill(150, 50, 50);
    rect(boxX + boxWidth * 0.15, boxY - 20, 15, 20);
    rect(boxX + boxWidth * 0.7, boxY - 20, 15, 20);
    
    // Tubo/haste dos jacks
    stroke(100, 100, 110);
    strokeWeight(3);
    line(boxX + boxWidth * 0.225, boxY - 20, boxX + boxWidth * 0.225, boxY - 35);
    line(boxX + boxWidth * 0.775, boxY - 20, boxX + boxWidth * 0.775, boxY - 35);
    noStroke();
  }
  
  // ===== EQUIPMENT DISPLAY =====
  
  // Tire stacks em cima
  fill(30, 30, 35);
  for (let i = 0; i < 5; i++) {
    let eqX = startX + i * spacing + boxWidth / 2;
    
    // Stack de pneus
    ellipse(eqX - 20, boxY - 50, 25, 12);
    ellipse(eqX - 20, boxY - 65, 25, 12);
    ellipse(eqX - 20, boxY - 80, 25, 12);
    
    // Fuel rig
    fill(40, 40, 50);
    rect(eqX + 15, boxY - 85, 12, 50);
    fill(255, 150, 0);
    ellipse(eqX + 21, boxY - 35, 15, 10);
    fill(40, 40, 50);
  }
  
  // ===== INTERFACE ELEMENTS =====
  
  // Título principal
  fill(255, 255, 255);
  textSize(Math.min(80, width * 0.12));
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('F1 PIT STOP', width / 2, height * 0.22);
  
  // Subtítulo
  textSize(Math.min(40, width * 0.06));
  textStyle(NORMAL);
  fill(200, 200, 200);
  text('QUICK CHALLENGE', width / 2, height * 0.28);
  
  // Instruções
  textSize(Math.min(24, width * 0.035));
  fill(180, 180, 180);
  text('Complete the sequence faster than ever', width / 2, height * 0.68);
  
  // Teclas válidas
  textSize(Math.min(20, width * 0.03));
  fill(150, 150, 150);
  text(`Valid Keys: ${teclasValidas.join(' • ')}`, width / 2, height * 0.74);
  
  // Start button - grande e destacado
  fill(255, 200, 0);
  stroke(255, 255, 0);
  strokeWeight(4);
  rectMode(CENTER);
  rect(width / 2, height * 0.82, width * 0.25, height * 0.08, 10);
  rectMode(CORNER);
  noStroke();
  
  fill(0, 0, 0);
  textSize(Math.min(48, width * 0.08));
  textStyle(BOLD);
  text('PRESS SPACE', width / 2, height * 0.82);
  
  // Recorde display
  textSize(Math.min(18, width * 0.025));
  textStyle(NORMAL);
  fill(200, 200, 200);
  let recordeInicial = pontuacaoRecorde === Infinity ? '--:--' : nf(pontuacaoRecorde / 1000, 0, 2) + 's';
  text(`BEST TIME: ${recordeInicial}`, width / 2, height * 0.92);
  
  // F1 Logo canto esquerdo
  fill(255, 255, 255);
  textSize(Math.min(50, width * 0.08));
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('F', 30, 30);
  fill(255, 200, 0);
  text('1', 60, 30);
  
  pop();
}

function desenharCarroMenuInicial(x, y) {
  push();
  
  // Chassis principal - F1 style
  fill(220, 10, 10); // Ferrari red
  rect(x - 35, y - 12, 70, 24, 8);
  
  // Cockpit halo (segurança)
  fill(150, 150, 150);
  stroke(100, 100, 100);
  strokeWeight(2);
  arc(x, y - 15, 20, 25, PI, TWO_PI);
  
  // Cockpit
  fill(30, 30, 40);
  ellipse(x - 8, y - 8, 14, 10);
  
  // Asa frontal (DRS style)
  fill(220, 10, 10);
  rect(x + 28, y - 18, 10, 36, 2);
  
  // Elementos da asa
  fill(200, 200, 200);
  rect(x + 30, y - 16, 6, 8);
  rect(x + 30, y - 5, 6, 8);
  rect(x + 30, y + 5, 6, 8);
  
  // Asa traseira
  fill(220, 10, 10);
  rect(x - 38, y - 16, 10, 32, 2);
  
  // Rodas com aros
  fill(50, 50, 50);
  ellipse(x - 22, y + 14, 14, 14);
  ellipse(x + 22, y + 14, 14, 14);
  
  // Aros brilhosos
  fill(150, 150, 150);
  ellipse(x - 22, y + 14, 8, 8);
  ellipse(x + 22, y + 14, 8, 8);
  
  // Linha de design
  stroke(255, 200, 0);
  strokeWeight(2);
  line(x - 30, y, x + 25, y);
  
  pop();
}

function desenharCarroMenuInicial(x, y) {
  push();
  
  // Chassis principal - F1 style
  fill(220, 10, 10); // Ferrari red
  rect(x - 35, y - 12, 70, 24, 8);
  
  // Cockpit halo (segurança)
  fill(150, 150, 150);
  stroke(100, 100, 100);
  strokeWeight(2);
  arc(x, y - 15, 20, 25, PI, TWO_PI);
  
  // Cockpit
  fill(30, 30, 40);
  ellipse(x - 8, y - 8, 14, 10);
  
  // Asa frontal (DRS style)
  fill(220, 10, 10);
  rect(x + 28, y - 18, 10, 36, 2);
  
  // Elementos da asa
  fill(200, 200, 200);
  rect(x + 30, y - 16, 6, 8);
  rect(x + 30, y - 5, 6, 8);
  rect(x + 30, y + 5, 6, 8);
  
  // Asa traseira
  fill(220, 10, 10);
  rect(x - 38, y - 16, 10, 32, 2);
  
  // Rodas com aros
  fill(50, 50, 50);
  ellipse(x - 22, y + 14, 14, 14);
  ellipse(x + 22, y + 14, 14, 14);
  
  // Aros brilhosos
  fill(150, 150, 150);
  ellipse(x - 22, y + 14, 8, 8);
  ellipse(x + 22, y + 14, 8, 8);
  
  // Linha de design
  stroke(255, 200, 0);
  strokeWeight(2);
  line(x - 30, y, x + 25, y);
  
  pop();
}

// ===== GAMEPLAY (PIT_STOP) ========================================================

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

function desenharCarro() {
  let carX = width / 2;
  let carY = height / 2;
  
  push();
  noStroke();
  
  // ===== F1 CAR - SIMPLIFIED PROFESSIONAL STYLE =====
  
  // Main chassis body
  fill(200, 30, 30); // Ferrari red
  rect(carX - 60, carY - 15, 120, 30, 5);
  
  // Front nose cone
  fill(220, 50, 50);
  triangle(carX - 60, carY - 12, carX - 60, carY + 12, carX - 90, carY);
  
  // Cockpit halo
  fill(120, 120, 130);
  stroke(100, 100, 110);
  strokeWeight(2);
  arc(carX - 15, carY - 18, 30, 35, PI, TWO_PI);
  noStroke();
  
  // Cockpit area
  fill(40, 40, 50);
  ellipse(carX - 15, carY - 8, 16, 12);
  
  // Engine cover
  fill(200, 30, 30);
  rect(carX + 15, carY - 12, 45, 24, 3);
  
  // Cooling vents
  fill(150, 20, 20);
  for (let i = 0; i < 3; i++) {
    rect(carX + 20 + i * 12, carY - 8, 5, 4);
  }
  
  // Rear wing support
  fill(180, 25, 25);
  rect(carX + 55, carY - 10, 12, 20);
  
  // Rear wing main
  fill(180, 25, 25);
  rect(carX + 68, carY - 22, 40, 8);
  
  // Rear wing flaps
  fill(150, 20, 20);
  for (let i = 0; i < 3; i++) {
    rect(carX + 70 + i * 12, carY - 20, 3, 6);
  }
  
  // DRS flap (top)
  fill(160, 15, 15);
  rect(carX + 70, carY - 30, 38, 6);
  
  // ===== WHEELS =====
  
  // Tires
  fill(50, 50, 60);
  ellipse(carX - 45, carY - 28, 20, 20);
  ellipse(carX - 45, carY + 28, 20, 20);
  ellipse(carX + 70, carY - 28, 20, 20);
  ellipse(carX + 70, carY + 28, 20, 20);
  
  // Rims
  fill(180, 180, 190);
  ellipse(carX - 45, carY - 28, 12, 12);
  ellipse(carX - 45, carY + 28, 12, 12);
  ellipse(carX + 70, carY - 28, 12, 12);
  ellipse(carX + 70, carY + 28, 12, 12);
  
  // Center caps
  fill(100, 100, 110);
  ellipse(carX - 45, carY - 28, 5, 5);
  ellipse(carX - 45, carY + 28, 5, 5);
  ellipse(carX + 70, carY - 28, 5, 5);
  ellipse(carX + 70, carY + 28, 5, 5);
  
  // ===== DETAILS =====
  
  // Brake discs (red)
  fill(255, 100, 100);
  rect(carX - 54, carY - 30, 6, 4);
  rect(carX - 54, carY + 26, 6, 4);
  rect(carX + 76, carY - 30, 6, 4);
  rect(carX + 76, carY + 26, 6, 4);
  
  // Design stripe
  stroke(255, 200, 0);
  strokeWeight(2);
  line(carX - 85, carY, carX + 105, carY);
  
  pop();
}

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
      rect(x, height - 80, larguraItem + 10, larguraItem + 10, 5); // Rectângulo de destaque
    } 
    
    // 2. Tarefas Já Completadas
    else if (i < indiceAtual) {
      fill(0, 200, 0); // Verde para tarefas concluídas
      noStroke();
      rect(x, height - 80, larguraItem, larguraItem, 5);
      
      // Adicionar um símbolo de "check" ou "X" visualmente
      fill(255);
      textSize(larguraItem / 2);
      text('✓', x, height - 80);
    } 
    
    // 3. Próximas Tarefas (A aguardar)
    else {
      fill(50); // Cinzento escuro
      stroke(150);
      strokeWeight(2);
      rect(x, height - 80, larguraItem, larguraItem, 5);
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
    
    text(sequenciaCompleta[i], x, height - 80);
    pop();
  }
}

function mostrarFlashErro() {
  if (erroFlashTimer > 0) {
    fill(255, 0, 0, 100); // Vermelho semi-transparente
    rect(0, 0, width, height);
    erroFlashTimer--;
  }
}

// ===== RESULTADO FINAL (FIM) ======================================================

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
  text(`O SEU TEMPO: ${tempoFinal}s`, width / 2, height / 2 - 40);
  
  // Destaque do Recorde
  textSize(24);
  if (tempoDecorrido === pontuacaoRecorde) {
      fill(255, 255, 0); // Amarelo para novo recorde
      text('NOVO RECORDE!', width / 2, height / 2 + 10);
  } else {
      fill(150);
      text(`Recorde a bater: ${recordeFinal}s`, width / 2, height / 2 + 10);
  }
  
  // Mostrar mini leaderboard (Top 3)
  textSize(14);
  fill(200);
  text('TOP 3 TEMPOS:', width / 2, height / 2 + 50);
  
  textSize(12);
  fill(150);
  for (let i = 0; i < Math.min(3, leaderboard.length); i++) {
    let tempo = nf(leaderboard[i] / 1000, 0, 2);
    text(`${i + 1}º - ${tempo}s`, width / 2, height / 2 + 65 + (i * 15));
  }
  
  // Instrução para Próxima Ronda
  textSize(16);
  fill(100);
  text('Prima ESPAÇO para uma nova corrida.', width / 2, height - 30);
  
  pop();
}

// ===================================================================
