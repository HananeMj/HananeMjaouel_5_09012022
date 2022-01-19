
let products = [];

//Appel de l'API
const fetchProducts = async () => {
 await fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => products = data)
.catch( (error) => {alert("erreur serveur, Veuillez contacter l'administrateur du site !!")});
//console.log(products);

};
// Je récupère les produits pour les afficher
const productDisplay = async () => {
     await fetchProducts();

     let html ="";

     products.forEach(item => {

        html +=` <a href="./product.html?id=${item._id}">
            <article>
              <img src="${item.imageUrl}" alt="${item.altTxt}">
              <h3 class="productName">${item.name}</h3>
              <p class="productDescription">i${item.description}</p>
            </article>
          </a>`;
     });
     document.getElementById("items").innerHTML = html;
     
    };

    productDisplay();

    