import { getCartItems } from "./cartFunction.js";
import { baseUrl } from "./api.js";
import {createMenu} from "./menu.js";

let cartItems = getCartItems();

let total = 0;

const cartContainer = document.querySelector(".cart-container");

const cartTotal = document.querySelector(".cart-total");

const cartTable = document.querySelector(".cart-table");

createMenu();

if (cartItems.length === 0) {
    cartContainer.innerHTML = "Your cart is empty";
} else {

    cartItems.forEach((cartItem) => {
        total += cartItem.price;
    
        cartTable.innerHTML += `<tr class="cartProduct">
                                    
                                    <td class="td-img"><a href="details.html?id=${cartItem.id}"><img src=${baseUrl}${cartItem.image.url}></a></td>
                                    <td><a href="details.html?id=${cartItem.id}"><div class="title">${cartItem.title}</div></a></td>
                                    <td><a href="details.html?id=${cartItem.id}"><div>${cartItem.price}</div></a></td>
                                    </tr>`;
    });

    cartTotal.innerHTML = `<p>Total price: ${total}</p>`;
};

console.log(total);

