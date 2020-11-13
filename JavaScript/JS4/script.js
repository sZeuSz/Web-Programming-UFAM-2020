class IntegerSet {

    constructor(value){
        this.numeros = [];
        for (var i = 0; i <= value; i++) {
            this.numeros.push(false);
        }
    }
    /*get lista(){
        return this.numeros;
    }*/
    
    Inserir(num){
        this.numeros[num] = true;
    }
    
    Excluir(num){
        if (this.numeros[num] === true){
               this.numeros[num] = false;
            }
        
    }
    

    Union(b){
        let tam = 0;
        let a = this.numeros.slice();

        for (var i =0; i < a.length;i++){
            if(b[i] && a[i])
            {
                tam++;
            }
        }

        let z = new IntegerSet(a.length + b.length - tam);
        
        for (var i =0; i<a.length;i++){
            if (a[i]){
                z.numeros[i] = a[i];
                }
        }
        for (var i =0; i<b.length;i++){
            if (b[i]){
                z.numeros[i] = b[i];
                }
        }
        return z;
        
    }
    
    Intersection(b){
        let a = this.numeros.slice();
        let tam = Math.min(a.length,b.length);
        let z = new IntegerSet(tam-1);

        for (var i =0; i < tam;i++){
            if (a[i] && b[i]){
                z.numeros[i] = a[i];
                }
        }
        return z;

    }

    Difference(b){
        let a = this.numeros.slice();
        let tam = Math.max(a.length,b.length);

        let z = new IntegerSet(tam);

        for (var i =0; i<a.length;i++){
            if(!b[i] && a[i])
            {
                z.numeros[i] = a[i];
            }
        }

        return z;
    }

    Conversion(){
        let a = this.numeros.slice();
        let z = "";

        for (var i =0; i<a.length;i++){
            if(a[i])
            {
                z+=i;
            }
        }


        return z;
    }
    
}
//Conjunto de booleanos que pode armazenar os números de 0 a 5
let a = new IntegerSet(5);
//Conjunto de booleanos que pode armazenar os números de 0 a 8
let b = new IntegerSet(8);

a.Inserir(1);
a.Inserir(2);
a.Inserir(3);
a.Inserir(4);
a.Inserir(5);
a.Inserir(0);


b.Inserir(4);
b.Inserir(5);
b.Inserir(6);
b.Inserir(7);
b.Inserir(8);
b.Inserir(0);

//Resultado esperado: 0, 1, 2, 3, 4, 5
console.log(">>Conjunto A (sem exclusão)<<");
console.log(a.numeros);
//Resultado esperado: 0, 4, 5, 6, 7, 8
console.log(">>Conjunto B (Sem exclusão)<<");
console.log(b.numeros);

a.Excluir(0);
b.Excluir(0);

//Resultado esperado: 1, 2, 3, 4 ,5
console.log(">>Conjunto A (com exclusão<<");
console.log(a.numeros);

//Resultado esperado: 4, 5, 6, 7, 8
console.log(">>Conjunto B (com exclusão<<");
console.log(b.numeros);

//Resultado esperado da União: 1, 2, 3, 4, 5, 6, 7, 8
console.log(">>Union<<");
console.log(a.Union(b.numeros).numeros);

//Resultado esperado da Interseção: 4, 5
console.log(">>Intersection<<");
console.log(a.Intersection(b.numeros).numeros);

//Resultado esperado da Diferença: 1, 2, 3
console.log(">>Difference<<");
console.log(a.Difference(b.numeros).numeros);

//Resultado esperado da Conversão: 12345
console.log(">>Conversion<<")
console.log(a.Conversion());
