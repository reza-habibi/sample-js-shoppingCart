/* app.js */
const productsEl = document.querySelector(".products")
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");


function renderProducts() {
    products.forEach((item) => {
        productsEl.innerHTML += `
        <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src=${item.imgSrc
            } alt=${item.name
            }>
                    </div>
                    <div class="desc">
                        <h2>${item.name
            }</h2>
                        <h2><small>$</small>${item.price
            }</h2>
                        <p>
                        ${item.description
            }
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart">
                        <img src="./icons/bag-plus.png" alt="add to cart" onclick="addToCart(${item.id
            })">
                    </div>
                </div>
        </div>`
    })
}


renderProducts()

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

const addToCart = (id) => {
    if (cart.some((item) => item.id === id)) {

        changeNumberOfUnits('plus', id)
    } else {
        const item = products.find((item) => item.id === id)
        cart.push({
            ...item,
            numberOfUnits: 1
        }
        )
    }


    console.log(cart)
    updateCart()
}
function updateCart() {
    renderCartItems();
    renderSubtotal();

    localStorage.setItem("CART", JSON.stringify(cart));
}

function renderSubtotal() {
    let totalPrice = 0,
        totalItems = 0;

    cart.map((item) => {
        totalPrice += item.price * item.numberOfUnits
        totalItems += item.numberOfUnits
    })

    subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
    totalItemsInCartEl.innerHTML = totalItems;
}

function renderCartItems() {
    cartItemsEl.innerHTML = "";
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
          <div class="cart-item">
              <div class="item-info" onclick="removeItemFromCart(${item.id})">
                  <img src="${item.imgSrc}" alt="${item.name}">
                  <h4>${item.name}</h4>
              </div>
              <div class="unit-price">
                  <small>$</small>${item.price}
              </div>
              <div class="units">
                  <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                  <div class="number">${item.numberOfUnits}</div>
                  <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
              </div>
          </div>
        `;
    });
}

const removeItemFromCart = (id) => {
    cart = cart.filter((item) => item.id !== id)

    updateCart()
}


const changeNumberOfUnits = (action, id) => {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits
        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--
            } else if (action === "plus" && numberOfUnits < item.inStock) {
                numberOfUnits++
            }
        }

        return {
            ...item,
            numberOfUnits,
        };
    })

    updateCart()
}

