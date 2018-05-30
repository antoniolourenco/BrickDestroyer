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

//Propriedades dos tijolos
var numLinhasTijolos = 5;
var numColunasTijolos = 3;
var larguraTijolos = 75;
var alturaTijolos = 20;
var paddingTijolos = 10;
var distanciaTijolosTopo = 30;
var distanciaTijolosEsquerda = 30;

var pontuacao = 0; //Guarda a pontuacao
var vidas = 3; //Guarda as vidas

var tijolos = []; //Guarda a posicao dos tijolos

//Coloca os tijolos dentro de um conjunto sem propriedades
for(var c=0; c<numColunasTijolos; c++) {
	tijolos[c] = [];
	for(var r=0; r<numLinhasTijolos; r++) {
		tijolos[c][r] = { x: 0, y: 0 , estado: 1 };
	}
}

//Adiciona event listeners às teclas pressionadas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Adiciona um event listener ao movimento do rato
document.addEventListener("mousemove", mouseMoveHandler, false);

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

//Funcao que trata do movimento da base com o rato
function mouseMoveHandler(e) {
	var relativoX = e.clientX - tela.offsetLeft;
	
	//Caso o rato esteja na tela
	if(relativoX > 0 && relativoX < tela.width) {
		baseX = relativoX - baseLargura/2;
	}
}

//Trata das colisoes entre a bola e os tijolos
function detetorColisoes() {
	
	//Loop pela posicao de todos os tijolos
	for(var c=0; c<numColunasTijolos; c++) {
		for(var r=0; r<numLinhasTijolos; r++) {
			var b = tijolos[c][r];
			
			//Caso nao o tijolo nao esteja destruido
			if(b.estado == 1) {
				
				//Caso colida com um tijolo
				if(x > b.x && x < b.x+larguraTijolos && y > b.y && y < b.y+alturaTijolos) {
					dy = -dy;
					b.estado = 0;
					pontuacao++;
					
					//Caso destrua todos os tijolos
                    if(pontuacao == numLinhasTijolos*numColunasTijolos) {
                        alert("GANHASTE! Um presente!");
                        document.location.reload();
                    }

				}
			}
		}
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

//Funcao que desenha os tijolos 
function desenharTijolos() {
	
	//Loop pela posicao de todos os tijolos
	for(var c=0; c<numColunasTijolos; c++) {
		for(var r=0; r<numLinhasTijolos; r++) {
			
			//Apenas desenha caso o tijolo nao esteja destruido
			if(tijolos[c][r].estado == 1) {
				var tijoloX = (r*(larguraTijolos+paddingTijolos))+distanciaTijolosEsquerda;
				var tijoloY = (c*(alturaTijolos+paddingTijolos))+distanciaTijolosTopo;
				tijolos[c][r].x = tijoloX;
				tijolos[c][r].y = tijoloY;
				ctx.beginPath();
				ctx.rect(tijoloX, tijoloY, larguraTijolos, alturaTijolos);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

//Funcao que desenha a pontuacao
function desenharPontuacao() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Pontuação: "+pontuacao, 8, 20);
}

//Funcao que desenha a pontuacao
function desenharPontuacao() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Vidas: "+vidas, tela.width-65, 20);
}

//Funcao que desenha na tela
function desenhar() {
	ctx.clearRect(0, 0, tela.width, tela.height); //Limpa a tela
	desenharBola(); //Chama a funcao que desenha a bola
	desenharBase(); //Chama a funcao que desenha a base
	desenharTijolos(); //Chama a funcao que desenha os tijolos
	desenharPontuacao() //Atualiza a pontuacao
	detetorColisoes() //Trata das colisoes bola/tijolo

	//Colisões da bola com a tela
	if(x + dx > tela.width-raioBola || x + dx < raioBola) {
		dx = -dx;
	}
	if(y + dy < raioBola){
		dy = -dy;
	}

	//Colisão bola com a base
	else if(y + dy > tela.height-raioBola) {
		
		//Caso a bola toque na base
		if(x > baseX && x < baseX+ baseLargura) {
			dy = -dy;
		}
		
		//Caso nao apanhe a bola
		else {
			vidas--; //Diminui o numero de vidas
			
			//Caso nao tenha mais vidas
			if(!vidas) {
				alert("Perdeste! Não recebes um presente");
				document.location.reload();
			}
			
			//Reset da posicao da bola
			else {
				x = tela.width/2;
				y = tela.height-30;
				dx = 2;
				dy = -2;
				baseX = (tela.width-baseLargura)/2;
			}
		}
	}

	//Move a base com o teclado
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
