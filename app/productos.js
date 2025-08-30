let todosLosProductos = [];
let productosFiltrados = [];
const productosPorPagina = 20;
let paginaActual = 1;

function renderProductos(lista, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosDeLaPagina = lista.slice(inicio, fin);

    productosDeLaPagina.forEach(prod => {
        const card = `
            <article class="col">
                <section class="card h-100 shadow-sm">
                    <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
                    <section class="card-body">
                        <h5 class="card-title">${prod.nombre}</h5>
                        <p class="card-text small">${prod.descripcion}</p>
                    </section>
                    <section class="card-footer d-flex justify-content-between align-items-center">
                        <span class="fw-bold">S/. ${prod.precio.toFixed(2)}</span>
                        <button class="btn btn-sm btn-primary">Comprar</button>
                    </section>
                </section>
            </article>
        `;
        contenedor.innerHTML += card;
    });

    actualizarBotonesPaginacion(lista.length);
}

function actualizarBotonesPaginacion(totalProductos) {
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    
    btnAnterior.disabled = (paginaActual === 1);
    btnSiguiente.disabled = (paginaActual * productosPorPagina >= totalProductos);
}

function manejarFiltros() {
    const busqueda = document.getElementById('searchInput').value.toLowerCase();
    const categoriaFiltro = document.getElementById('filterCategory').value;
    const precioFiltro = document.getElementById('filterPrice').value;

    let listaFiltrada = todosLosProductos.filter(p => {
        const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda) || 
                                 p.descripcion.toLowerCase().includes(busqueda);
        
        let coincideCategoria = true;
        if (categoriaFiltro !== "") {
            switch (categoriaFiltro) {
                case "consolas":
                    coincideCategoria = (p.categoria === "Consolas");
                    break;
                case "juegos":
                    coincideCategoria = (p.categoria === "Juegos");
                    break;
                case "accesorios":
                    coincideCategoria = (p.categoria === "Accesorios");
                    break;
                case "ps5":
                    coincideCategoria = (p.categoria === "Juegos" && p.plataforma === "PS5");
                    break;
                case "xbox":
                    coincideCategoria = (p.categoria === "Juegos" && p.plataforma === "Xbox Series X");
                    break;
                case "switch":
                    coincideCategoria = (p.categoria === "Juegos" && p.plataforma === "Nintendo Switch");
                    break;
                case "pc":
                    coincideCategoria = (p.categoria === "Juegos" && p.plataforma === "PC");
                    break;
            }
        }
        
        return coincideBusqueda && coincideCategoria;
    });

    if (precioFiltro === "asc") {
        listaFiltrada.sort((a, b) => a.precio - b.precio);
    } else if (precioFiltro === "desc") {
        listaFiltrada.sort((a, b) => b.precio - a.precio);
    }

    productosFiltrados = listaFiltrada;
    paginaActual = 1;
    renderProductos(productosFiltrados, "seccion-productos");
}

function limpiarFiltros() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterPrice').value = '';
    manejarFiltros();
}

async function cargarProductos() {
    try {
        const response = await fetch("data/productos.JSON");
        todosLosProductos = await response.json();
        productosFiltrados = [...todosLosProductos];

        renderProductos(productosFiltrados, "seccion-productos");

        document.getElementById('filterCategory').addEventListener('change', manejarFiltros);
        document.getElementById('filterPrice').addEventListener('change', manejarFiltros);
        document.getElementById('searchInput').addEventListener('input', manejarFiltros);

        document.getElementById('btnLimpiar').addEventListener('click', limpiarFiltros);

        document.getElementById('btn-anterior').addEventListener('click', () => {
            if (paginaActual > 1) {
                paginaActual--;
                renderProductos(productosFiltrados, "seccion-productos");
            }
        });

        document.getElementById('btn-siguiente').addEventListener('click', () => {
            const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
            if (paginaActual < totalPaginas) {
                paginaActual++;
                renderProductos(productosFiltrados, "seccion-productos");
            }
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarProductos);