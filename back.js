// Sidebar Toggle Script
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menu-btn");

    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open"); // Toggle sidebar
    });
});

// Initialize cart array in localStorage if not present
// Initialize cart array in localStorage if not present
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Add product to cart
// Add product to cart
// Initialize cart array in localStorage if not present
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Add product to cart
function addToCart(productName, productPrice) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        // If product exists, increase quantity
        existingProduct.quantity += 1;
    } else {
        // If product doesn't exist, add a new product with quantity 1
        const product = { name: productName, price: productPrice, quantity: 1 };
        cart.push(product);
    }

    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count on the icon
    updateCartCount();
    
    alert(`${productName} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Update the cart icon with the total items in the cart
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        // Display the total item count inside the cart icon
        cartIcon.innerHTML = `🛒 ${totalItems}`;
    }
}

// Open the cart modal
function openCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart'));

    // Clear the cart items container
    cartItemsContainer.innerHTML = '';

    // Display items in cart
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} 
                              <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsContainer.appendChild(cartItem);
    });

    cartModal.style.display = 'block';
}

// Close the cart modal
function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
}

// Remove product from cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1); // Remove the product at the given index

    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count on the icon
    updateCartCount();

    // Refresh cart display
    openCart();
}

// Call updateCartCount() when page loads to display the correct item count
updateCartCount();

// Function to filter products based on search input
function searchProducts() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();  // Get search input and convert to lowercase
    const products = document.querySelectorAll('.product'); // Select all product elements

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase(); // Get product name and convert to lowercase

        // If product name includes the search input, show it; otherwise, hide it
        if (productName.includes(searchInput)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}


// Function to handle redirection with search query in the URL
function redirectSearch() {
    const searchInput = document.getElementById('search-bar').value;
    
    // If there is a search term, update the URL without reloading the page
    if (searchInput) {
        window.history.replaceState({}, '', `?search=${searchInput}`);
    } else {
        window.history.replaceState({}, '', window.location.pathname); // Reset URL when search is empty
    }
}

// Function to filter products based on search input (for pages like product listing pages)
function searchProductsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') ? urlParams.get('search').toLowerCase() : '';

    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        
        if (productName.includes(searchQuery)) {
            product.style.display = 'block'; // Show matching product
        } else {
            product.style.display = 'none'; // Hide non-matching product
        }
    });
}

// Run the search filtering on page load if there's a search query in the URL
window.onload = searchProductsFromURL;


// script.js

// Initialize EmailJS (replace with your EmailJS user ID)
(function() {
    emailjs.init('YOUR_USER_ID'); // Replace with your EmailJS user ID
})();

// Send email on form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        name: name,
        email: email,
        message: message
    })
    .then(function(response) {
        alert('Email sent successfully!');
    }, function(error) {
        alert('Failed to send email: ' + error);
    });
});

