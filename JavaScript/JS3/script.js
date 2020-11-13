const counter = function (value)
{
    let soma = value;
    return{
        incrementar: function ()
        {
            return ++soma;
        }
    }
}

let contador = counter(1);

console.log("Primeira chamada: " + contador.incrementar());
console.log("Segunda  chamada: " + contador.incrementar());
console.log("Terceira chamada: " + contador.incrementar());
