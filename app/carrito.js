let carrito = [];

function getCart() {
    const cartFromStorage = localStorage.getItem('shoppingCart');
    return cartFromStorage ? JSON.parse(cartFromStorage) : [];
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(carrito));
    updateCartDisplay();
}

function addToCart(productToAdd) {
    const existingProductIndex = carrito.findIndex(item => item.titulo === productToAdd.titulo);

    if (existingProductIndex > -1) {
        carrito[existingProductIndex].cantidad += productToAdd.cantidad;
    } else {
        carrito.push(productToAdd);
    }

    saveCart();
}

function removeFromCart(productTitle) {
    carrito = carrito.filter(item => item.titulo !== productTitle);
    saveCart();
}

function changeQuantity(productTitle, delta) {
    const product = carrito.find(item => item.titulo === productTitle);
    if (product) {
        product.cantidad += delta;
        if (product.cantidad < 1) {
            removeFromCart(productTitle);
        } else {
            saveCart();
        }
    }
}

function renderCart() {
    const contenedor = document.getElementById('contenedor-items-carrito');
    contenedor.innerHTML = '';
    const totalCarrito = document.getElementById('total-carrito');

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="text-center mt-5">El carrito está vacío.</p>';
        totalCarrito.textContent = 'S/ 0.00';
        return;
    }

    let subtotal = 0;

    carrito.forEach(prod => {
        const itemTotal = prod.precio * prod.cantidad;
        subtotal += itemTotal;

        const cartItem = `
            <article class="row g-0 align-items-center mb-3 p-2 bg-secondary rounded shadow-sm">
                <figure class="col-3 m-0">
                    <img src="${prod.imagen}" class="img-fluid rounded" alt="${prod.titulo}">
                </figure>
                <section class="col-5">
                    <section class="card-body">
                        <h6 class="card-title text-truncate mb-1">${prod.titulo}</h6>
                        <small class="text-warning d-block">S/ ${(prod.precio * prod.cantidad).toFixed(2)}</small>
                    </section>
                </section>
                <section class="col-4">
                    <section class="d-flex flex-column align-items-end">
                        <section class="input-group mb-2" style="width: 100px;">
                            <button class="btn btn-warning btn-sm" onclick="changeQuantity('${prod.titulo}', -1)">-</button>
                            <input type="text" class="form-control form-control-sm text-center" value="${prod.cantidad}" readonly>
                            <button class="btn btn-warning btn-sm" onclick="changeQuantity('${prod.titulo}', 1)">+</button>
                        </section>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart('${prod.titulo}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </section>
                </section>
            </article>
        `;
        contenedor.innerHTML += cartItem;
    });

    totalCarrito.textContent = `S/ ${subtotal.toFixed(2)}`;
}

function updateCartBadge() {
    const botonCarrito = document.getElementById('boton-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

    if (totalItems > 0) {
        botonCarrito.classList.remove('d-none');
        contadorCarrito.textContent = totalItems;
    } else {
        botonCarrito.classList.add('d-none');
    }
}

function updateCartDisplay() {
    renderCart();
    updateCartBadge();
}

document.addEventListener("DOMContentLoaded", () => {
    carrito = getCart();
    updateCartDisplay();
});