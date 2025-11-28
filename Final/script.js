//Variaveis globais basicas
let jogoAtivo = false; // indica se o jogo ja comecou
let tempoInicio = 0; // guarda o momento em que o jogo comecou
let tempoAtual = 0; // tempo decorrido
let melhorTempo = null; // melhor tempo registrado

//Variaveis de Pontuacao
let pontos = 0; // pontuacao do jogador
let erros = 0; // numero de erros cometidos
let maxErros = 5; // numero maximo de erros permitidos

// Adicionar lista das partes do carro e as suas teclas correspondentes
let partes = [
  { nome: "Pneu dianteiro esquerdo", tecla: "Q" },
  { nome: "Pneu dianteiro direito", tecla: "W" },
  { nome: "Pneu traseiro esquerdo", tecla: "A" },
  { nome: "Pneu traseiro direito", tecla: "S" },
  { nome: "Asa dianteira", tecla: "E" },
  { nome: "Asa traseira", tecla: "D" }
];

// Pedido atual
let pedidoAtual = null;

// mensagem de feedback
let mensagem = "";

// progresso
let partesConcluidas = 0;
let totalPartes = 6; // total de partes a trocar, posso acrescentar mais depois

//Funcoes
function setup() {
  // criar um canvas e colocar dentro do div #game-container
  let canvas = createCanvas (windowWidth, windowHeight);
  canvas.parent("game-container");

  // carregar melhor tempo do localStorage
  let salvo = localStorage.getItem("melhorTempoPitstop");
  if (salvo !== null) {
    melhorTempo = parseFloat(salvo);
  }

  //fundo inicial
  background(30);

  //escrever uma mensagem inicial
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Clique no botão 'Iniciar Pitstop' para comecar.", width/2, height/2);

  // ligar o botao de iniciar ao jogo
  const botaoIniciar = document.getElementById("start-btn");
  botaoIniciar.addEventListener("click", iniciarJogo);
}

// Funcao para comecar o jogo
function iniciarJogo() {
  jogoAtivo = true;
  tempoInicio = millis(); //marca o tempo de inicio
  partesConcluidas = 0;
  mensagem = "";

  pontos = 0;
  erros = 0;

  gerarNovoPedido();
}

function gerarNovoPedido() {
  let indice = Math.floor(Math.random() * partes.length);
  pedidoAtual = partes[indice];
}

// Funcao captura de teclas
function keyPressed() {
  if (!jogoAtivo || pedidoAtual === null) {
    return;
  }

  let teclaCarregada = key.toUpperCase();

  if (teclaCarregada === pedidoAtual.tecla) {
    mensagem = "Correto! (" + teclaCarregada + ")";
    pontos = pontos + 10; // +10 pontos por cada certo
    partesConcluidas++; // +1 parte concluida

    if (partesConcluidas >= totalPartes) {
      terminarJogo();
    } else {
      gerarNovoPedido(); 
    }
  } else {
    //Erro
    mensagem = "Errado! Carregaste " + teclaCarregada + ", mas a certa e " + pedidoAtual.tecla + ".";

    // aumentar erros
    erros++;

    // penalizacao de tempo + 1segundo
    tempoInicio = tempoInicio - 1000;

    pontos = pontos - 5; // -5 pontos por cada erro
    if (pontos < 0) {
      pontos = 0; // evitar pontos negativos
    }

    // se exceder o nr maximo de erros, termina o jogo
    if (erros >= maxErros) {
      terminarJogoFalha();
    }
  }
}

// Funcao Terminar Jogo
function terminarJogo() {
  jogoAtivo = false;
  let tempoTotalSegundos = (millis() - tempoInicio) / 1000;

  if (melhorTempo === null || tempoTotalSegundos < melhorTempo) {
    melhorTempo = tempoTotalSegundos;
    localStorage.setItem("melhorTempoPitstop", melhorTempo);
    mensagem = "Novo Record! Tempo: " + tempoTotalSegundos.toFixed(2) + "s";
  } else {
    mensagem = "Pitstop concluido em " + tempoTotalSegundos.toFixed(2) + "s";
  }

  pedidoAtual = null;
}

// Funcao Terminar Jogo por demasiados erros
function terminarJogoFalha() {
  jogoAtivo = false;
  mensagem = "Pitstop Falhou! Excedeste o numero maximo de erros (" + maxErros + "). Tenta novamente.";
  pedidoAtual = null;
}

