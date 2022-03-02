let productsLocalStorageInitial = getLocalStorage();
loadAPI();
let productsLocalStorage=[];
//récupérer le prix des articles et prepare la liste des produitq à afficher
function loadAPI () {
  fetch('http://localhost:3000/api/products/')
  .then ((response) => response.json())
  .then((products) =>{
    console.log("test");
     for(let i of productsLocalStorageInitial){
       // tester 
       let productData = products.find(products => products._id ===  i._id);
       if(productData){
         const element = {
        _id: i._id,
        name: i.name,
        imageUrl: i.imageUrl,
        altTxt: i.altTxt,
        quantity: i.quantity,
        color: i.color,
        price : parseFloat(productData.price)
      };
      productsLocalStorage.push(element);}
     }; 
     cartDisplay();
     
  })
  .catch(error => console.log("Erreur : " + error));
    
  
}

//fonction affichage du panier
function cartDisplay() {
  //Si le panier est vide
  if (productsLocalStorage === null || productsLocalStorage == 0) {
    //changer le titre du panier vide
    const emptyCart = document.querySelector("h1");
    emptyCart.innerHTML = "Votre panier est vide !";
    //cacher la section cart
    const cartSection = document.querySelector(".cart");
    cartSection.style.display = "none";
  }

  //Si le localstorage contient des produits, les afficher
  if (productsLocalStorage) {
    for (let i = 0; i < productsLocalStorage.length; i++) {

      let articles = document.getElementById("cart__items");

      //Ajout de "article"
      let article = document.createElement("article");
      article.classList.add("cart__item");
      article.setAttribute("data-id", productsLocalStorage[i]._id);
      articles.appendChild(article);

      //Ajout de div img

      let divImg = document.createElement("div");
      divImg.classList.add("cart__item__img");
      article.appendChild(divImg);

      //ajout de img
      let articleImg = document.createElement("img");
      articleImg.src = productsLocalStorage[i].imageUrl;
      divImg.appendChild(articleImg);

      //Ajout de content
      let itemContent = document.createElement("div");
      itemContent.classList.add("cart__item__content");
      article.appendChild(itemContent);

      //Ajout de div description
      let description = document.createElement("div");
      description.classList.add("cart__item__content__description");
      itemContent.appendChild(description);

      //Ajout de title
      let itemTitle = document.createElement("h2");
      itemTitle.innerHTML = productsLocalStorage[i].name;
      description.appendChild(itemTitle);

      //ajout de la couleur
      let itemColor = document.createElement("p");
      itemColor.innerHTML = "couleur : " + productsLocalStorage[i].color;
      description.appendChild(itemColor);

      //ajout du prix
      let itemPrice = document.createElement("p");
      itemPrice.innerHTML =
        "prix : " + productsLocalStorage[i].price + " " + "€";
      description.appendChild(itemPrice);

      //Ajout de la div content settings
      let contentSettings = document.createElement("div");
      contentSettings.classList.add("cart__item__content__settings");
      description.appendChild(contentSettings);

      //Ajout de la div quantity
      let settingsQuantity = document.createElement("div");
      settingsQuantity.classList.add("cart__item__content__settings__quantity");
      contentSettings.appendChild(settingsQuantity);

      //Ajout quantité
      let quantityAdd = document.createElement("p");
      quantityAdd.innerHTML = "Qté : ";
      settingsQuantity.appendChild(quantityAdd);

      //Ajout de la quantité choisie
      let cartQuantity = document.createElement("input");
      cartQuantity.classList.add("itemQuantity");
      cartQuantity.type = "number";
      cartQuantity.name = "itemQuantity";
      cartQuantity.min = "1";
      cartQuantity.max = "100";
      cartQuantity.value = productsLocalStorage[i].quantity;
      settingsQuantity.appendChild(cartQuantity);

      //Ajout div delete
      let settingsDelete = document.createElement("div");
      settingsDelete.classList.add("cart__item__content__settings__delete");
      contentSettings.appendChild(settingsDelete);

      //Ajout de l'option "supprimer"
      let deleteItems = document.createElement("p");
      deleteItems.classList.add("deleteItem");
      settingsDelete.appendChild(deleteItems);
      deleteItems.innerHTML = "Supprimer";

      //supprimer les produits du panier lors du clic
      deleteItems.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();

        //iD  et couleur a supprimer
        let deletedId = productsLocalStorage[i]._id;
        let deletedColor = productsLocalStorage[i].color;

        //sélectionner la position de l'element à supprimer dans localstorage
        let index = findElementinLocalStorage(
          productsLocalStorage,
          deletedId,
          deletedColor
        );
        // supprimer l'element du localstorage
        productsLocalStorage.splice(index, 1);

        //Mise à jour du localstorage
        setLocalStorage(productsLocalStorage);
        totalDisplay(productsLocalStorage);
        //alerte de suppression du produit
        alert("Produit supprimé du panier");

        console.log(deleteItems.closest(".cart__item"));
        deleteItems.closest(".cart__item").remove();

        //rechargement de la page
        location.reload();
      });

      //Mise à jour du localstorage lors de la modification de la quantité d'articles

      function qtyUpdate() {
        //Je selectionne l'élément "itemQuantity"
        let qtyModif = document.getElementsByClassName("itemQuantity");
        for (let index = 0; index < qtyModif.length; index++) {
          qtyModif[index].addEventListener("change", (e) => {
            e.stopPropagation();
            e.preventDefault();
            // controler la quantité 
            let valid = controlQuantity(parseInt(qtyModif[index].value));
            if (valid){

              
              let newQty = parseInt(qtyModif[index].value);
              productsLocalStorage[i].quantity = newQty;

            setLocalStorage(productsLocalStorage);

           totalDisplay(productsLocalStorage);
            }
            
            
          });
        }
      }
    }

    totalDisplay(productsLocalStorage);
    qtyUpdate();
  }
}

