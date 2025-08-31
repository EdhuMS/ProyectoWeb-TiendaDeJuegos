let todos_LosProductos = [];

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("data/productos.JSON");
        todos_LosProductos = await response.json();

        const inputBusqueda = document.getElementById("inputBusqueda");
        const resultadosBusqueda = document.getElementById("resultadosBusqueda");

        inputBusqueda.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();

            if (query.length > 0) {
                const resultadosFiltrados = todos_LosProductos.filter(prod =>
                    prod.titulo.toLowerCase().includes(query) ||
                    prod.categorias.some(cat => cat.toLowerCase().includes(query)) ||
                    prod.descripcion_larga.toLowerCase().includes(query)
                );
                renderResultadosBusqueda(resultadosFiltrados);
            } else {
                resultadosBusqueda.style.display = "none";
            }
        });

        document.addEventListener("click", (e) => {
            if (!inputBusqueda.contains(e.target) && !resultadosBusqueda.contains(e.target)) {
                resultadosBusqueda.style.display = "none";
            }
        });

    } catch (error) {
        console.error("Error al cargar los productos para la búsqueda:", error);
    }
});

function renderResultadosBusqueda(lista) {
    const contenedor = document.getElementById("resultadosBusqueda");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.style.display = "none";
        return;
    }

    lista.slice(0, 5).forEach(prod => {
        const item = document.createElement("a");
        item.href = `detalle-producto.html?titulo=${encodeURIComponent(prod.titulo)}`;
        item.className = "list-group-item list-group-item-action d-flex align-items-center";
        item.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.titulo}" style="height: 40px; width: 40px; object-fit: cover;" class="me-3 rounded">
            <div>
                <h6 class="mb-0 text-dark">${prod.titulo}</h6>
                <small class="text-success">S/ ${prod.precio.toFixed(2)}</small>
            </div>
        `;
        contenedor.appendChild(item);
    });

    contenedor.style.display = "block";
}