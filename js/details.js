import { baseUrl, productsUrl } from "./api.js";
import { getCartItems } from "./cartFunction.js";
import { createMenu } from "./menu.js";

const productContainer = document.querySelector(".product-container");
const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = productsUrl + "/" + id;

let cartItems = getCartItems();

createMenu();

async function fetchProduct() {

    try {
        const response = await fetch(url);
        const details = await response.json();

        console.log(details);

        let cssClass = "notInCart";
        let buttonText = "Add to cart";

        const doesObjectExist = cartItems.find(function(item) {
            return parseInt(item.id) === details.id;
        });

        if (doesObjectExist) {
            cssClass = "inCart";
            buttonText = "In cart";
        }

        productContainer.innerHTML = `<div>
                                    <img src=${baseUrl}${details.image.url}>
                                    <h3>${details.title}</h3>
                                    <div>Price: ${details.price}</div>
                                    <button class="${cssClass}" data-id="${details.id}">${buttonText}</button>
                                    <p>${details.description}</p>
                                    </div>`;

        const cartButton = document.querySelector(".product-container button");

        cartButton.addEventListener("click", handleClick);

        return details;

    } catch(error) {
        console.log(error);
        productContainer.innerHTML = message("error", error);
    }
}

fetchProduct().then((product) => {
    setCartItems(product);
});

let productList;

function setCartItems(product) {
    productList = product;
};

function handleClick() {
    this.classList.toggle("notInCart");
    this.classList.toggle("inCart");

    const itemId = parseInt(this.dataset.id);

    const currentCart = getCartItems();

    const productExists = currentCart.find(function(item) {
        return item.id === itemId;
    });

    const product = productList;

    if (productExists === undefined) {
        currentCart.push(product);
        saveCart(currentCart);
    } else {
        const newCart = currentCart.filter((item) => item.id !== itemId);
        saveCart(newCart);
    }

    if (this.innerHTML == "Add to cart") {
        this.innerHTML = "In cart";
    } else if (this.innerHTML == "In cart") {
        this.innerHTML = "Add to cart";
    } else {
        null
    }
}

function saveCart(items) {
    localStorage.setItem("cart-items", JSON.stringify(items));
    cartItems = items;
}