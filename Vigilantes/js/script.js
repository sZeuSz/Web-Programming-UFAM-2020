(function () {

  const FPS = 1; 
  let gameDimensions = [1243, 960];
  let focoDimensions = [100, 130];
  let probFoco = 25;
  let reserva;
  let focos = [];
  let caveiras = [];
  let gameLoop;

  function init() {
    reserva = new Reserva();
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

  function run () {
    if (Math.random() * 100 < probFoco) {
      let foco = new FocoIncendio();
      focos.push(foco);
    }
    surge = setTimeout(SurgirCaveira, 200000/InteiroAleatorio(1,4));
  }
  function ApagarElemento() {
    var elementosTeste = document.getElementsByClassName('foco-incendio');
    var divsTeste = Array.prototype.filter.call(elementosTeste, function(elementoTeste) {
    return elementoTeste.nodeName === 'DIV';
    });
    divsTeste[0].addEventListener('click', function(e){
    var x = e.pageX; 
    var y = e.pageY;
    console.log(Yeah, baby);
    })
 }

  init();
})();
