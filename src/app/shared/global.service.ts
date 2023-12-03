import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  carrito: Producto[] = [];
  constructor() { }

 
}
