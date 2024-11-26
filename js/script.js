const listaPaises = document.getElementById("countries-list");

async function banderas() {
    try {
        const response = await fetch("https://restcountries.com/v3/all");
        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();

        // Ordenar alfabéticamente por nombre común del país
        const sortedData = data.sort((a, b) =>
            a.name.common.toLowerCase().localeCompare(b.name.common.toLowerCase())
        );

        // Llamar a la función para renderizar los países en el DOM
        renderizarPaises(sortedData);
    } catch (error) {
        console.error("Error:", error);
        listaPaises.innerHTML = `<p>Error al cargar los países. Intenta de nuevo más tarde.</p>`;
    }
}

function renderizarPaises(paises) {
    // Crear las tarjetas de países con banderas y nombres
    listaPaises.innerHTML = paises
        .map(
            (pais) => `
            <div class="country-card" 
                 data-name="${pais.name.common}" 
                 data-capital="${pais.capital}" 
                 data-population="${pais.population.toLocaleString()}" 
                 data-driving="${pais.car.side}" 
                 data-flag="${pais.flags.png}">
                <img src="${pais.flags.png}" alt="Bandera de ${pais.name.common}">
                <p>${pais.name.common}</p>
            </div>
        `
        )
        .join("");

    // Agregar eventos de clic a cada tarjeta
    document.querySelectorAll(".country-card").forEach((card) => {
        card.addEventListener("click", () => mostrarInformacion(card));
    });
}

function mostrarInformacion(card) {
    // Obtener los datos del país desde los atributos del elemento
    const name = card.dataset.name;
    const capital = card.dataset.capital;
    const population = card.dataset.population;
    const driving = card.dataset.driving === "right" ? "Derecha" : "Izquierda";
    const flag = card.dataset.flag;

    // Crear y mostrar un contenedor para la información del país
    const countryDetails = document.createElement("div");
    countryDetails.classList.add("country-details");
    countryDetails.innerHTML = `
        <h2>${name}</h2>
        <img src="${flag}" alt="Bandera de ${name}">
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Población:</strong> ${population}</p>
        <p><strong>Carril de conducción:</strong> ${driving}</p>
        <button id="close-details">Cerrar</button>
    `;

    document.body.appendChild(countryDetails);

    // Evento para cerrar el detalle
    document.getElementById("close-details").addEventListener("click", () => {
        countryDetails.remove();
    });
}

// Llamar a la función principal
banderas();
