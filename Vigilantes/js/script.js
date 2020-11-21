(function () {

  const FPS = 1; 
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let vidaDimensions = [88,56];
  let devastacaoDimensions = [160];
  let probFoco = 25;
  let reserva;
  let focos = [];
  let caveiras = [];
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
  }

  class Devastacao{
    constructor(){
      this.element = document.createElement("div");
      this.element.className = "devastacao";
      this.element.style.width = `${devastacaoDimensions}px`;
      this.element.style.height = `${devastacaoDimensions}px`; 
      reserva.element.appendChild(this.element);
    }
    SwapPX(value_left, value_top){
      this.element.style.left = value_left;
      this.element.style.top = value_top;
    }

  }


  class Pontuacao{
    constructor(){
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


  class Caveira{
    constructor () {
      this.element = document.createElement("div");
      this.element.className = "caveira-incendio";
      this.element.style.width = `${focoDimensions[0]}px`;
      this.element.style.height = `${focoDimensions[1]}px`;
      this.element.style.left = `${Math.floor((Math.random() * (gameDimensions[0]-focoDimensions[0])))}px`;
      this.element.style.top = `${Math.floor((Math.random() * (gameDimensions[1]-focoDimensions[1])))}px`;
      this.aceso = true;      
      reserva.element.appendChild(this.element);
      
  }
}




function SurgirCaveira(){
  let caveira = new Caveira();
  caveiras.push(caveira);

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
      desvastar = setTimeout(devaste, 2000/FPS);
    }
    if(Math.random() * 150 < probFoco){
      surge = setTimeout(SurgirCaveira, 20000/InteiroAleatorio(1,4));
    }
  }

  init();
})();
