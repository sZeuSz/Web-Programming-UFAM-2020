(function () {

  const FPS = 1; 
  let gameDimensions = [(1243/2), (960/2)];
  let focoDimensions = [(100/2), (130/2)];
  let vidaDimensions = [(88/2),(56/2)];
  let devastacaoDimensions = [80];
  let devastacaoDimensions2 = [90];
  let gameOverDimensions = [(1000/2),(16/2)];
  let probFoco = 25;
  let reserva;
  let focos = [];
  let caveiras = [];
  let devastacoes = [];
  let Nvidas = [];
  let gameLoop;
  let score = 0;

  function init() {
    reserva = new Reserva();
    pontuacao = new Pontuacao();
    Criar5Arvores();
    gameLoop = setInterval(run, 1000/FPS);

  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 's') {
      focos = [];
      caveiras = [];
      arvoresVida = [];
      score = 0;
      window.location.reload();
      clearInterval(gameLoop);
      clearTimeout(surge);
      clearTimeout(desvastar);
      init();
    }
    if (e.key === 'p' ) {
      alert("jogo pausado, clique em OK para continuar");
    }
  })

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      //document.body.appendChild(this.element);
      document.getElementById("jogo").appendChild(this.element);
    }
  }

  class FocoIncendio {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "foco-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])))}px`;
      this.element.style.top = `${Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])))}px`;
      this.clicado = false;
      reserva.element.appendChild(this.element);
      
      this.element.addEventListener('click',(e) => {  
        e.target.remove();
        score+=10;
        leftPad(score,5);
        this.clicado = true;
      });
    }
    get coordenadas(){
      var coord = [];
      coord.push(this.element.style.left);
      coord.push(this.element.style.top);
      this.element.style.left = '0px';
      this.element.style.top = '0px';
      this.element.style.width = '0px';
      this.element.style.height = '0px';
      return coord;
      
    }
  }

  class DevastacaoIncendio {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "devastacao-incendio";
      this.element.style.width = `${devastacaoDimensions}px`;
      this.element.style.height = `${devastacaoDimensions}px`; 
      reserva.element.appendChild(this.element);
    }
    SwapPX (value_left, value_top) {
      this.element.style.left = value_left;
      this.element.style.top = value_top;
    }
    
  }
  class DevastacaoCaveira {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "devastacao-caveira";
      this.element.style.width = `${devastacaoDimensions2}px`;
      this.element.style.height = `${devastacaoDimensions2}px`; 
      reserva.element.appendChild(this.element);
    }
    SwapPX (value_left, value_top) {
      this.element.style.left = value_left;
      this.element.style.top = value_top;
    }
  }
  class Pontuacao {
    constructor () {
        this.element = document.createElement("div");
        this.element.className = "pontuacao";
        this.element.style.width = `${vidaDimensions[0]}px`;
        this.element.style.height = `${vidaDimensions[1]}px`;
        this.element.style.right = `${gameDimensions[0]-1175}px`;
        this.element.style.bottom =`${gameDimensions[1]-505}px`;
        this.element.appendChild(document.createTextNode("00000"));
        //document.body.appendChild(this.element);
        document.getElementById("Cabecalho").appendChild(this.element);  
      }
    }
  class Caveira {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "caveira";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])))}px`;
      this.element.style.top = `${Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])))}px`;
      this.clicado = false;
      reserva.element.appendChild(this.element);


      this.element.addEventListener('click',(e) => {  
        e.target.remove();
        score+=20;
        leftPad(score,5);
        this.clicado = true;
      });
    }
    get coordenadas () {
      var coord = [];
      coord.push(this.element.style.left);
      coord.push(this.element.style.top);
      this.element.style.left = '0px';
      this.element.style.top = '0px';
      this.element.style.width = '0px';
      this.element.style.height = '0px';
      return coord;
    }
  }
  class Vidas {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "vidas";
      this.element.style.width = `${vidaDimensions[0]}px`;
      this.element.style.height = `${vidaDimensions[1]}px`;
      this.element.style.right = `${gameDimensions[0]-440}px`;
      this.element.style.bottom =`${gameDimensions[1]-440}px`;
      //document.body.appendChild(this.element); 
      document.getElementById("Cabecalho").appendChild(this.element);      
    }
    menosUm(){
      this.element.style.height = "0px";
    }
  }
  class GameOver {
    constructor () {

      this.element = document.createElement("div");
      this.element.className = "gameOver";
      this.element.style.width = `${gameOverDimensions[0]}px`;
      this.element.style.height = `${gameOverDimensions[1]}px`;
      this.element.style.right = "50px";
      this.element.style.bottom =`${gameDimensions[1]-450}px`;
      this.element.appendChild(document.createTextNode("GAME OVER!\n"));
      this.element.appendChild(document.createTextNode("Your Score: " + score));
      reserva.element.appendChild(this.element);
      clearInterval(gameLoop);
      clearTimeout(surge);
      clearTimeout(desvastar);
    }

  }


  function devasteIncendio(){
    if (focos.length > 0) {
      var fogo = focos.shift();

      if(!fogo.clicado){

      var coord = fogo.coordenadas; 
      var devastacao = new DevastacaoIncendio();
      devastacao.SwapPX(coord[0],coord[1]);
      devastacoes.push(devastacao);
      if(Nvidas.length > 1){
        Nvidas.pop().element.style.height = '0px';
        }
      else{
        while(Nvidas.length){
          Nvidas.pop().element.style.height = '0px';
        }
        let fim = new GameOver();
        
        }
      }        
    }
  }

  function devasteCaveira () {
      if (caveiras.length > 0) {
        var caveira = caveiras.shift();

        if(!caveira.clicado){
        var coord = caveira.coordenadas; 
        var devastacao = new DevastacaoCaveira();
        devastacao.SwapPX(coord[0],coord[1]);
        devastacoes.push(devastacao);
        if(Nvidas.length > 2){
          Nvidas.pop().element.style.height = '0px';
          Nvidas.pop().element.style.height = '0px';
          }
        else{
          while(Nvidas.length){
            Nvidas.pop().element.style.height = '0px';
          }
          let fim = new GameOver();
          }
        }       
     }
  }


  function SurgirCaveira () {
      let caveira = new Caveira();
      caveiras.push(caveira);
      devastar = setTimeout(devasteCaveira, 2000/FPS);
    }

  function InteiroAleatorio (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  function leftPad (value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    
    pontuador = document.getElementsByClassName("pontuacao");
    pontuador[0].removeChild(pontuador[0].firstChild);
    pontuador[0].appendChild(document.createTextNode(Array(length).join(paddingChar || '0') + value));
  };

  function Criar5Arvores(){
    for(i = 0; i < 5; i++){
    Nvidas[i] = new Vidas();
    }
  }

  function run () {
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      focos.push(foco);
      desvastar = setTimeout(devasteIncendio, 2000/FPS);
    }
    if(Math.random() * 150 < probFoco){
      surge = setTimeout(SurgirCaveira, (24000/InteiroAleatorio(1,4))/FPS);
    }
  }

  init();
})();
