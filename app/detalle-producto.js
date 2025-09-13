let todosLosProductos = [];
let productoSeleccionado = {};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const tituloCodificado = urlParams.get('titulo');
        const tituloDecodificado = decodeURIComponent(tituloCodificado);

        if (!tituloDecodificado) {
            window.location.href = 'productos.html';
            return;
        }

        const response = await fetch("data/productos.JSON");
        todosLosProductos = await response.json();
        productoSeleccionado = todosLosProductos.find(prod => prod.titulo === tituloDecodificado);

        if (productoSeleccionado) {
            renderDetalleProducto(productoSeleccionado);
            renderSeccionesAdicionales(productoSeleccionado);
            actualizarTotal();
        } else {
            window.location.href = 'productos.html';
            return;
        }
    } catch (error) {
        console.error("Error al cargar el detalle del producto:", error);
        document.getElementById('seccion-detalle-producto').innerHTML = `<h3 class="text-center">Ocurrió un error al cargar el producto.</h3>`;
    }
});

function renderDetalleProducto(prod) {
    const contenedor = document.getElementById('seccion-detalle-producto');
    document.title = `${prod.titulo} - GamesCenter`;
    const html = `
        <section class="row d-flex align-items-center">
            <section class="col-md-6 col-lg-4 mb-3 d-flex justify-content-center">
                <img src="${prod.imagen}" class="img-fluid rounded shadow-sm" alt="${prod.titulo}" style="max-height: 500px; object-fit: contain;">
            </section>

            <section class="col-md-6 col-lg-4 col-xl-5 mb-3">
                <h2 class="fw-bold">${prod.titulo}</h2>
                <h3 class="text-success fw-bold">S/ ${prod.precio.toFixed(2)}</h3>
                <hr>
                <h5 class="fw-bold">Detalles:</h5>
                <p>${prod.descripcion_corta.replace(/\n/g, '<br>')}</p>
                <h5 class="fw-bold">Categorías:</h5>
                <p>${prod.categorias.join(', ')}</p>
            </section>

            <section class="col-lg-4 col-xl-3 mb-3">
                <section class="card p-4 shadow-sm border-0 bg-dark text-light">
                    <h5 class="fw-bold card-title mb-4 text-center">MEDIOS DE PAGO</h5>
                    <section class="bg-light mb-4 align-items-center justify-content-center d-flex p-1 rounded">
                        <img src="img/pagos-logo.png" alt="Medios de Pago" class="img-fluid">
                    </section>
                    <section class="mb-3 d-flex align-items-center justify-content-between">
                        <label for="cantidad" class="form-label mb-0 fw-bold">Cantidad:</label>
                        <section class="input-group" style="width: 120px;">
                            <button class="btn btn-warning" type="button" onclick="cambiarCantidad(-1)">-</button>
                            <input type="text" id="cantidad" class="form-control text-center" value="1" readonly>
                            <button class="btn btn-warning" type="button" onclick="cambiarCantidad(1)">+</button>
                        </section>
                    </section>
                    <hr>
                    <section class="mb-4 d-flex align-items-center justify-content-between">
                        <h5 class="fw-bold mb-0">Subtotal:</h5>
                        <h5 class="fw-bold text-success mb-0 text-warning" id="subtotal"></h5>
                    </section>
                    <section class="d-grid gap-2">
                        <button class="btn btn-primary btn-lg" onclick="handleAddToCart()">
                            <i class="bi bi-cart-plus me-2"></i>Añadir al Carrito
                        </button>
                        <button class="btn btn-success btn-lg" onclick="alert('Comprar ahora: Funcionalidad en desarrollo.')">
                            <i class="bi bi-bag-check me-2"></i>Comprar
                        </button>
                    </section>
                </section>
            </section>
        </section>
    `;
    contenedor.innerHTML = html;
}

function renderSeccionesAdicionales(prod) {
    const contenedorDescripcion = document.getElementById('seccion-descripcion-larga');
    contenedorDescripcion.innerHTML = `
        <h3 class="fw-bold">Descripción</h3>
        <p>${prod.descripcion_larga.replace(/\n/g, '<br>')}</p>
    `;

    const contenedorVideo = document.getElementById('seccion-video');
    if (prod.video && prod.video !== '(Sin video)') {
        contenedorVideo.innerHTML = `
            <h3 class="fw-bold">Video</h3>
            <section class="ratio ratio-16x9">
                <iframe src="${prod.video}" allowfullscreen></iframe>
            </section>
        `;
    } else {
        contenedorVideo.style.display = 'none';
    }

    renderProductosRelacionados(prod);
}

