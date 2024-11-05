import {Auto, Camion} from "./clases.js";   
export let vehiculos = [];
export let vehiculoSeleccionado=null;
export let ordenAscendente = true;

export function getVehiculo(){

    var xhttp = new XMLHttpRequest();
   
    
    xhttp.onreadystatechange=function(){

        if(xhttp.readyState== 4){
            if(xhttp.status ==200){
            let jsonRespuesta = JSON.parse(xhttp.response);
            inicializarVehiculos(jsonRespuesta);
            mostrarDatos(document.querySelector('#tabla-datos tbody'));
               
        }else{
            document.getElementById("ErrorEndPoint").style.display= "block";
            document.getElementById("tabla-datos").style.display= "none";
            document.getElementById("agregar-elemento").style.display= "none";

        }
     }
    };
    
        xhttp.open("GET","https://examenesutn.vercel.app/api/VehiculoAutoCamion");
        xhttp.setRequestHeader('Content-type','text/plain');
        xhttp.send();

    }


const headers ={
    'id':0,
    'modelo':1,
    'anoFabricacion':2,
    'velMax':3,
    'cantidadPuertas':4,
    'asientos':5,
    'carga':6,
    'autonomia':7
}



export function inicializarVehiculos(jsonRespuesta){
    if(jsonRespuesta){
    jsonRespuesta.forEach(vehiculo => {
        console.log(vehiculo);

        if (vehiculo.cantidadPuertas && vehiculo.asientos){
            vehiculos.push(new Auto(vehiculo.id,vehiculo.modelo,vehiculo.anoFabricacion,vehiculo.velMax,vehiculo.cantidadPuertas,vehiculo.asientos));
            } else if (vehiculo.carga!== undefined && vehiculo.autonomia !== undefined){
                vehiculos.push(new Camion(vehiculo.id,vehiculo.modelo,vehiculo.anoFabricacion,vehiculo.velMax,vehiculo.carga,vehiculo.autonomia));
            }
            
    });
    }
}

