// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready()
// }
//
// function ready() {
//     let button;
//     let i;
//     const removeCartItemButtons = document.getElementsByClassName('btn-danger');
//     for (i = 0; i < removeCartItemButtons.length; i++) {
//         button = removeCartItemButtons[i];
//         button.addEventListener('click', removeCartItem)
//     }
//
//     const quantityInputs = document.getElementsByClassName('cart-quantity-input');
//     for (i = 0; i < quantityInputs.length; i++) {
//         const input = quantityInputs[i];
//         input.addEventListener('change', quantityChanged)
//     }
//
//     const addToCartButtons = document.getElementsByClassName('shop-item-button');
//     for (i = 0; i < addToCartButtons.length; i++) {
//         button = addToCartButtons[i];
//         button.addEventListener('click', addToCartClicked)
//     }
//
//     document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
// }
//
// function purchaseClicked() {
//     alert('Thank you for your purchase')
//     const cartItems = document.getElementsByClassName('cart-items')[0];
//     while (cartItems.hasChildNodes()) {
//         cartItems.removeChild(cartItems.firstChild)
//     }
//     updateCartTotal()
// }
//
// function removeCartItem(event) {
//     const buttonClicked = event.target;
//     buttonClicked.parentElement.parentElement.remove()
//     updateCartTotal()
// }
//
// function quantityChanged(event) {
//     const input = event.target;
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1
//     }
//     updateCartTotal()
// }
//
// function addToCartClicked(event) {
//     const button = event.target;
//     const shopItem = button.parentElement.parentElement;
//     const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
//     const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
//     const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
//     addItemToCart(title, price, imageSrc)
//     updateCartTotal()
// }
//
// function addItemToCart(title, price, imageSrc) {
//     const cartRow = document.createElement('div');
//     cartRow.classList.add('cart-row')
//     const cartItems = document.getElementsByClassName('cart-items')[0];
//     const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
//     for (let i = 0; i < cartItemNames.length; i++) {
//         if (cartItemNames[i].innerText === title) {
//             alert('This item is already added to the cart')
//             return
//         }
//     }
//     cartRow.innerHTML = `
//         <div class="cart-item cart-column">
//             <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//             <span class="cart-item-title">${title}</span>
//         </div>
//         <span class="cart-price cart-column">${price}</span>
//         <div class="cart-quantity cart-column">
//             <input class="cart-quantity-input" type="number" value="1">
//             <button class="btn btn-danger" type="button">REMOVE</button>
//         </div>`
//     cartItems.append(cartRow)
//     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
// }
//
// function cartTotal() {
//     const cartItemContainer = document.getElementsByClassName('cart-items')[0];
//     const cartRows = cartItemContainer.getElementsByClassName('cart-row');
//     let total = 0;
//     for (let i = 0; i < cartRows.length; i++) {
//         const cartRow = cartRows[i];
//         const priceElement = cartRow.getElementsByClassName('cart-price')[0];
//         const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
//         const price = parseFloat(priceElement.innerText.replace('$', ''));
//         const quantity = quantityElement.value;
//         total = total + (price * quantity)
//     }
//     total = Math.round(total * 100) / 100
//
//     return total
// }
//
// function updateCartTotal() {
//     // const cartItemContainer = document.getElementsByClassName('cart-items')[0];
//     // const cartRows = cartItemContainer.getElementsByClassName('cart-row');
//     // let total = 0;
//     // for (let i = 0; i < cartRows.length; i++) {
//     //     const cartRow = cartRows[i];
//     //     const priceElement = cartRow.getElementsByClassName('cart-price')[0];
//     //     const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
//     //     const price = parseFloat(priceElement.innerText.replace('$', ''));
//     //     const quantity = quantityElement.value;
//     //     total = total + (price * quantity)
//     // }
//     // total = Math.round(total * 100) / 100
//     document.getElementsByClassName('cart-total-price')[0].innerText = '$' + cartTotal()
// }

class Item {
    constructor(src, name, price, quantity) {
        this.src = src;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

class Cart {
    constructor(items) {
        this.items = items;
    }
}


function getCart() {
    //load the car cookie
    let cookies = decodeURIComponent(document.cookie).split(";");
    let cart_cookie = cookies[0].replace("cart=", '')

    //create a new empty Cart
    let cart = new Cart(new Array());

    // if there is saved cart data use that
    if (cart_cookie !== "") {
        cart = JSON.parse(cart_cookie);
    }

    return cart;
}

function addToCart(src, name, price, quantity) {
    let item = new Item(src, name, price, quantity);

    // get cart
    let cart = getCart();

    let in_cart = false;

    // iter over items to see if the item is already in the cart
    for(let i = 0; i< cart.items.length; i++) {
        let iter_item = cart.items[i];
        if(iter_item.name === item.name) {
            // if so we add to quantity of that item
            cart.items[i].quantity += item.quantity;
            in_cart = true;
            break;
        }
    }

    if (!in_cart) {
        // the item is not in the cart, so we add it to the cart
        cart.items.push(item);
    }

    //then we save the cart
    setCookie("cart", JSON.stringify(cart), 9999999, "/");
}

function setCookie(name, value, days, path) {
    const date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    document.cookie = name +  "=" + value + ";" + "expires=" + date.toUTCString() + ";" + ";path=" + path+";";
}

// function getCookie(name) {
//     name += "=";
//     let cookies = decodeURIComponent(document.cookie).split(";");
//
//     for(let i = 0; i< cookies.length; i++) {
//         let c = cookies[i];
//         while (c.charAt(0) === " ") {
//             c = c.substring(1);
//             if(c.indexOf(name) === 0) {
//                 return c.substring(name.length, c.length)
//             }
//         }
//     }
//     return "";
// }

function displayCart() {
    let cart = getCart();

    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row')
    const cartItems = document.getElementsByClassName('cart-items')[0];

    for (let i = 0; i < cart.items.length; i++) {
        cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${cart.items[i].src}" width="100" height="100">
            <span class="cart-item-title">${cart.items[i].name}</span>
        </div>
        <span class="cart-price cart-column">${cart.items[i].price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${cart.items[i].quantity}">
            <button class="btn btn-danger" type="button">Remove</button>
        </div>`
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    }

    updateCartTotal()
}

function updateCartTotal() {
    let cart = getCart();

    let total = 0;
    for (let i = 0; i < cart.items.length; i++) {
        let item = cart.items[i];
        total = total + (item.price * item.quantity)
    }
    total = Math.round(total * 100) / 100

    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function removeCartItem(event) {
//     const buttonClicked = event.target;
//     buttonClicked.parentElement.parentElement.remove()
//     updateCartTotal()
    updateCartTotal()
}

function quantityChanged(event) {
//     const input = event.target;
//     if (isNaN(input.value) || input.value <= 0) {
//         input.value = 1
//     }
    updateCartTotal()
}