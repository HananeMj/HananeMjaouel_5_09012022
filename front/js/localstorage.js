//mettre à jour localStorage: tableau => json
function setLocalStorage(productArray) {
  localStorage.setItem("products", JSON.stringify(productArray));
}

//recuperer localstorage renvoyer le tableau du json stocké
function getLocalStorage() {
  let productArray = [];
  if (localStorage.getItem("products")) {
    productArray = JSON.parse(localStorage.getItem("products"));
  }
  return productArray;
}

function addProductToLocalStorage(productArray, product) {

  let isExist = false;
  for (i = 0; i < productArray.length; i++) {
    if (productArray[i]._id == product._id && productArray[i].color == product.color) {
      let qteTotal = productArray[i].quantity + product.quantity;
      let valid = controlQuantity(qteTotal, chooseColor);
      let chooseColor =productArray[i].color + product.color;

      if (valid) {
        productArray[i].quantity = qteTotal;
        productArray[i].color = chooseColor;
      }
      isExist = true;
    }
  }
  if (isExist == false) {
    // Ajouter l'element dans le tableau
    productArray.push(product);
  }
}

//verification de la quantité de produit dans le panier
function controlQuantity(productQuantity) {
  if (productQuantity > 0 && productQuantity < 100) {
    return true;
  } else {
    alert("Veuillez choisir une quantité entre 1 et 100 !");
    return false;
  }
}

//vérification de la couleur choisie pour le produit à ajouter
function controlColor(itemColor, chooseColor) {
  if (itemColor != "") {
    return true;
  } else if(itemColor == ""){
    alert("Veuillez choisir une couleur !");
    return false;
  }
};


