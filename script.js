// Script to handle the carousel auto-slide
$(document).ready(function () {
    $('.carousel').carousel({
        interval: 3000 // Auto-slide every 3 seconds
    });
});

// Script to handle "Add to Cart" button functionality
let cart = [];

function addToCart(productName, price) {
    // Check if product already exists in the cart
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        // Increment quantity if product exists
        cart[productIndex].quantity += 1;
    } else {
        // Add new product to the cart
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCartCount();
    alert(`${productName} has been added to your cart!`);
}

// Function to update cart count in the navbar
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

// Script to remove an item from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartCount();
    renderCartItems(); // Update the cart page UI
    alert(`${productName} has been removed from your cart.`);
}

// Script to render cart items dynamically on the cart page
function renderCartItems() {
    const cartTable = document.querySelector('#cart-items');
    cartTable.innerHTML = ''; // Clear existing items
    let totalPrice = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;
        cartTable.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.querySelector('#total-price').textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Simulate a checkout process
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Please add items before checking out.');
        return;
    }

    alert('Thank you for your purchase!');
    cart = []; // Clear the cart
    updateCartCount();
    renderCartItems(); // Clear cart UI
}
