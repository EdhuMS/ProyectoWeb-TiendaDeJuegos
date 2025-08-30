let todosLosProductos = [];
let productosFiltrados = [];
const productosPorPagina = 16;
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
                    <img src="${prod.imagen}" class="card-img-top" alt="${prod.titulo}">
                    <section class="card-body">
                        <h5 class="card-title">${prod.titulo}</h5>
                    </section>
                    <section class="card-footer d-flex justify-content-between align-items-center">
                        <span class="fw-bold">S/ ${prod.precio.toFixed(2)}</span>
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
    const juegosFiltro = document.getElementById('filterJuegos').value;
    const precioFiltro = document.getElementById('filterPrice').value;
    const psFiltro = document.getElementById('filterPlayStation').value;
    const xboxFiltro = document.getElementById('filterXbox').value;
    const serviciosFiltro = document.getElementById('filterServicios').value;
    const ofertasFiltro = document.getElementById('filterOfertas').value;
    const lanzamientosFiltro = document.getElementById('filterLanzamientos').value;

    let listaFiltrada = todosLosProductos.filter(p => {
        const coincideBusqueda = p.titulo.toLowerCase().includes(busqueda) ||
            p.descripcion_larga.toLowerCase().includes(busqueda);

        let coincideJuegos = true;
        if (juegosFiltro !== "") {
            switch (juegosFiltro) {
                case "accion":
                    coincideJuegos = p.categorias.includes("ACCIÓN");
                    break;
                case "aventura":
                    coincideJuegos = p.categorias.includes("AVENTURA");
                    break;
                case "arcade":
                    coincideJuegos = p.categorias.includes("ARCADE");
                    break;
                case "conduccion-carreras":
                    coincideJuegos = p.categorias.includes("CONDUCCIÓN y CARRERAS");
                    break;
                case "deportes":
                    coincideJuegos = p.categorias.includes("DEPORTES");
                    break;
                case "ingenio":
                    coincideJuegos = p.categorias.includes("INGENIO");
                    break;
                case "pelea":
                    coincideJuegos = p.categorias.includes("LUCHA / PELEA");
                    break;
                case "plataforma":
                    coincideJuegos = p.categorias.includes("PLATAFORMA");
                    break;
                case "shooter":
                    coincideJuegos = p.categorias.includes("SHOOTER");
                    break;
                case "terror":
                    coincideJuegos = p.categorias.includes("TERROR");
                    break;
                case "unico":
                    coincideJuegos = p.categorias.includes("ÚNICO");
                    break;
                case "retro":
                    coincideJuegos = p.categorias.includes("CLÁSICO / RETRO");
                    break;
                case "VR":
                    coincideJuegos = p.categorias.includes("JUEGOS VR");
                    break;
                case "multijugador":
                    coincideJuegos = p.categorias.includes("MULTIJUGADOR LOCAL / PANTALLA DIVIDIDA");
                    break;
                case "retrocompatible":
                    coincideJuegos = p.categorias.includes("RETROCOMPATIBLE");
                    break;
            }
        }

        let coincidePS = true;
        if (psFiltro !== "") {
            switch (psFiltro) {
                case "PS5":
                    coincidePS = p.categorias.includes("PlayStation 5") || p.categorias.includes("PLAYSTATION 5");
                    break;
                case "PS4":
                    coincidePS = p.categorias.includes("PlayStation 4") || p.categorias.includes("PLAYSTATION 4");
                    break;
                case "PS3":
                    coincidePS = p.categorias.includes("PLAYSTATION 3");
                    break;
                case "DELUXE":
                    coincidePS = p.categorias.includes("Extra | Deluxe | Premium");
                    break;
                case "PS-PLUS":
                    coincidePS = p.categorias.includes("PS Plus | PlayStation Plus");
                    break;
                case "PS-STORE":
                    coincidePS = p.categorias.includes("PS Store | PlayStation Store");
                    break;
                case "PS-CARDS":
                    coincidePS = p.categorias.includes("PSN Cards - PlayStation");
                    break;
            }
        }

        let coincideXBOX = true;
        if (xboxFiltro !== "") {
            switch (xboxFiltro) {
                case "XBOX-X/S":
                    coincideXBOX = p.categorias.includes("Xbox Series X|S");
                    break;
                case "XBOX-O":
                    coincideXBOX = p.categorias.includes("Xbox One");
                    break;
                case "XBOX-LIVE":
                    coincideXBOX = p.categorias.includes("XBOX LIVE");
                    break;
                case "XBOX-GAME-PASS":
                    coincideXBOX = p.categorias.includes("Xbox Game Pass Ultimate");
                    break;
                case "XBOX-GIFT-CARDS":
                    coincideXBOX = p.categorias.includes("Xbox Gift Cards");
                    break;
            }
        }

        let coincideServicios = true;
        if (serviciosFiltro !== "") {
            switch (serviciosFiltro) {
                case "streaming":
                    coincideServicios = p.categorias.includes("STREAMING");
                    break;
                case "recargas":
                    coincideServicios = p.categorias.includes("RECARGAS");
                    break;
                case "tarjetas":
                    coincideServicios = p.categorias.includes("TARJETAS");
                    break;
            }
        }

        let coincideOfertas = true;
        if (ofertasFiltro !== "") {
            switch (ofertasFiltro) {
                case "ofertas-semana":
                    coincideOfertas = p.categorias.includes("OFERTAS DE LA SEMANA");
                    break;
                case "end-of-year-PS4":
                    coincideOfertas = p.categorias.includes("END OF YEAR - PS4");
                    break;
                case "end-of-year-PS5":
                    coincideOfertas = p.categorias.includes("END OF YEAR - PS5");
                    break;
                case "ofertas-end-of-year":
                    coincideOfertas = p.categorias.includes("OFERTAS END OF YEAR");
                    break;
                case "combos":
                    coincideOfertas = p.categorias.includes("COMBOS");
                    break;
            }
        }

        let coincideLanzamientos = true;
        if (lanzamientosFiltro !== "") {
            switch (lanzamientosFiltro) {
                case "estrenosPS5":
                    coincideLanzamientos = p.categorias.includes("ESTRENOS PS5");
                    break;
                case "estrenosXBOX":
                    coincideLanzamientos = p.categorias.includes("ESTRENOS XBOX");
                    break;
                case "nuevosLanzamientos":
                    coincideLanzamientos = p.categorias.includes("NUEVOS LANZAMIENTOS");
                    break;
                case "preOrder-PS5":
                    coincideLanzamientos = p.categorias.includes("PRE-ORDER PS5");
                    break;
                case "preOrder-XBOX":
                    coincideLanzamientos = p.categorias.includes("PRE-ORDER XBOX");
                    break;
                case "proximosLanzamientos":
                    coincideLanzamientos = p.categorias.includes("PRÓXIMOS LANZAMIENTOS");
                    break;
            }
        }

        return coincideBusqueda && coincideJuegos && coincidePS && coincideXBOX && coincideServicios && coincideOfertas && coincideLanzamientos;
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
    document.getElementById('filterJuegos').value = '';
    document.getElementById('filterPrice').value = '';
    document.getElementById('filterPlayStation').value = '';
    document.getElementById('filterXbox').value = '';
    document.getElementById('filterServicios').value = '';
    document.getElementById('filterOfertas').value = '';
    document.getElementById('filterLanzamientos').value = '';
    manejarFiltros();
}

async function cargarProductos() {
    try {
        const response = await fetch("data/productos.JSON");
        todosLosProductos = await response.json();
        productosFiltrados = [...todosLosProductos];

        renderProductos(productosFiltrados, "seccion-productos");

        document.getElementById('filterJuegos').addEventListener('change', manejarFiltros);
        document.getElementById('filterPlayStation').addEventListener('change', manejarFiltros);
        document.getElementById('filterXbox').addEventListener('change', manejarFiltros);
        document.getElementById('filterServicios').addEventListener('change', manejarFiltros);
        document.getElementById('filterOfertas').addEventListener('change', manejarFiltros);
        document.getElementById('filterLanzamientos').addEventListener('change', manejarFiltros);
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