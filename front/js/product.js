//Je récupère les ID des produits
const idProduct = new URL(window.location.href).searchParams.get("id");
//console.log(idProduct);
let dataProduct = [];

//appel d'un produit avec fetch
const fetchItems = async () => {
  await fetch(`http://localhost:3000/api/products/${idProduct}`)
    .then((res) => res.json())
    .then((promise) => {
      dataProduct = promise;
    })
    .catch((error) => {
      alert("erreur serveur, Veuillez contacter l'administrateur du site !!");
    });
};

//Affichage de la carte produit

const itemsDisplay = async () => {
  await fetchItems();

  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${dataProduct.imageUrl}" alt="${dataProduct.altTxt}"> `;
  document.getElementById("title").textContent = `${dataProduct.name}`;
  document.getElementById(
    "description"
  ).textContent = `${dataProduct.description}`;
  document.getElementById("price").textContent = `${dataProduct.price}`;

  //Ajout d'option de couleurs

  let selectColor = document.getElementById("colors");
  dataProduct.colors.forEach((element) => {
    let option = document.createElement("option");
    option.innerText = `${element}`;
    option.value = `${element}`;
    selectColor.appendChild(option);
  });

  addBasket();
};

itemsDisplay();

//ajouter au panier

const addBasket = () => {
  let button = document.getElementById("addToCart");
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    let productQuantity = parseInt(document.getElementById("quantity").value);
    let itemColor = document.getElementById("colors").value;

   // Si la quantité et la couleur sont valide : ajouter au panier
    if(controlQuantity(productQuantity)== true && controlColor(itemColor)== true){
    
    //1/preparer un objet à ajouter
    let product = {
      _id: dataProduct._id,
      name: dataProduct.name,
      price: dataProduct.price,
      imageUrl: dataProduct.imageUrl,
      altTxt: dataProduct.altTxt,
      quantity: productQuantity,
      color: document.getElementById("colors").value,
    };
     //2/ recuperer le tableau de localstorage
    let productArray = getLocalStorage();
    //3/ Ajouter le produit prepareé dans le tableau
    addProductToLocalStorage(productArray, product);
    
   
  }
  });
  
  
};




