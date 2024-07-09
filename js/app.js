const base_url = 'http://127.0.0.1/CaC-PHP-2024/ProyectoFinal-CaC-PHP/api/api.php';
let editar = false;

function loadItems() {
    const itemsTableBody = document.getElementById('itemsTableBody');

    fetch(base_url)
        .then(response => response.json())
        .then(data => {
            itemsTableBody.innerHTML = '';
            if (data.peliculas) {
                data.peliculas.forEach(pelicula => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${pelicula.id}</td>
                        <td>${pelicula.titulo}</td>
                        <td>${pelicula.fecha_lanzamiento}</td>
                        <td>${pelicula.genero}</td>
                        <td>${pelicula.duracion}</td>
                        <td>${pelicula.director}</td>
                        <td>${pelicula.reparto}</td>
                        <td>${pelicula.sinopsis}</td>                    
                        <td>
                            <button class="btn btn-danger" onclick="deleteItem(${pelicula.id})">Eliminar</button>
                        </td>
                        <td>
                            <button class="btn btn-success" onclick="habilitarEdicion(
                            ${pelicula.id}, 
                            '${pelicula.titulo}', 
                            '${pelicula.fecha_lanzamiento}', 
                            '${pelicula.genero}', 
                            '${pelicula.duracion}', 
                            '${pelicula.director}', 
                            '${pelicula.reparto}',
                            '${pelicula.sinopsis}')">Editar</button>
                        </td>
                    `;
                    itemsTableBody.appendChild(row);
                });
            } else {
                console.error('No se encontraron películas');
            }
        })
        .catch(error => console.error('Error:', error));
}

function deleteItem(id) {
    fetch(`${base_url}?id=${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            loadItems();
        })
    ;
    loadItems();
}

function habilitarEdicion(id, titulo, fecha_lanzamiento, genero, duracion, director, reparto, sinopsis) {
    document.getElementById('id').value = id;
    document.getElementById('titulo').value = titulo;
    document.getElementById('fecha_lanzamiento').value = fecha_lanzamiento;
    document.getElementById('genero').value = genero;
    document.getElementById('duracion').value = duracion;
    document.getElementById('director').value = director;
    document.getElementById('reparto').value = reparto;
    document.getElementById('sinopsis').value = sinopsis;

    editar = true;
}

document.addEventListener('DOMContentLoaded', function () {
    loadItems();
});

const guardarPeliculas = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get('id');
    const data = {
        id: id,
        titulo: formData.get('titulo'),
        fecha_lanzamiento: formData.get('fecha_lanzamiento'),
        genero: formData.get('genero'),
        duracion: formData.get('duracion'),
        director: formData.get('director'),
        reparto: formData.get('reparto'),
        sinopsis: formData.get('sinopsis'),
    };

    if (!editar)
    {
        crearItem(data);
    } else if (editar)
    {
        editarItem(id, data);
    }
}

function editarItem(id, data) {
    fetch(`${base_url}?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta:', data);
            loadItems();
            resetForm();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    editar = false;
}

function crearItem(data) {
    fetch(`${base_url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta:', data);
            loadItems();
            resetForm();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const resetForm = () => {
    document.getElementById('id').value = "";
    document.getElementById('titulo').value = "";
    document.getElementById('fecha_lanzamiento').value = "";
    document.getElementById('genero').value = "";
    document.getElementById('duracion').value = "";
    document.getElementById('director').value = "";
    document.getElementById('reparto').value = "";
    document.getElementById('sinopsis').value = "";
}
