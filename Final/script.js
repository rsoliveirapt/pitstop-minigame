//Variaveis globais basicas
let jogoAtivo = false; // indica se o jogo ja comecou
let tempoInicio = 0; // guarda o momento em que o jogo comecou
let tempoAtual = 0; // tempo decorrido

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
    partesConcluidas++;

    if (partesConcluidas >= totalPartes) {
      terminarJogo();
    } else {
      gerarNovoPedido(); 
    }
  } else {
    mensagem = "Errado! Carregaste " + teclaCarregada + ", mas a certa e " + pedidoAtual.tecla + ".";
  }
}

// Funcao Terminar Jogo
function terminarJogo() {
  jogoAtivo = false;
  let tempoTotalSegundos = (millis() - tempoInicio) / 1000;
  mensagem = "Pitstop concluido em " + tempoTotalSegundos.toFixed(2) + " segundos!";
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

    if (pedidoAtual !== null) {
      textSize(18);
      textAlign(CENTER, CENTER);
      text("Pressiona: " + pedidoAtual.nome + " (Tecla " + pedidoAtual.tecla + ")", width/2, height/2); 
    }

    //motrar feedback
    textSize(16);
    text(mensagem, width/2, height - 50);

    // mostrar progresso
    textSize(14);
    text("Partes Concluidas: " + partesConcluidas + " / " + totalPartes, width/2, height - 80);

    // aqui depois vamos desenhar o carro, o pedido de tecla, etc.
    fill(255);
    textSize(24);
    textAlign(CENTER, TOP);
    text("PITSTOP EM CURSO!", width/2, 20);

    textSize(18);
    text("Tempo: " + (tempoAtual / 1000).toFixed(2) + "s", width/2, 60);

    // Desenhar o carro
    desenharCarro();
  } else {
    // estado inicial / parado
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Clique no botão 'Iniciar Pitstop' para comecar.", width/2, height/2);
  }
}