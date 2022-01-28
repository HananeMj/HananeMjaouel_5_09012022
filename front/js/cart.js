let productsLocalStorage = JSON.parse(localStorage.getItem("products"));
console.log(productsLocalStorage);
//récuperer les infos sur les produits du panier

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
      itemColor.innerHTML = productsLocalStorage[i].color;

      //ajout du prix
      let itemPrice = document.createElement("p");
      itemPrice.innerHTML = productsLocalStorage[i].price + " " + "€";
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
        e.preventDefault;

        //iD a supprimer
        let deletedId = productsLocalStorage[i]._id;

        //couleur a supprimer
        let deletedColor = productsLocalStorage[i].color;

        //sélectionner les elements à supprimer avec la méthode filter
        productsLocalStorage = productsLocalStorage.filter(
          (el) => el._id !== deletedId || el.color !== deletedColor
        );
        //console.log(productsLocalStorage);

        //Mise à jour du localstorage
        //transformer en format Json et l'envoyer dans le localstorage
        localStorage.setItem("products", JSON.stringify(productsLocalStorage));

        //alerte de suppression du produit
        alert("Produit supprimé du panier");
        //rechargement de la page
        location.reload();
      });
    }
  }
}

cartDisplay();

//fonction de calcul du prix total des articles

//fonction de modification de quantités d'articles