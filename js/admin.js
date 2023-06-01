import { baseUrl, productsUrl } from "./api.js";
import { createMenu } from "./menu.js";
import { getToken } from "./storage.js";

const token = getToken();

if (!token) {
    location.href = "./login.html";
}

createMenu();

async function getProducts() {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();
        console.log(products);

        const productsContainer = document.querySelector(".products-container");
        const productsTable = document.querySelector(".products-table");

        products.forEach((product) => {

             productsTable.innerHTML += `<tr>
                                         <td><a class="product" href="edit.html?id=${product.id}"><p>${product.title}</p></a></td>
                                         <td><a class="product" href="edit.html?id=${product.id}"><p>${product.price}</p></a></td>
                                         <td class="td-img"><a class="product" href="edit.html?id=${product.id}"><img src=${baseUrl}${product.image.url}></td>
                                         </tr>`;
             
        });

        return products;

    } catch (error) {
        console.log(error);
    }
};

getProducts();

const button = document.querySelector(".addNew");

button.onclick = function() {
    location.href = "./add.html";
}