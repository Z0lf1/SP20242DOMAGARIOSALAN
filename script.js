import { inicializarVehiculos,mostrarDatos,agregarElemento,
    grabarVehiculo,getVehiculo,inicializarOrdenHeaders,eliminarVehiculo,cancelarEdicion} from './functions.js';

const tabla = document.querySelector('#tabla-datos tbody');
const agregarBtn = document.getElementById('agregar-elemento');
const formEditable = document.getElementById('form-abm');
const btnEliminar = document.getElementById('eliminar');
const btnCancelar = document.getElementById('cancelar');
getVehiculo();
inicializarVehiculos();
inicializarOrdenHeaders();
//mostrarDatos(tabla);


agregarBtn.addEventListener('click', agregarElemento);
formEditable.addEventListener('submit', (event) => {
    event.preventDefault();
    grabarVehiculo(event);
});
btnEliminar.addEventListener('click', eliminarVehiculo);
btnCancelar.addEventListener('click', cancelarEdicion);