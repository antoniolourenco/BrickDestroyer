var tela = document.getElementById("tela"); //Referencia para a tela
var ctx = tela.getContext("2d"); //Referencia para as propriedades 2D da tela

var raioBola = 10; //Raio da bola

//Posicao x e y da bola
var x = tela.width/2;
var y = tela.height-30;

//Aceleracao x e y da bola
var dx = 2;
var dy = -2;

//Propriedades da base
var baseAltura = 10;
var baseLargura = 75;
var baseX = (tela.width-baseLargura)/2;

//Guarda se o utilizador está a clicar numa tecla
var setaDireita = false;
var setaEsquerda = false;

//Adiciona event listeners às teclas pressionadas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Verifica se parou de clicar numa tecla
function keyDownHandler(e) {
	if(e.keyCode == 39) {
		setaDireita= true;
	}
	else if(e.keyCode == 37) {
		setaEsquerda= true;
	 }
}
//Verifica se comecou a clicar em alguma tecla
function keyUpHandler(e) {
	if(e.keyCode == 39) {
		setaDireita= false;
	}
	else if(e.keyCode == 37) {
		setaEsquerda= false;
	}
}

//Funcao que desenha a bola
function desenharBola() {
    ctx.beginPath(); //Comeca a desenhar
    ctx.arc(x, y, raioBola, 0, Math.PI*2); //Desenha o circulo
    ctx.fillStyle = "#0095DD"; //Cor do circulo
    ctx.fill(); //Preenche o circulo
    ctx.closePath(); //Finaliza o circulo
}

//Funcao que desenha a base
function desenharBase() {
	ctx.beginPath();
	ctx.rect(baseX, tela.height-baseAltura, baseLargura, baseAltura);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

//Funcao que desenha na tela
function desenhar() {
	ctx.clearRect(0, 0, tela.width, tela.height); //Limpa a tela
	desenharBola(); //Chama a funcao que desenha a bola
	desenharBase(); //Chama a funcao que desenha a base

//Colisões da bola com a tela
	if(x + dx > tela.width-raioBola || x + dx < raioBola) {
		dx = -dx;
	}
	if(y + dy < raioBola){
		dy = -dy;
	}

	//Colisão bola com a base
	else if(y + dy > tela.height-raioBola) {
		if(x > baseX && x < baseX+ baseLargura) {
			dy = -dy;
		}
		//Caso nao apanhe a bola
		else {
			clearInterval(game); //Acaba o jogo
			alert("Perdeste! Tenta novamente e tens um presente"); //Mensagem
			document.location.reload();
		}
	}

	//Move a base
	if(setaDireita && baseX < tela.width-baseLargura) {
		baseX += 7;
	}
	else if(setaEsquerda && baseX > 0) {
		baseX -= 7;
	}
	
	//Move a bola
	x += dx;
	y += dy;
}

var game = setInterval(desenhar, 10); //Desenha na tela a cada 10 ms
