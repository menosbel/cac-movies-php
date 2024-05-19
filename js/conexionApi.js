

async function obtenerUsuarioAleatorio()
{
    try
    {
        let respuesta = await fetch('https://randomuser.me/api/');
        let datos = await respuesta.json();
        return datos.results[0];

    }
    catch(error)
    {
        throw new error ("Error al obtener el usuario",error);
    }
}

function agregarUsuarioAlDom(usuario)
{
    let contenedorNombre = document.getElementById("nombre");
    let contenedorApellido = document.getElementById("apellido");

    contenedorNombre.innerHTML = usuario.name.first
    contenedorApellido.innerHTML = usuario.name.last

}

let obtenerUsuarioBtn = document.getElementById("obtenerUsuarioBtn");

obtenerUsuarioBtn.addEventListener('click', async() => {
    event.preventDefault()
    try
    {
        let usuario = await obtenerUsuarioAleatorio();
        agregarUsuarioAlDom(usuario);
    }
    catch(error)
    {
        console.log("hay un error",error);
    }
});