function findElementinLocalStorage(table, id, color) {
  let index = -1;
  table.forEach((element) => {
    if (element._id == id && element.color == color)
      index = table.indexOf(element);
  });

  return index;
}

//*****************************calcul des totaux d'articles************* */

//Affichage du prix total
function totalDisplay(table) {
  let totQty = 0;
  let totPrice = 0.0;

  for (let i = 0; i < table.length; i++) {
    totQty += table[i].quantity;
    totPrice += table[i].quantity * table[i].price;
  }
  document.getElementById("totalQuantity").textContent = totQty;
  document.getElementById("totalPrice").textContent = totPrice;
}

/******************************FORMULAIRE************************** */
//Vérifcation du formulaire
//selection des inputs du formulaire
const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputAddress = document.getElementById("address");
const inputCity = document.getElementById("city");
const inputEmail = document.getElementById("email");
//variables regExp
let regexNamecity = /^[A-Za-z,.'-]+$/i;
let regexAddress = /^[0-9a-zA-Z-\s,.'ç]{3,}$/;
let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//validation du prenom selon le regExp
inputFirstName.addEventListener("change", (e) => {
  e.preventDefault();

  if (
    regexNamecity.test(inputFirstName.value) == false ||
    inputFirstName == ""
  ) {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Le prénom doit comprorter que des lettres et ne doit pas dépasser 30 caractère";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
    return true;
  }
});

//Conditions de vérification du nom
inputLastName.addEventListener("change", (e) => {
  e.preventDefault();

  if (regexNamecity.test(inputLastName.value) == false || inputLastName == "") {
    document.getElementById("lastNameErrorMsg").innerHTML =
      "Le nom doit comprorter que des lettres et ne doit pas dépasser 30 caractère";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
});

//Conditions de vérification du l'adresse
inputAddress.addEventListener("change", (e) => {
  e.preventDefault();

  if (regexAddress.test(inputAddress.value) == false || inputAddress == "") {
    document.getElementById("addressErrorMsg").innerHTML =
      "Veuillez entrer une adresse valide";
    return false;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
});

//Conditions de vérification de la ville
inputCity.addEventListener("change", (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (regexNamecity.test(inputCity.value) == false || inputCity == "") {
    document.getElementById("cityErrorMsg").innerHTML =
      "Veuillez entrer une adresse valide";
    return false;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
  }
});

//Fonction de vérification de l'email
email.addEventListener("change", (e) => {
  e.preventDefault();
  if (regexEmail.test(inputEmail.value) == false || inputEmail.value == "") {
    document.getElementById("emailErrorMsg").innerHTML =
      "Veuillez entrer un email valide !";
    return false;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
});
//Selection du bouton "commander"
const btnCommand = document.getElementById("order");

//clic sur le bouton commander et soumission du formulaire.
btnCommand.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();

   let firstName = inputFirstName.value;
   let lastName = inputLastName.value;
   let address = inputAddress.value;
   let city = inputCity.value;
   let email = inputEmail.value;

  //conditions de validations des données
  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    alert("Tous les champs sont requis !")
  }
  else if (
    regexNamecity.test(inputFirstName.value) == false ||
    regexNamecity.test(inputLastName.value) == false ||
    regexAddress.test(inputAddress.value) == false ||
    regexNamecity.test(inputCity.value) == false ||
    regexEmail.test(inputEmail.value) == false
  ) {
    alert("Veuillez remplir correctement les chapms demandés !");
    
  }else{
    sendOrder();
  }
});

//envoyer les infos dans le localstorage lors du clic
function sendOrder()  {
  //récupération des valeurs du formulaire
  const inputFormValues = {
firstName: document.getElementById("firstName").value,
lastName: document.getElementById("lastName").value,
address: document.getElementById("address").value,
city: document.getElementById("city").value,
email: document.getElementById("email").value
  }
  console.log(inputFormValues);
  //envoi vers le localstorage
  localStorage.setItem("inputFormValues", JSON.stringify(inputFormValues));
  
//les produits
let productsTab = [];
  for(let i = 0; i < productsLocalStorage.length; i++){
    productsTab.push(productsLocalStorage[i]._id);
  }
  console.log(productsTab);



  //Appel à l'API pour envoyer les données
  const options = {
    method: "POST",
    body: JSON.stringify({contact : inputFormValues, products: productsTab}),
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json",
    }
  };
fetch(`http://localhost:3000/api/products/order`, options)

    .then((response) => {
      return response.json();
      })
    .then((res) =>{
      localStorage.clear();
      document.location.href =`./confirmation.html?orderId=${res.orderId}`;
      
    })
    .catch((error) => {
      console.log(error);
      alert("Une erreur est survenue !");
    });
  

  }
 