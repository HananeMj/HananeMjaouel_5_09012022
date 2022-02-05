// fonction pour aficher le numéro de commande
function orderIdDisplay (){
const orderId = document.getElementById("orderId");
orderId.innerText = "65431343444684674 ";
}
console.log(localStorage.getItem("orderId"));
orderIdDisplay();
