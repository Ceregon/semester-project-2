export function getCartItems() {
    const cart = localStorage.getItem("cart-items");

    if (cart === null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}