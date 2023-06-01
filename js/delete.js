import { baseUrl, productsUrl } from "./api.js";
import { getToken } from "./storage.js";

export function deleteButton(id) {

    const container = document.querySelector(".delete-container");

    container.innerHTML = `<button type="button" class="delete">Delete</button>`;

    const button = document.querySelector("button.delete");

    button.onclick = async function() {
        console.log(id);

        const doDelete = confirm("Are you sure you want to delete this product?");
        console.log(doDelete);

        if(doDelete) {
            const url = productsUrl + "/" + id;

            const token = getToken();
    
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            try {
                const response = await fetch(url, options);
                const json = await response.json();

                location.href = "./admin.html";
    
                console.log(json);
            }
            catch (error) {
                console.log(error);
            }
        }
    };
}