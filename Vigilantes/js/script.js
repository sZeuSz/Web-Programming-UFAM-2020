(function () {

  const FPS = 1; 
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let vidaDimensions = [88,56];
  let devastacaoDimensions = [160];
  let devastacaoDimensions2 = [180];
  let probFoco = 25;
  let reserva;
  let focos = [];
  let caveiras = [];
  let devastacoes = [];
  let gameLoop;
  let score = 0;

  function init() {
    reserva = new Reserva();
    pontuacao = new Pontuacao();
    gameLoop = setInterval(run, 1000/FPS);
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === 'o') {
      clearInterval(gameLoop);
    }
  })

  class Reserva {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "reserva";
      this.element.style.width = `${gameDimensions[0]}px`;
      this.element.style.height = `${gameDimensions[1]}px`;
      document.body.appendChild(this.element);
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
      reserva.element.appendChild(this.element);

      /*Next tentive*/
      this.element.addEventListener('click',(e) => {  
        e.target.remove();
        score+=10;
        leftPad(score,5);
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
        this.element.style.right = `${gameDimensions[0]-593}px`;
        this.element.style.bottom =`${gameDimensions[1]-440}px`;
        this.element.appendChild(document.createTextNode("00000"));
        document.body.appendChild(this.element);
      }
    }
  class Caveira {
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "caveira-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])))}px`;
      this.element.style.top = `${Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])))}px`;
      reserva.element.appendChild(this.element);

      /*Next tentative*/
      this.element.addEventListener('click',(e) => {  
        e.target.remove();
        score+=20;
        leftPad(score,5);
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


  function devasteIncendio(){
    if (focos.length > 0) {
      var fogo = focos.shift();
      var coord = fogo.coordenadas; 
      var devastacao = new DevastacaoIncendio();
      devastacao.SwapPX(coord[0],coord[1]);
      devastacoes.push(devastacao);        
      }
    }
  function devasteCaveira () {
      if (caveiras.length > 0) {
        var caveira = caveiras.shift();
        var coord = caveira.coordenadas; 
        var devastacao = new DevastacaoCaveira();
        devastacao.SwapPX(coord[0],coord[1]);
        devastacoes.push(devastacao);        
        }
      }


  function SurgirCaveira () {
      let caveira = new Caveira();
      caveiras.push(caveira);
      devastar = setTimeout(devasteCaveira, 2000/FPS);
    }

function InteiroAleatorio(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function leftPad(value, totalWidth, paddingChar) {
  var length = totalWidth - value.toString().length + 1;
  
  pontuador = document.getElementsByClassName("pontuacao");
  pontuador[0].removeChild(pontuador[0].firstChild);
  pontuador[0].appendChild(document.createTextNode(Array(length).join(paddingChar || '0') + value));
};

  function run () {
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      focos.push(foco);
      desvastar = setTimeout(devasteIncendio, 2000/FPS);
    }
    if(Math.random() * 150 < probFoco){
      surge = setTimeout(SurgirCaveira, 24000/InteiroAleatorio(1,4));
    }
  }

  init();
})();
