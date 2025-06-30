const viewportWidth = window.innerWidth;
const leftSideMenu = document.querySelector(".left-side-menu");
const hamburgerMenu = document.querySelector(".hambi");
const closeButton = document.querySelector(".left-menu-close-button");

const largeImage = document.querySelector(".large-image");  
const smallImages = document.querySelectorAll(".small-image");
const closeButton2 = document.querySelector(".close-button");

const incrementButton = document.querySelector(".increasing-icon");
const decrementButton = document.querySelector(".decreasing-icon");


const addToCartButton = document.querySelector(".add-to-cart-button");
const cartContent = document.querySelector(".cart-content");
const cartItemsNum = document.querySelector(".cart-quantity");

const showCart = document.querySelector(".header-cart-icon");
const lightbox = document.querySelector(".lightbox");

let num = 1;
let itemCounter = 0;    
let cartItems = [];

hamburgerMenu.addEventListener("click", () => {
    if (viewportWidth < 1024) {
        leftSideMenu.style.display = "flex";
    } else {
        leftSideMenu.style.display = "none";
    }
})
hamburgerMenu.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        if (viewportWidth < 1024) {
            leftSideMenu.style.display = "flex";
        } else {
            leftSideMenu.style.display = "none";
        }
    }
})
closeButton.addEventListener("click", () => {
    leftSideMenu.style.display = "none";
})
closeButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        leftSideMenu.style.display = "none";
    }
})


largeImage.addEventListener("click", () => {
    if (viewportWidth >= 1024) {
             lightbox.style.display = "flex";
    } else
    lightbox.style.display = "none";
})

largeImage.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { 
    if (viewportWidth >= 1024) {
             lightbox.style.display = "flex";
    } else
    lightbox.style.display = "none";}
})

smallImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        num = index + 1;
        changeImage();
        lightbox.style.display = "flex";})
    

    image.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            num = index + 1;
            changeImage();
            lightbox.style.display = "flex";
        }
    })
})

closeButton2.addEventListener("click", () => {
    lightbox.style.display = "none";
})

closeButton2.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        lightbox.style.display = "none";
    }
})

const thumbImgs = [
    document.getElementById("th-1"),
    document.getElementById("th-2"),
    document.getElementById("th-3"),
    document.getElementById("th-4")
];

const largeImg = document.getElementById("large-product-image");


const prodImgUrls = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg"
];

const arrowLeft = document.getElementById("arrow-left"); 
const arrowRight = document.getElementById("arrow-right");

const mainArrowLeft = document.getElementById("main-arrow-left"); 
const mainArrowRight = document.getElementById("main-arrow-right");


thumbImgs[0].classList.add('disabled');


if (arrowLeft) arrowLeft.addEventListener("click", ()=> { setPrevious();});
if (arrowRight) arrowRight.addEventListener("click", ()=> { setNext();});

if (arrowLeft) arrowLeft.addEventListener("keydown", (e)=> { if (e.key === "Enter" || e.key === " ") { setPrevious(); }});
if (arrowRight) arrowRight.addEventListener("keydown", (e)=> { if (e.key === "Enter" || e.key === " ") { setNext(); }});

if (mainArrowLeft) mainArrowLeft.addEventListener("click", ()=> { setPrevious();});
if (mainArrowRight) mainArrowRight.addEventListener("click", ()=> { setNext();});

if (mainArrowLeft) mainArrowLeft.addEventListener("keydown", (e)=> { if (e.key === "Enter" || e.key === " ") { setPrevious(); }});
if (mainArrowRight) mainArrowRight.addEventListener("keydown", (e)=> { if (e.key === "Enter" || e.key === " ") { setNext(); }});

function changeImage() {
    largeImg.setAttribute("src", prodImgUrls[num - 1]);
    largeImage.setAttribute("src", prodImgUrls[num - 1]);
    toggleThumbsClass();
}

function setNext(){
    if (num >= 4){
        num = 1;
    }
    else { num++};
    
    changeImage();
}

function setPrevious(){
    if (num <= 1){
        num = 4;
    }
    else { num--};
    
    changeImage();
}


function clearCart() {
    cartItems = []; 
    itemCounter = 0; 
    updateCart(); 
    updateCartCounter(); 
    
}


