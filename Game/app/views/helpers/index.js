function checked ( atualValor, valor){
    if(atualValor === valor){
        return "checked";
    }else{
        return "";
    }    
}

module.exports = {checked}