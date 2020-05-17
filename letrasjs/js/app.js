import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;

    if(artista === '' || cancion === '') {
         // El usuario deja los campos vacios, mostrar error
         UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
         UI.divMensajes.classList.add('error');
         
         // Quitar mensaje de error a los 3 segundos
         setTimeout( () => {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error')
         }, 3000);

    } else {
        // Realizar la consulta API
        const api = new API(artista, cancion);

        api.consultarAPI()
            .then( data => {
                if ( data.respuesta.lyrics ) {
                    console.log(data);
                    // Imprimir la canción si existe
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                } else {
                    // Mensaje de error en caso de que la cancion no exista
                    UI.divMensajes.innerHTML = 'La canción NO existe, prueba con otra búsqueda';
                    UI.divMensajes.classList.add('error');
                    
                    // Quitar mensaje de error a los 3 segundos
                    setTimeout( () => {
                        UI.divMensajes.innerHTML = '';
                        UI.divMensajes.classList.remove('error');
                        UI.formularioBuscar.reset();
                     }, 3000);
                    
                }
            });
    }

});

console.log(UI);