const updateCart = () => {
    if (cartItems.length > 0) {
        
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        const product = cartItems[0]; 
        
        cartContent.innerHTML = `
        <div class="cart-title">Cart</div>
        <hr />
        <div class="cart-row">
          <img src="./images/image-product-1-thumbnail.jpg" />
          <div class="cart-text">
           <h5>${product.name}</h5>
           <p>$${product.price} x ${totalQuantity} 
           <span>
           
           $${(product.price * totalQuantity).toFixed(2)}</span></p>
           </div>
           <img src="./images/icon-delete.svg" alt="delete-icon" class="delete-icon" tabIndex="0" width="15" height="auto" />
          
         </div> 
          <button type="button" class="checkout-button">Checkout</button>
    
        `;
     
    } else {
        cartContent.innerHTML = 
        `<div class="cart-title">Cart</div>
        <hr />
        <p class="empty-cart">Your cart is empty</p>
        `;
      
    }

    const trashButton = document.querySelector(".delete-icon");
    if (trashButton) {
        trashButton.addEventListener("click", () => {
            const cartItem = trashButton.closest(".cart-row");
            if (cartItem) {
                cartItem.remove();
                clearCart();
            }
        });
        trashButton.addEventListener("keydown", (e) => {
            const cartItem = trashButton.closest(".cart-row");
            if (cartItem && (e.key === "Enter" || e.key === " ")) {
                cartItem.remove();
                clearCart();
            }
        });
    }
};


function updateCartCounter() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const isCartOpen = cartContent.style.display === "block";
    
    if (totalItems > 0 && !isCartOpen) {
  
        if (cartItemsNum) {
            cartItemsNum.style.display = "flex";
            cartItemsNum.innerHTML = `<span>${totalItems}</span>`;
        }
    } else {
        
        if (cartItemsNum) {
            cartItemsNum.style.display = "none";
            cartItemsNum.innerHTML = "";
        }
    }

    

    
}


updateCart();
updateCartCounter();  

showCart.addEventListener("click", () => {
    cartContent.style.display = cartContent.style.display === "block" ? "none" : "block";
    updateCartCounter(); }) 

showCart.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        cartContent.style.display = cartContent.style.display === "block" ? "none" : "block";
        updateCartCounter(); 
    }
});



decrementButton.addEventListener("click", () => {
    
    if (itemCounter > 0) {
        itemCounter--;
        document.querySelector(".quantity").textContent = itemCounter;
       
    }
}); 

decrementButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
       
        if (itemCounter > 0) {
            itemCounter--;
            document.querySelector(".quantity").textContent = itemCounter;
           
        }
    }
});

incrementButton.addEventListener("click", () => {
    
    itemCounter++;
    document.querySelector(".quantity").textContent = itemCounter;
    
});

incrementButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
       
        itemCounter++;
        document.querySelector(".quantity").textContent = itemCounter;
      
    }
}); 

addToCartButton.addEventListener("click", () => {
    if (itemCounter > 0) {
        const product = {
            id: 1,
            name: "Fall Limited Edition Sneakers",
            price: 125.00,
            quantity:  itemCounter,
            image: "./images/image-product-1-thumbnail.jpg"
        };
        
        cartItems.push(product);
        
        updateCart();
        updateCartCounter(); 
        itemCounter = 0;

        document.querySelector(".quantity").textContent = 0;
   
     
    }
})

addToCartButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        if (itemCounter > 0) {
            const product = {
                id: 1,
                name: "Fall Limited Edition Sneakers",
                price: 125.00,
                quantity: itemCounter,
                image: "./images/image-product-1-thumbnail.jpg"
            };
            cartItems.push(product);
            updateCart();
            updateCartCounter(); 
            itemCounter = 0; 

            document.querySelector(".quantity").textContent = itemCounter;
        }
    }
})





function toggleThumbsClass(){
    
    thumbImgs.forEach(thumb => thumb.classList.remove('disabled'));
    smallImages.forEach(thumb => thumb.classList.remove('disabled'));
    
    thumbImgs[num - 1].classList.add('disabled');
    smallImages[num - 1].classList.add('disabled');
}


thumbImgs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        num = index + 1;
        changeImage();
    });
    thumb.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            num = index + 1;
            changeImage();
        }
    });
});