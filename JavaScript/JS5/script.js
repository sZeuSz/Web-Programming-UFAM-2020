let raio = document.getElementById('raio');
let area = document.getElementById('area');
let circ = document.getElementById('circ');

let botao = document.getElementById('ok');

botao.onclick = () => {
    let CIRC = 2 * Math.PI * parseInt(raio.value);
    CIRC = CIRC.toFixed(2);

    let AREA = Math.PI * (parseInt(raio.value) ** 2);
    AREA = AREA.toFixed(2);

    area.value = AREA
    circ.value = CIRC
}
