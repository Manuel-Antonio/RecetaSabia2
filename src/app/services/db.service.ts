import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {

  pagos: Dexie.Table<IPago, number>;

  constructor() {
    super('RecetaSabia');
    this.version(1).stores({
      pagos: '++id, nombre, direccion, fecha, total, items' 
    });
    this.pagos = this.table('pagos');
  }

  addPago(pago: IPago) {
    return this.pagos.add(pago); 
  }

  getPagos() {
    return this.pagos.toArray();
  }

}

export interface IPago {
  id?: number;
  nombre: string;
  direccion: string;
  nroTarjeta: string;
  codigoSeguridad: string;
  fecha: string;
  total: number;
  items: Producto[];
}

// interface IItemCompra {
//   id: number;
//   nombre: string;
//   precio: number;
//   cantidad: number;
// }