var tela = document.getElementById("tela"); //Referencia para a tela
var ctx = canvas.getContext("2d"); //Referencia para as propriedades 2D da tela

var raioBola = 10; //Raio da bola

//Posicao x e y da bola
var x = tela.width/2;
var y = tela.height-30;
//Aceleracao x e y da bola
var dx = 2;
var dy = -2;

//Funcao que desenha a bola
function desenharBola() {
    ctx.beginPath(); //Comeca a desenhar
    ctx.arc(x, y, 10, 0, Math.PI*2); //Desenha o circulo
    ctx.fillStyle = "#0095DD"; //Cor do circulo
    ctx.fill(); //Preenche o circulo
    ctx.closePath(); //Finaliza o circulo
}

//Funcao que desenha na tela
function desenhar() {
	ctx.clearRect(0, 0, tela.width, tela.height); //Limpa a tela
	desenharBola(); //Chama a funcao que desenha a bola
	
	//Colisões da bola com a tela
	if(x + dx > tela.width-raioBola || x + dx < raioBola) {
		dx = -dx;
	}
	if(y + dy > tela.height-raioBola || y + dy < raioBola) {
		dy = -dy;
	}

	x += dx;
	y += dy;
}

setInterval(desenhar, 10);