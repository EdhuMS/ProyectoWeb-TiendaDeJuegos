let todos_LosProductos = [];

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("data/productos.JSON");
        todos_LosProductos = await response.json();

        const inputBusqueda = document.getElementById("inputBusqueda");
        const resultadosBusqueda = document.getElementById("resultadosBusqueda");
        const formBusqueda = inputBusqueda.closest("form");
        const btnBuscar = formBusqueda.querySelector("button[type='submit']");

        function toggleBotonBuscar() {
            btnBuscar.disabled = inputBusqueda.value.trim().length === 0;
        }

        inputBusqueda.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            toggleBotonBuscar();

            if (query.length > 0) {
                const resultadosFiltrados = todos_LosProductos.filter(prod =>
                    prod.titulo.toLowerCase().includes(query) ||
                    prod.categorias.some(cat => cat.toLowerCase().includes(query)) ||
                    prod.descripcion_larga.toLowerCase().includes(query)
                );
                renderResultadosBusqueda(resultadosFiltrados, query);
            } else {
                resultadosBusqueda.style.display = "none";
            }
        });

        formBusqueda.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = inputBusqueda.value.trim();
            if (query) {
                window.location.href = `productos.html?q=${encodeURIComponent(query)}`;
            }
        });

        document.addEventListener("click", (e) => {
            if (!formBusqueda.contains(e.target)) {
                resultadosBusqueda.style.display = "none";
            }
        });

        toggleBotonBuscar();

    } catch (error) {
        console.error("Error al cargar los productos para la búsqueda:", error);
    }
});

function renderResultadosBusqueda(lista, query) {
    const contenedor = document.getElementById("resultadosBusqueda");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `<a href="#" class="list-group-item list-group-item-action text-center text-muted">No se encontraron resultados.</a>`;
        contenedor.style.display = "block";
        return;
    }

    const resultadosVisibles = lista.slice(0, 5);
    resultadosVisibles.forEach(prod => {
        const item = document.createElement("a");
        item.href = `detalle-producto.html?titulo=${encodeURIComponent(prod.titulo)}`;
        item.className = "list-group-item list-group-item-action d-flex align-items-center";
        item.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.titulo}" style="height: 40px; width: 40px; object-fit: cover;" class="me-3 rounded">
            <section>
                <h6 class="mb-0 text-dark">${prod.titulo}</h6>
                <small class="text-success">S/ ${prod.precio.toFixed(2)}</small>
            </section>
        `;
        contenedor.appendChild(item);
    });

    if (lista.length > 5) {
        const verMas = document.createElement("a");
        verMas.href = `productos.html?q=${encodeURIComponent(query)}`;
        verMas.className = "list-group-item list-group-item-action text-center fw-bold";
        verMas.innerHTML = `Ver más resultados (${lista.length})`;
        contenedor.appendChild(verMas);
    }

    contenedor.style.display = "block";
}