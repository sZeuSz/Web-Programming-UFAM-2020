function random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let estado = true;
let pontos = 0;


while(estado)
{
	console.log("Escolha sua jogada: ");
	console.log("1 - Papel");
	console.log("2 - Pedra");
	console.log("3 - Tesoura");
	let jogada = parseInt(prompt());
	let r = random(1,3);
	let string = "O computador jogou: "

	if(r == 1) string += "Papel";
	if(r == 2) string += "Pedra";
	if(r == 3) string += "Tesoura";

	console.log(string);

	if(r == jogada)
		{
			console.log("A rodada empatou");
		}
	else if((jogada == 1 && r == 2) || (jogada == 2 && r == 3) || (jogada == 3 && r == 1))
		{
			console.log("Você ganhou!");
			pontos++;
		}
	else if((jogada == 1 && r == 3) || (jogada == 2 && r == 1) || (jogada == 3 && r == 2))
		{
			console.log("Você perdeu! A sua pontuação foi de "+pontos);
			estado = false;
		}
	else
		{
			console.log("Opção Inválida, você perdeu!");
			estado = false;
		}
}

