document.addEventListener("DOMContentLoaded", () => {

    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const inicio = document.getElementById('inicio');
    const searchBar = document.getElementById('search-bar');
    const genreFilter = document.getElementById('genre-filter');
    const contadorAnimes = document.getElementById('total-animes');
    const animesPorPagina = 56;
    const paginationContainer = document.getElementById('pagination');
    const baseImageUrl = 'https://raw.githubusercontent.com/DANIB04/DANIB04.github.io/main/Imagenes/';
    const mostrarMasBtn = document.getElementById('mostrarmas');
    const animeList = document.getElementById('anime-list');

    let todosAnimes = [];
    let paginaActual = 1;

    searchBar.addEventListener('input', actualizarBusqueda);
    genreFilter.addEventListener('change', actualizarBusqueda);
    mostrarMasBtn.addEventListener('click', mostrarContenidoPrincipal);

    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            todosAnimes = data;
            llenarGeneros(data);
            mostrarAnimes(data);
            renderizarPagina(data.length);
            contadorTotal(data.length);
        })
        .catch(error => console.error('Error al obtener los datos:', error));

    function contadorTotal(total) {
        contadorAnimes.textContent = `Animes # ${total}`;
    }

    function actualizarBusqueda() {
        const animesFiltrados = filtrarAnimes(todosAnimes, searchBar.value, genreFilter.value);
        paginaActual = 1;
        mostrarAnimes(animesFiltrados);
        renderizarPagina(animesFiltrados.length);
        contadorTotal(animesFiltrados.length);
    }

    function llenarGeneros(animes) {
        const generos = new Set(['Todos']);
        animes.forEach(anime => {
            anime.genres.forEach(genre => generos.add(genre));
        });

        generos.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });
    }

    function filtrarAnimes(animes, textoBusqueda, genero) {
        return animes.filter(anime => {
            const coincideGenero = genero === 'Todos' || anime.genres.includes(genero);
            const coincideBusqueda = anime.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
            return coincideGenero && coincideBusqueda;
        });
    }

    function mostrarAnimes(animes) {
        animeList.innerHTML = '';
        const inicio = (paginaActual - 1) * animesPorPagina;
        const fin = inicio + animesPorPagina;
        const animesPagina = animes.slice(inicio, fin);

        animesPagina.forEach((anime, index) => {
            const animeItem = document.createElement('div');
            animeItem.classList.add('anime-item');
            animeItem.innerHTML = `
                <p class="Contador"><span> Num #${inicio + index + 1}</span></p>
                <img src="${baseImageUrl}${anime.nombre}.png" alt="${anime.nombre}">
                <h1 class="anime-Name">${anime.nombre}</h1>
                <p class="anime-Temp">- Temporadas: <span>${anime.temporadas}</span></p>
                <p class="anime-Cap">- Capítulos: <span>${anime.capitulos}</span></p>
                <p class="anime-Rank">- Calificación: <span>${anime.calificacion}</span></p>`;
            animeList.appendChild(animeItem);
        });
    }

    function renderizarPagina(totalAnimes) {
        paginationContainer.innerHTML = '';
        const numeroPaginas = Math.ceil(totalAnimes / animesPorPagina);

        for (let i = 1; i <= numeroPaginas; i++) {
            const boton = document.createElement('button');
            boton.textContent = i;
            boton.classList.add('page-button');
            if (i === paginaActual) {
                boton.classList.add('active');
            }
            boton.addEventListener('click', () => {
                paginaActual = i;
                mostrarAnimes(filtrarAnimes(todosAnimes, searchBar.value, genreFilter.value));
                renderizarPagina(totalAnimes);
            });
            paginationContainer.appendChild(boton);
        }
    }

    function mostrarContenidoPrincipal() {
        Entrada.classList.add('hidden1');
        nav.classList.add('show');
        main.classList.add('show');
        main.classList.remove('hidden1');
    }
});
