export class Producto {
    id?: number;
    nombre?: string;
    descripcion?: string;
    imagen?: string;
    precio?: number;
    stock?: number;
    productoCategoriaId?: number;
    ingredientes?: string;
    preparacion?: string;
    cantidadPersonas?: number;
    cantidadElegida?:number;

    constructor(
        id?: number,
        nombre?: string,
        descripcion?: string,
        imagen?: string,
        precio?: number,
        stock?: number,
        productoCategoriaId?: number,
        ingredientes?: string,
        preparacion?: string,
        cantidadPersonas?: number,
    ) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.productoCategoriaId = productoCategoriaId;
        this.ingredientes = ingredientes;
        this.preparacion = preparacion;
        this.cantidadPersonas = cantidadPersonas;
        this.cantidadElegida = 0;
    }
}