// Funcao auxiiliar para saber se a peca esta ativa
function estaParteAtiva(nomeParte) {
  if (pedidoAtual === null) {
    return false;
  } 
  return pedidoAtual.nome === nomeParte;
}







// Funcao que desenha o Carro
function desenharCarro() {
  //centro do carro
  let cx = width / 2;
  let cy = height / 2 + 40;

  //corpo do carro
  fill(80);
  rectMode(CENTER);
  rect(cx, cy, 80, 140); //corpo principal

  //pneus
  //pneu dianteiro esquerdo (Q)
  if (estaParteAtiva("Pneu dianteiro esquerdo")) {
    fill(0, 255, 0); //verde se ativo, realca a peca ativa
  } else {
    fill(150);
  }
  rect(cx - 55, cy - 60, 20, 30);

  //pneu dianteiro direito (W)
  if (estaParteAtiva("Pneu dianteiro direito")) {
    fill(0, 255, 0);
  } else {
    fill(150);
  }   
  rect(cx + 55, cy - 60, 20, 30);

  //pneu traseiro esquerdo (A)
  if (estaParteAtiva("Pneu traseiro esquerdo")) {
    fill(0, 255, 0);
  } else {
    fill(150);
  } 
  rect(cx - 55, cy + 60, 20, 30);

  //pneu traseiro direito (S)
  if (estaParteAtiva("Pneu traseiro direito")) {
    fill(0, 255, 0);
  } else {
    fill(150);
  } 
  rect(cx + 55, cy + 60, 20, 30);

  //asa dianteira (E)
  if (estaParteAtiva("Asa dianteira")) {
    fill(0, 255, 0);
  } else {
    fill(150);
  } 
  rect(cx, cy - 90, 90, 15);

  //asa traseira (D)
  if (estaParteAtiva("Asa traseira")) {
    fill(0, 255, 0);
  } else {
    fill(150);
  }
  rect(cx, cy + 90, 70, 15);

  //voltar ao modo padrao
  rectMode(CORNER);
}








// PARTE VISUAL
function draw() {
  background(30);

  if (jogoAtivo) {

    // atualizar tempo
    tempoAtual = millis() - tempoInicio;

    // TÍTULO
    fill(255);
    textSize(24);
    textAlign(CENTER, TOP);
    text("PITSTOP EM CURSO!", width / 2, 10);

    // TEMPO ATUAL
    textSize(18);
    text("Tempo: " + (tempoAtual / 1000).toFixed(2) + "s", width / 2, 40);

    // MELHOR TEMPO
    if (melhorTempo !== null) {
      textSize(16);
      text("Melhor Tempo: " + melhorTempo.toFixed(2) + "s", width / 2, 65);
    }

    // PONTOS (ESQUERDA) E ERROS (DIREITA)
    textSize(16);
    textAlign(LEFT, TOP);
    text("Pontos: " + pontos, 20, 20);

    textAlign(RIGHT, TOP);
    text("Erros: " + erros + " / " + maxErros, width - 20, 20);

    // PEDIDO ATUAL (NO MEIO)
    if (pedidoAtual !== null) {
      textAlign(CENTER, CENTER);
      textSize(18);
      text(
        "Pressiona: " + pedidoAtual.nome + " (Tecla " + pedidoAtual.tecla + ")",
        width / 2,
        height / 2 - 80
      );
    }

    // PROGRESSO
    textSize(14);
    textAlign(CENTER, TOP);
    text(
      "Partes Concluidas: " + partesConcluidas + " / " + totalPartes,
      width / 2,
      height - 40
    );

    // FEEDBACK (ACERTO/ERRO)
    textSize(16);
    text(mensagem, width / 2, height - 50);

    // DESENHAR O CARRO
    desenharCarro();

  } else {
    // ESTADO INICIAL / PARADO
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Clique no botão 'Iniciar Pitstop' para comecar.", width / 2, height / 2);

    if (melhorTempo !== null) {
      textSize(16);
      textAlign(CENTER, TOP);
      text("Melhor Tempo: " + melhorTempo.toFixed(2) + "s", width / 2, 20);
      text("Pontos da última ronda: " + pontos, width / 2, 40);
    }
  }
}
