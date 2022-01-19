let addProduct = JSON.parse(localStorage.getItem("product"));

let cartProduct = document.getElementById("cart__items");

let cartProductsArray = [];

const cartDisplay =  async () => {

    await addProduct;
      if(addProduct === null || addProduct == 0 ){
          cartProduct.textContent = "votre panier est vide";

      }else{
          for (i = 0; i < addProduct.length; i++) {
              cartProductsArray += `
              <article class="cart__item" data-id="${addProduct[i]._id}">
              <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>

              
              
              
              `


          }

      }

     
     
     
     
     

    
 

    

};

cartDisplay();