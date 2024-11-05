export class Vehiculo{
    constructor(id,modelo,anoFabricacion,velMax){
        if (id <= 0) {
            throw new Error('El ID debe ser mayor a 0.');
        }
        if(modelo==null){
            throw new Error('Debe ingresar un modelo.');
        }
        if(anoFabricacion==null){
            throw new Error('Debe ingresar un año valido.');
        }
        if(velMax <=0){
            throw new Error('Debe ingresar una velocidad mayor a 0.');
        }
        this.id = id;
        this.modelo = modelo;
        this.anoFabricacion = anoFabricacion;
        this.velMax = velMax;
    }
    toString() {
        return `Id: ${this.id}, Modelo: ${this.modelo}, anoFabricacion: ${this.anoFabricacion}, velMax: ${this.velMax}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
 }

 export class Auto extends Vehiculo{
    constructor( id,modelo,anoFabricacion,velMax,asientos,cantidadPuertas) {
        super(id,modelo,anoFabricacion,velMax);
        if (asientos == null && asientos<=2) {
            throw new Error('Ingrese cantidad de asientos.');
        }
        if (cantidadPuertas==null && cantidadPuertas<=2){
            throw new Error('Ingrese cantidad de puertas.');
        }

        this.asientos=asientos;
        this.cantidadPuertas=cantidadPuertas;
    }
    toString() {
        return `Id: ${this.id}, Modelo: ${this.modelo}, anoFabricacion: ${this.anoFabricacion}, velMax: ${this.velMax}, Asientos: ${this.asientos}, cantidadPuertas: ${this.cantidadPuertas}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
 }

 export class Camion extends Vehiculo{
    constructor( id,modelo,anoFabricacion,velMax,carga,autonomia){
        super(id,modelo,anoFabricacion,velMax);
        if (carga == null&& carga>=0 ) {
            throw new Error('Debe registrar una titulo.');
        }
        if(autonomia== null){
            throw new Error('Debe ingresar alguna facultad.');
        }

        this.carga=carga;
        this.autonomia=autonomia;
        
    }
    toString() {
        return `Id: ${this.id}, Modelo: ${this.modelo}, anoFabricacion: ${this.anoFabricacion}, velMax: ${this.velMax}, Carga: ${this.carga}, Autonomia: ${this.autonomia}`;
    }

    toJson() {
        return JSON.stringify(this);
    }
 }