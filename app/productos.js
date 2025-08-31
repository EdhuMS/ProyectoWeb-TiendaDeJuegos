let todosLosProductos = [];
let productosFiltrados = [];
const productosPorPagina = 24;
let paginaActual = 1;

function renderProductos(lista, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `<h3 class="text-center w-100">No se encontraron resultados para tu búsqueda.</h3>`;
        actualizarBotonesPaginacion(0);
        return;
    }

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosDeLaPagina = lista.slice(inicio, fin);

    productosDeLaPagina.forEach(prod => {
        const card = `
            <article class="col">
                <section class="card h-100 shadow-sm" style="cursor: pointer;" onclick="verDetalle('${prod.titulo}')">
                    <img src="${prod.imagen}" class="card-img-top" alt="${prod.titulo}">
                    <section class="card-body">
                        <h6 class="card-title">${prod.titulo}</h6>
                    </section>
                    <section class="card-footer d-flex justify-content-between align-items-center">
                        <span class="fw-bold">S/ ${prod.precio.toFixed(2)}</span>
                        <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); verDetalle('${prod.titulo}')">Comprar</button>
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
    const liAnterior = btnAnterior.parentElement;
    const liSiguiente = btnSiguiente.parentElement;

    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);
    const paginacionInfo = document.getElementById('paginacion-info');

    if (paginacionInfo) {
        paginacionInfo.textContent = `Página ${paginaActual} de ${totalPaginas}`;
        if (totalProductos === 0) {
            paginacionInfo.textContent = '';
        }
    }

    if (paginaActual === 1) {
        liAnterior.classList.add('d-none');
    } else {
        liAnterior.classList.remove('d-none');
    }

    if (paginaActual * productosPorPagina >= totalProductos) {
        liSiguiente.classList.add('d-none');
    } else {
        liSiguiente.classList.remove('d-none');
    }
}

function manejarFiltros() {
    const busqueda = document.getElementById('searchInput').value.toLowerCase();
    const precioFiltro = document.getElementById('filterPrice').value;

    let listaFiltrada = [...todosLosProductos];

    if (busqueda !== "") {
        listaFiltrada = listaFiltrada.filter(p =>
            p.titulo.toLowerCase().includes(busqueda) ||
            p.descripcion_larga.toLowerCase().includes(busqueda)
        );
    }

    let categoriaActiva = '';
    const contenedoresFiltro = document.querySelectorAll('[id$="-filters"]');
    for (const contenedor of contenedoresFiltro) {
        if (!contenedor.classList.contains('d-none')) {
            categoriaActiva = contenedor.id.replace('-filters', '');
            break;
        }
    }

    if (categoriaActiva === 'playstation') {
        const psFiltro = document.getElementById('filterPlayStation').value;
        const juegosFiltro = document.getElementById('filterJuegos').value;

        if (psFiltro !== "" || juegosFiltro !== "") {
            listaFiltrada = listaFiltrada.filter(p => {
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
                return coincideJuegos && coincidePS;
            });
        }
    } else if (categoriaActiva === 'xbox') {
        const xboxFiltro = document.getElementById('filterXbox').value;
        if (xboxFiltro !== "") {
            listaFiltrada = listaFiltrada.filter(p => {
                let coincide = false;
                switch (xboxFiltro) {
                    case "XBOX-X/S":
                        coincide = p.categorias.includes("Xbox Series X|S");
                        break;
                    case "XBOX-O":
                        coincide = p.categorias.includes("Xbox One");
                        break;
                    case "XBOX-LIVE":
                        coincide = p.categorias.includes("XBOX LIVE");
                        break;
                    case "XBOX-GAME-PASS":
                        coincide = p.categorias.includes("Xbox Game Pass Ultimate");
                        break;
                    case "XBOX-GIFT-CARDS":
                        coincide = p.categorias.includes("Xbox Gift Cards");
                        break;
                }
                return coincide;
            });
        }
    } else if (categoriaActiva === 'servicios') {
        const serviciosFiltro = document.getElementById('filterServicios').value;
        if (serviciosFiltro !== "") {
            listaFiltrada = listaFiltrada.filter(p => {
                let coincide = false;
                switch (serviciosFiltro) {
                    case "streaming":
                        coincide = p.categorias.includes("STREAMING");
                        break;
                    case "recargas":
                        coincide = p.categorias.includes("RECARGAS");
                        break;
                    case "tarjetas":
                        coincide = p.categorias.includes("TARJETAS");
                        break;
                }
                return coincide;
            });
        }
    } else if (categoriaActiva === 'ofertas') {
        const ofertasFiltro = document.getElementById('filterOfertas').value;
        if (ofertasFiltro !== "") {
            listaFiltrada = listaFiltrada.filter(p => {
                let coincide = false;
                switch (ofertasFiltro) {
                    case "ofertas-semana":
                        coincide = p.categorias.includes("OFERTAS DE LA SEMANA");
                        break;
                    case "end-of-year-PS4":
                        coincide = p.categorias.includes("END OF YEAR - PS4");
                        break;
                    case "end-of-year-PS5":
                        coincide = p.categorias.includes("END OF YEAR - PS5");
                        break;
                    case "ofertas-end-of-year":
                        coincide = p.categorias.includes("OFERTAS END OF YEAR");
                        break;
                    case "combos":
                        coincide = p.categorias.includes("COMBOS");
                        break;
                }
                return coincide;
            });
        }
    } else if (categoriaActiva === 'lanzamientos') {
        const lanzamientosFiltro = document.getElementById('filterLanzamientos').value;
        if (lanzamientosFiltro !== "") {
            listaFiltrada = listaFiltrada.filter(p => {
                let coincide = false;
                switch (lanzamientosFiltro) {
                    case "estrenosPS5":
                        coincide = p.categorias.includes("ESTRENOS PS5");
                        break;
                    case "estrenosXBOX":
                        coincide = p.categorias.includes("ESTRENOS XBOX");
                        break;
                    case "nuevosLanzamientos":
                        coincide = p.categorias.includes("NUEVOS LANZAMIENTOS");
                        break;
                    case "preOrder-PS5":
                        coincide = p.categorias.includes("PRE-ORDER PS5");
                        break;
                    case "preOrder-XBOX":
                        coincide = p.categorias.includes("PRE-ORDER XBOX");
                        break;
                    case "proximosLanzamientos":
                        coincide = p.categorias.includes("PRÓXIMOS LANZAMIENTOS");
                        break;
                }
                return coincide;
            });
        }
    }

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
    document.getElementById('filterPrice').value = '';

    const contenedoresFiltro = document.querySelectorAll('[id$="-filters"]');
    contenedoresFiltro.forEach(contenedor => {
        contenedor.classList.add('d-none');
        contenedor.querySelectorAll('select').forEach(select => select.value = '');
    });

    manejarFiltros();
}

async function cargarProductos() {
    try {
        const response = await fetch("data/productos.JSON");
        todosLosProductos = await response.json();
        productosFiltrados = [...todosLosProductos];

        renderProductos(productosFiltrados, "seccion-productos");

        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const selectoresSecundarios = document.querySelectorAll('[id^="filter"]');
                selectoresSecundarios.forEach(select => {
                    if (select.id !== 'filterPrice' && select.id !== 'searchInput') {
                        select.value = '';
                    }
                });

                document.querySelectorAll('[id$="-filters"]').forEach(el => el.classList.add('d-none'));

                const category = event.target.dataset.category;
                const filtersToShow = document.getElementById(`${category}-filters`);
                if (filtersToShow) {
                    filtersToShow.classList.remove('d-none');
                }

                manejarFiltros();
            });
        });

        document.getElementById('searchInput').addEventListener('input', manejarFiltros);
        document.getElementById('filterPrice').addEventListener('change', manejarFiltros);
        document.getElementById('btnLimpiar').addEventListener('click', limpiarFiltros);

        document.getElementById('filterJuegos').addEventListener('change', manejarFiltros);
        document.getElementById('filterPlayStation').addEventListener('change', manejarFiltros);
        document.getElementById('filterXbox').addEventListener('change', manejarFiltros);
        document.getElementById('filterServicios').addEventListener('change', manejarFiltros);
        document.getElementById('filterOfertas').addEventListener('change', manejarFiltros);
        document.getElementById('filterLanzamientos').addEventListener('change', manejarFiltros);

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

window.verDetalle = function(tituloProducto) {
    const tituloCodificado = encodeURIComponent(tituloProducto);
    window.location.href = `detalle-producto.html?titulo=${tituloCodificado}`;
};