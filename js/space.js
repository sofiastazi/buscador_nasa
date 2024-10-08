document.addEventListener('DOMContentLoaded', () => {
    const btnBuscar = document.getElementById('btnBuscar'); 
    const inputBuscar = document.getElementById('inputBuscar'); 
    const contenedor = document.getElementById('contenedor'); 

    // Agregamos un evento al botón de búsqueda para que se ejecute cuando se haga clic
    btnBuscar.addEventListener('click', () => {
        const query = inputBuscar.value; // Capturamos el texto ingresado por el usuario
        if (query) { // Verificamos que la consulta no esté vacía
            fetchImagenes(query); // Llamamos a la función para buscar las imágenes
        }
    });

    // Función para hacer la solicitud a la API de la NASA
    function fetchImagenes(query) {
        const url = `https://images-api.nasa.gov/search?q=${query}`; // Construimos la URL de la API con el texto de búsqueda

        // Realizamos la solicitud a la API usando fetch
        fetch(url)
            .then(response => response.json())  // Convertimos la respuesta a formato JSON
            .then(data => {
                // Procesamos y mostramos las imágenes obtenidas de la API
                mostrarImagenes(data); // Llamamos a la función para mostrar las imágenes
            })
            .catch(error => {
                // En caso de error, lo mostramos en la consola
                console.error('Error al obtener los datos de la API:', error);
            });
    }

    // Función para mostrar las imágenes en el contenedor
    function mostrarImagenes(data) {
        contenedor.innerHTML = '';  // Limpiamos los resultados anteriores en el contenedor
        const items = data.collection.items;  // Extraemos los elementos de la respuesta de la API

        // Iteramos sobre cada elemento (imagen) devuelto por la API
        items.forEach(item => {
            // Obtenemos la URL de la imagen, asegurándonos de que exista
            const imagen = item.links[0].href; 
            const titulo = item.data[0].title;  // Obtenemos el título de la imagen
            const descripcion = item.data[0].description; // Obtenemos la descripción de la imagen
            // Formateamos la fecha a un formato más legible
            const fecha = new Date(item.data[0].date_created).toLocaleDateString();

            // Creamos una tarjeta de Bootstrap para cada imagen
            const tarjeta = `
                <div class="col-md-3 mb-4">  
                    <div class="card text-center"> 
                        <img src="${imagen}" class="card-img-top" alt="${titulo}">
                        <div class="card-body">
                            <h5 class="card-title">${titulo}</h5> 
                            <div class="card-text overflow-auto flex-grow-1" style="max-height: 100px;">
                                ${descripcion}
                            </div>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">Fecha: ${fecha}</small>
                        </div>
                    </div>
                </div>
            `;
            // Añadimos la tarjeta creada al contenedor
            contenedor.innerHTML += tarjeta;  
        });
    }
});