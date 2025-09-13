document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("data/productos.JSON");
        window.todosLosProductos = await response.json();

        // Sección: Ofertas de la Semana
        const productosEnOferta = todosLosProductos.filter(prod =>
            prod.categorias.includes("OFERTAS DE LA SEMANA")
        );
        if (productosEnOferta.length > 0) {
            renderOfertas(productosEnOferta, "ofertas-container");
        } else {
            document.getElementById("ofertas-container").innerHTML = `<h3 class="text-center w-100">No hay ofertas disponibles por el momento.</h3>`;
        }

        // Sección: Combos
        const productosCombo = todosLosProductos.filter(prod =>
            prod.categorias.includes("COMBOS")
        );
        if (productosCombo.length > 0) {
            renderOfertas(productosCombo, "combos-container");
        } else {
            document.getElementById("combos-container").innerHTML = `<h3 class="text-center w-100">No hay combos disponibles por el momento.</h3>`;
        }

        // Sección: Estrenos Xbox
        const productosXbox = todosLosProductos.filter(prod =>
            prod.categorias.includes("ESTRENOS XBOX")
        );
        if (productosXbox.length > 0) {
            renderOfertas(productosXbox, "estrenosXbox-container");
        } else {
            document.getElementById("estrenosXbox-container").innerHTML = `<h3 class="text-center w-100">No hay estrenos de Xbox por el momento.</h3>`;
        }

        // Sección: Proximos Lanzamientos
        const productosLanzamientos = todosLosProductos.filter(prod =>
            prod.categorias.includes("PRÓXIMOS LANZAMIENTOS")
        );
        if (productosLanzamientos.length > 0) {
            renderOfertas(productosLanzamientos, "lanzamientos-container");
        } else {
            document.getElementById("lanzamientos-container").innerHTML = `<h3 class="text-center w-100">No hay próximos lanzamientos por el momento.</h3>`;
        }

        // Sección: Tarjetas
        const productosTarjetas = todosLosProductos.filter(prod =>
            prod.categorias.includes("TARJETAS")
        );
        if (productosTarjetas.length > 0) {
            renderOfertas(productosTarjetas, "tarjetas-container");
        } else {
            document.getElementById("tarjetas-container").innerHTML = `<h3 class="text-center w-100">No hay tarjetas disponibles por el momento.</h3>`;
        }

        // Sección: Recargas
        const productosRecargas = todosLosProductos.filter(prod =>
            prod.categorias.includes("RECARGAS")
        );
        if (productosRecargas.length > 0) {
            renderOfertas(productosRecargas, "recargas-container");
        } else {
            document.getElementById("recargas-container").innerHTML = `<h3 class="text-center w-100">No hay recargas disponibles por el momento.</h3>`;
        }

        // Sección: Nuevos Lanzamientos
        const productosNuevosLanzamientos = todosLosProductos.filter(prod =>
            prod.categorias.includes("NUEVOS LANZAMIENTOS")
        );
        if (productosNuevosLanzamientos.length > 0) {
            renderOfertas(productosNuevosLanzamientos, "nuevosLanzamientos-container");
        } else {
            document.getElementById("nuevosLanzamientos-container").innerHTML = `<h3 class="text-center w-100">No hay nuevos lanzamientos disponibles por el momento.</h3>`;
        }

    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
});

function renderOfertas(lista, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";

    lista.forEach(prod => {
        const card = `
            <article class="col-8 col-md-4 col-lg-3" style="flex: 0 0 auto;">
                <section class="card h-100 shadow-sm" style="cursor: pointer;" onclick="verDetalle('${prod.titulo}')">
                    <img src="${prod.imagen}" class="card-img-top" alt="${prod.titulo}">
                    <section class="card-body">
                        <h6 class="card-title">${prod.titulo}</h6>
                    </section>
                    <section class="card-footer d-flex justify-content-between align-items-center">
                            <span class="fw-bold">S/ ${prod.precio.toFixed(2)}</span>
                            <button class="btn btn-primary rounded-circle" style="width: 36px; height: 36px; display: flex; justify-content: center; align-items: center;" onclick="event.stopPropagation(); handleAddToCartFromIndex('${prod.titulo}', this)">
                                <i class="bi bi-plus-lg fs-5"></i>
                            </button>
                    </section>
                </section>
            </article>
        `;
        contenedor.innerHTML += card;
    });
}

window.verDetalle = function(tituloProducto) {
    const tituloCodificado = encodeURIComponent(tituloProducto);
    window.location.href = `detalle-producto.html?titulo=${tituloCodificado}`;
};

window.handleAddToCartFromIndex = function(tituloProducto, buttonElement) {
    const producto = window.todosLosProductos.find(prod => prod.titulo === tituloProducto);
    if (producto) {
        const productoParaCarrito = {
            titulo: producto.titulo,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        };
        // Llama a la función global addToCart (definida en carrito.js)
        if (typeof addToCart === 'function') {
            addToCart(productoParaCarrito);
        }

        // Efecto visual de check
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