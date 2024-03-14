let products = [];
let cart = [];

// selectors

const selectors = {
    products: document.querySelector(".products"),
    cartBtn: document.querySelector(".cart-btn"),
    cartQty: document.querySelector(".cartQty"),
    cartClose: document.querySelector(".cart-close"),
    cart: document.querySelector(".cart"),
    cartOverlay: document.querySelector(".cart-overlay"),
    cartClear: document.querySelector(".cart-clear"),
    cartBody: document.querySelector(".cart-body"),
    cartTotal: document.querySelector(".cart-total"),
};

// event listeners

const setupListners = () => {
    document.addEventListener("DOMContentLoaded", initStore);




    // cart events
    selectors.cartBtn.addEventListener("click", showCart);
    selectors.cartOverlay.addEventListener("click", hideCart);
};


// event handlers

// const initStore = () => {
//     loadProducts("https://fakestoreapi.com/products")
//         .then(res => {
//             console.log(res.data); 
//         })
//         .catch(error => {
//             console.error("Error loading products:", error);
//         });
// };


const initStore = async () => {
    try {
        const products = await loadProducts("https://fakestoreapi.com/products");
        console.log(products);
        renderProducts(products);
        renderCart(products);
    } catch (error) {
        console.error("Error loading products:", error);
    }
};


const showCart = () => {
    selectors.cart.classList.add("show");
    selectors.cartOverlay.classList.add("show");
};


const hideCart = () => {
    selectors.cart.classList.remove("show");
    selectors.cartOverlay.classList.remove("show");
};


const clearCart = () => { };


const addToCart = () => {
    if (else.target.hasAttribute("data-id")) {
        const id = parseInt(e.target.dataset.id);
        const inCart = cart.find((x) => x.id === id)
    }
};


const removeFromCart = () => { };


const increaseQty = () => { };


const decreaseQty = () => { };


const updateCart = () => { };


const saveCart = () => { };


const loadCart = () => { };


// render functions

const renderCart = () => {
    // show cart qty in navbar
    const cartQty = cart.reduce((sum, item) => {
        return sum + item.qty;
    }, 0);

    selectors.cartQty.textContent = cartQty;
    selectors.cartQty.classList.toggle("visible", cartQty);

    // show cart total
    selectors.cartTotal.textContent = calculateTotal().format();

    // show empty cart
    if (cart.length === 0) {
        selectors.cartBody.innerHTML = 
            '<div class="cart-empty">Your cart is empty</div>';
            return;
    }

    // show cart items
    selectors.cartBody.innerHTML = cart.map(({ id, qty }) => {
        // get product info of each cart item
        const product = products.find((x) => x.id === id);

        const { title, image, price } = product;

        const amount = price * qty;

        return `
            <div class="cart-item" data-id="${id}">
                <img src="${image}" alt="${title}" />
                <div>
                    <h3>${title}</h3>
                    <h5>${price}</h5>
                    <div class="cart-item-amount">
                        <i class="bi bi-dash-lg" data-btn="decr"></i>
                        <span class="qty">${qty}</span>
                        <i class="bi bi-plus-lg" data-btn="incr"></i>

                        <span class="cart-item-price">
                            ${amount}
                        </span>
                    </div>
                </div>
            </div>
        `
    })
    .join("");
};


const renderProducts = () => {
    selectors.products.innerHTML = products.map((product) => {
        const { id, title, image, price } = product;

        // check if product is already in cart
        const inCart = cart.find((x) => x.id === id);

        // make the add to cart button disabled of already in cart
        const disabled =  inCart ? "disabled" : "";

        // change the text if already in cart
        const text = inCart ? "Added in Cart" : "Add to Cart";

        return `
            <div>
                <img src="${image}" alt="${title}" />
                <h3>${title}</h3>
                <h5>${price}</h5>
                <button ${disabled} data-id=${id} >${text}</button>
            </div>
        `;
    })
    .join("");
};


const loadProducts = async (apiURL) => {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`http error! status=${response.status}`);
        }

        products = await response.json();
        console.log(products);
    } catch (error) {
        console.error("fetch error:", error);
    }
};


const calculateTotal = () => { };


setupListners();