export function mostrarDatos(tabla){
    console.log(vehiculos);
    tabla.innerHTML = '';

    vehiculos.forEach(vehiculo=>{
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${vehiculo.id}</td>
        <td>${vehiculo.modelo}</td>
        <td>${vehiculo.velMax}</td>
        <td>${vehiculo.anoFabricacion}</td>
        <td>${vehiculo.cantidadPuertas || ''}</td> 
        <td>${vehiculo.asientos || ''}</td> 
        <td>${vehiculo.carga || ''}</td>
        <td>${vehiculo.autonomia || ''}</td>
        <td><button id="modificar" type="submit">Modificar</button></td>
        <td><button id="eliminar" type="submit">Eliminar</button></td>
    
    `;
    tabla.appendChild(fila);
}); 
  // actualizarColumnasSeleccionadas();
}

export function alternarForm(mostrarFormulario){
    document.getElementById('form-abm').style.display= mostrarFormulario ? 'block' :'none';
    document.getElementById('form-datos').style.display= mostrarFormulario ? 'none' :'block';
}

export function mostrarCamposSegunTipo(tipo){
    const esAuto = tipo ==='Auto';
    document.getElementById('auto-fields').style.display = esAuto ? 'block' : 'none';
    document.getElementById('camion-fields').style.display = esAuto ? 'none' : 'block';

}

export function editarVehiculo(vehiculo){
  
    vehiculoSeleccionado = vehiculo;
    document.getElementById('id').value=vehiculo.id;
    document.getElementById('modelo').value=vehiculo.modelo;
    document.getElementById('velMax').value=  vehiculo.velMax;
    document.getElementById('anoFabricacion').value=vehiculo.anoFabricacion;

    const tipoSeleccionado = document.getElementById('tipo-vehiculo');
    tipoSeleccionado.disabled = true;
    if ( vehiculo instanceof Auto){

        tipoSeleccionado.value='Auto';
        document.getElementById('cantidadPuertas').value= persona.cantidadPuertas;
        document.getElementById('asientos').value= persona.asientos;
        
    } else if (vehiculo instanceof Camion){
        tipoSeleccionado.value= 'Camion';
        document.getElementById('carga').value= vehiculo.carga;
        document.getElementById('autonomia').value= vehiculo.autonomia;
    }
    
    document.getElementById('guardar').textContent = 'Modificar';
    document.getElementById('eliminar').style.display = 'inline';

    mostrarCamposSegunTipo(tipoSeleccionado.value);
    alternarForm(true);
}

function validarVehiculo(tipoVehiculo,modelo,anoFabricacion,velMax,cantidadPuertas,asientos,carga,autonomia){
    const errores =[];

    if(!modelo || modelo.trim()===""){
        errores.push("Se requiere un nombre.");
    }
    if(!anoFabricacion || anoFabricacion.trim()===""){
        errores.push("Se requiere un año.");
    }
    if (isNaN(velMax) || velMax <= 0) {
        errores.push("Ingresar  mayor a 0.");
    }

    if(tipoVehiculo==='Auto'){
        if(!cantidadPuertas  ){
            errores.push("Debe ingrersar puertas");
        }
        if(!asientos){
            errores.push("Debe ingrersar asientos");
        }

    }

    if(tipoVehiculo==='Camion'){
        if(!carga){
        errores.push("Debe ingrersar una carga");
    }
    if(!autonomia){
        errores.push("Debe ingrersar una autonomia");
    }
    }

    if (errores.length>0){
        return { valido: false, mensaje: errores.join("\n")};
    }

    return {valido: true, mensaje:""};
}

function mostrarError(mensaje){
    const errorDiv= document.getElementById('error-mensaje');
    errorDiv.textContent = mensaje;
    errorDiv.style.display='block';
}

function ocultarError(){
    const errorDiv = document.getElementById('error-mensaje');
    errorDiv.textContent = '';
    errorDiv.style.display='none';
}

export async function grabarVehiculo(event){
    
    event.preventDefault();
    const tipoVehiculo = document.getElementById('tipo-vehiculo').value;
    const modelo = document.getElementById('modelo').value;
    const anoFabricacion = document.getElementById('anoFabricacion').value;
    const velMax = parseInt(document.getElementById('velMax').value);
    const cantidadPuertas = document.getElementById('cantidadPuertas').value;
    const asientos = document.getElementById('asientos').value;
    const carga = parseInt(document.getElementById('carga').value);
    const autonomia = document.getElementById('autonomia').value;


    const validacion = validarVehiculo(tipoVehiculo,modelo,anoFabricacion,velMax,cantidadPuertas,asientos,carga,autonomia);

    if(!validacion.valido){
        mostrarError(validacion.mensaje);
        return;
    }
    ocultarError();
    if(vehiculoSeleccionado){
        vehiculoSeleccionado.modelo=modelo;
        vehiculoSeleccionado.anoFabricacion=anoFabricacion;
        vehiculoSeleccionado.velMax=velMax;
        if(tipoVehiculo==='Auto'){
            vehiculoSeleccionado.cantidadPuertas= cantidadPuertas;
            vehiculoSeleccionado.asientos=asientos;
          } else if (vehiculoSeleccionado==='Camion'){
            vehiculoSeleccionado.carga=carga;
            vehiculoSeleccionado.autonomia= autonomia;
        }
        
        
    } else{
        const nuevoId = generarIdUnico();
        let nuevoVehiculo;
        if(tipoVehiculo === 'Auto'){
            nuevoVehiculo= new Auto(nuevoId,modelo,anoFabricacion,velMax,cantidadPuertas,asientos);
           }else if (tipoVehiculo ==='Camion'){
            nuevoVehiculo = new Camion(nuevoId,modelo,anoFabricacion,velMax,carga,autonomia);
           }
        vehiculos.push(nuevoVehiculo);
    }
    mostrarDatos(document.querySelector('#tabla-datos tbody'));
    alternarForm(false);
}

function generarIdUnico(){
    const idsExistentes = vehiculos.map(p => p.id).sort((a, b) => a - b);
    let nuevoId = 1;
    for (let i = 0; i < idsExistentes.length; i++) {
        if (idsExistentes[i] !== nuevoId) {
            break;
        }
        nuevoId++;
    }
    return nuevoId;
}

export function agregarElemento(){

document.getElementById('id').value = ''; 
document.getElementById('modelo').value = '';
document.getElementById('velMax').value = '';
document.getElementById('anoFabricacion').value = '';
document.getElementById('cantidadPuertas').value = '';
document.getElementById('asientos').value = '';
document.getElementById('carga').value = '';
document.getElementById('autonomia').value = '';


const tipoVehiculoSelec = document.getElementById('tipo-vehiculo');
tipoVehiculoSelec.disabled=false;
tipoVehiculoSelec.value = 'Auto';

tipoVehiculoSelec.addEventListener('change', (e)=> {mostrarCamposSegunTipo(e.target.value);});

document.getElementById('guardar').textContent='Agregar';
document.getElementById('eliminar').style.display='none';

mostrarCamposSegunTipo(tipoVehiculoSelec.value);
alternarForm(true);
}


export function inicializarOrdenHeaders(){
    Object.keys(headers).forEach(headerId =>{
        const header = document.querySelector(`#tabla-datos th:nth-child(${headers[headerId] + 1})`);
        header.style.cursor = 'pointer';
        header.addEventListener('click', ()=>{
            ordenarPorColumna(headers[headerId]);
        });
    });
}

function ordenarPorColumna(columnIndex){
    const tabla = document.querySelector('#tabla-datos tbody');
    let filas = Array.from(tabla.querySelectorAll('tr'));
    const esNumerico = ['id', 'edad', 'cantidadGoles', 'anioGraduacion'].includes(Object.keys(headers)[columnIndex]);


    filas.sort((a,b)=>{
        const valorA = a.children[columnIndex].textContent.trim();
        const valorB = b.children[columnIndex].textContent.trim();
        if(esNumerico){
            return ordenAscendente ? (parseFloat(valorA)- parseFloat(valorB)) : (parseFloat(valorB)- parseFloat(valorA));
        } else {
            return ordenAscendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
        }
    });
    ordenAscendente= !ordenAscendente;
    tabla.innerHTML='';
    filas.forEach(fila=>tabla.appendChild(fila));
}

export function cancelarEdicion(){
    alternarForm(false);
}

export function eliminarVehiculo(){
    if(personaSeleccionada){
        personas= personas.filter(v=> v!== personaSeleccionada);
        mostrarDatos(document.querySelector('#tabla-datos tbody'));
        alternarForm(false);
    }
}