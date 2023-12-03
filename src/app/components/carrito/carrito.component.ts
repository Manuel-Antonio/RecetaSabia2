import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { GlobalService } from 'src/app/shared/global.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito : Producto[] = [];
  constructor(private globalService : GlobalService) { }

  ngOnInit() {
    this.carrito = this.globalService.carrito;
    console.log(this.carrito)
  }

}
