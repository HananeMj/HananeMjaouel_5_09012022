//mettre à jour localStorage: tableau => json
function setLocalStorage ( productArray ){
    localStorage.setItem("products", JSON.stringify(productArray));
 }

 //recuperer localstorage renvoyer le tableau du json stocké
 function getLocalStorage (){
    let productArray = [];
    if(localStorage.getItem("products"))
    productArray= JSON.parse(localStorage.getItem("products"));

    return productArray;
 }