function renderProductosRelacionados(productoActual) {
    const contenedor = document.getElementById('contenedor-relacionados');
    contenedor.innerHTML = "";

    const productosRelacionados = todosLosProductos.filter(prod =>
        prod.titulo !== productoActual.titulo &&
        prod.categorias.some(cat => productoActual.categorias.includes(cat))
    );

    const productosAleatorios = productosRelacionados.sort(() => 0.5 - Math.random()).slice(0, 8);

    if (productosAleatorios.length > 0) {
        productosAleatorios.forEach(prod => {
            const card = `
                <article class="col-8 col-md-4 col-lg-3" style="flex: 0 0 auto;">
                    <section class="card h-100 shadow-sm" style="cursor: pointer;" onclick="verDetalle('${prod.titulo}')">
                        <img src="${prod.imagen}" class="card-img-top" alt="${prod.titulo}">
                        <section class="card-body">
                            <h6 class="card-title">${prod.titulo}</h6>
                        </section>
                        <section class="card-footer d-flex justify-content-between align-items-center">
                            <span class="fw-bold">S/ ${prod.precio.toFixed(2)}</span>
                            <button class="btn btn-primary rounded-circle" style="width: 36px; height: 36px; display: flex; justify-content: center; align-items: center;" onclick="event.stopPropagation(); handleAddToCartFromRelated('${prod.titulo}', this)">
                                <i class="bi bi-plus-lg fs-5"></i>
                            </button>
                        </section>
                    </section>
                </article>
            `;
            contenedor.innerHTML += card;
        });
    } else {
        document.getElementById('seccion-relacionados').style.display = 'none';
    }
}

window.handleAddToCartFromRelated = function(tituloProducto, buttonElement) {
    const producto = todosLosProductos.find(prod => prod.titulo === tituloProducto);
    if (producto) {
        const productoParaCarrito = {
            titulo: producto.titulo,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        };
        if (typeof addToCart === 'function') {
            addToCart(productoParaCarrito);
        }

        const originalContent = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="bi bi-check-lg fs-5"></i>';
        buttonElement.classList.remove('btn-primary');
        buttonElement.classList.add('btn-success');
        
        setTimeout(() => {
            buttonElement.innerHTML = originalContent;
            buttonElement.classList.remove('btn-success');
            buttonElement.classList.add('btn-primary');
        }, 1000);
    }
};

window.verDetalle = function(tituloProducto) {
    const tituloCodificado = encodeURIComponent(tituloProducto);
    window.location.href = `detalle-producto.html?titulo=${tituloCodificado}`;
};

window.cambiarCantidad = function(delta) {
    const cantidadInput = document.getElementById('cantidad');
    let cantidadActual = parseInt(cantidadInput.value, 10);
    let nuevaCantidad = cantidadActual + delta;

    if (nuevaCantidad < 1) {
        nuevaCantidad = 1;
    }

    cantidadInput.value = nuevaCantidad;
    actualizarTotal();
};

window.actualizarTotal = function() {
    const cantidadInput = document.getElementById('cantidad');
    const subtotalSpan = document.getElementById('subtotal');
    if (cantidadInput && subtotalSpan && productoSeleccionado) {
        const cantidad = parseInt(cantidadInput.value, 10);
        const precio = productoSeleccionado.precio;
        const total = (cantidad * precio).toFixed(2);
        subtotalSpan.textContent = `S/ ${total}`;
    }
};

window.handleAddToCart = function() {
    const cantidadInput = document.getElementById('cantidad');
    const cantidad = parseInt(cantidadInput.value, 10);
    const buttonElement = document.querySelector('#seccion-detalle-producto .btn-primary');

    if (productoSeleccionado && cantidad > 0) {
        const productoParaCarrito = {
            titulo: productoSeleccionado.titulo,
            precio: productoSeleccionado.precio,
            imagen: productoSeleccionado.imagen,
            cantidad: cantidad
        };
        addToCart(productoParaCarrito);

        const originalContent = buttonElement.innerHTML;
        const originalClasses = buttonElement.className;

        buttonElement.innerHTML = '<i class="bi bi-check-lg me-2"></i>Agregado';
        buttonElement.classList.remove('btn-primary');
        buttonElement.classList.add('btn-success');
        
        setTimeout(() => {
            buttonElement.innerHTML = originalContent;
            buttonElement.className = originalClasses;
        }, 800);
    }
};