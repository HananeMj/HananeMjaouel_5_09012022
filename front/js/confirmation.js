//Je récupère les ID des produits
const idOrder = new URL(window.location.href).searchParams.get("orderId");
//fonction pour afficher le numéro de commande
function orderIdDisplay (){
const orderId = document.getElementById("orderId");
orderId.innerText = idOrder;
}
orderIdDisplay();
