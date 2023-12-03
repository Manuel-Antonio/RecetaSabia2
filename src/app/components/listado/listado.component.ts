import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { categorias } from 'src/app/data/categorias';
import { Categoria } from 'src/app/models/categoria';
import { productos } from 'src/app/data/productos';
import { Producto } from 'src/app/models/producto';
import { GlobalService } from 'src/app/shared/global.service';
import * as html2pdf from 'html2pdf.js';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { FormBuilder, FormGroup } from '@angular/forms';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  oscuroColor = 'bg-indigo-800';
  whiteColor = 'bg-white';

  categoriasList: Categoria[] = [];
  productosList: Producto[] = [];
  producto: Producto = {};
  carrito: Producto[] = [];
  totalPagar: number = 0;
  ingredientesList: any = [];
  preparacionList: any = [];
  mostrarDiv: boolean = false;
  productListPorCategoria: Producto[] = [];
  activarModal: boolean = false;
  pagos = [];
  pagoNombre = "";
  pagoDireccion = "";
  pagoNumeroTarjeta = "";
  pagoFechaExpiracion = "";
  pagoCodigoSeguridad = "";
  darkMode = false;
  isActive: boolean = true;

  handleButtonClick() {
    // Lógica para activar o desactivar el botón
    this.isActive = !this.isActive;
  }
  modoNoche() {
    this.darkMode != this.darkMode
  }
  constructor(private globalService: GlobalService, private db: DbService) {
    this.loadCart();
    this.calcularTotalAPagar();
  }

  ngOnInit() {
    this.categoriasList = categorias ?? [];
    this.productosList = productos ?? [];
    this.obtenerCategoriaPorId(1);

  }

  isProductCarrito(itemId: any): boolean {
    let elemento = this.carrito.find(p => p.id == itemId);
    if (elemento != null) {
      return true;
    }
    return false;
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.carrito));
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    this.carrito = cart ? JSON.parse(cart) : [];
  }

  obtenerCategoriaPorId(id: any) {
    this.productListPorCategoria = this.productosList.filter(p => p.productoCategoriaId == id);
  }

  productoElegido(id: any) {
    this.producto = this.productListPorCategoria.find(p => p.id == id) ?? {};
    this.ingredientesList = this.producto?.ingredientes?.split(",");
    this.preparacionList = this.obtenerInstruccionesNumeradas(this.producto?.preparacion ?? "");
    console.log(this.preparacionList)
  }

  obtenerInstruccionesNumeradas(texto: string): any[] {
    // Dividir el texto en oraciones
    const oraciones = texto.split('. ');

    // Filtrar las oraciones vacías
    const oracionesFiltradas = oraciones.filter(oracion => oracion.trim() !== '');

    // Mapear las oraciones a un arreglo de objetos con número e instrucción
    const preparacionNumerada = oracionesFiltradas.filter((oracion) => {

      if (!isNaN(Number(oracion))) {
        return;
      }
      return oracion;
    });

    return preparacionNumerada;
  }

  agregarCarrito(producto: Producto) {
    if (this.carrito.find(p => p.id == producto.id) != null) {
      this.carrito = this.carrito.map(p => {
        if (p.id == producto.id && p.cantidadElegida != 5) {
          let cantidad = p.cantidadElegida || 1;
          cantidad += 1;
          p.cantidadElegida = cantidad;
        }
        return p;
      });
      this.calcularTotalAPagar();
    } else {
      producto.cantidadElegida = 1;
      this.carrito = [...this.carrito, producto] ?? [];
      this.calcularTotalAPagar();
    }
    this.saveCart();
  }

  disminuirCantidad(item: any) {
    if (item.cantidadElegida == 1) {
      return;
    }
    item.cantidadElegida -= 1;
    this.carrito = this.carrito.map(p => p.id == item.id ? item : p);
    this.calcularTotalAPagar();
    this.saveCart();
  }
  aumentarCantidad(item: any) {
    if (item.cantidadElegida == 5) {
      return;
    }
    item.cantidadElegida += 1;
    this.carrito = this.carrito.map(p => p.id == item.id ? item : p);
    this.calcularTotalAPagar();
    this.saveCart();
  }
  subtotal(item: any): number {
    return item.precio * item.cantidadElegida;
  }
  eliminarProducto(itemId: any) {
    this.carrito = this.carrito.filter(p => p.id != itemId);
    this.calcularTotalAPagar();
    this.saveCart();
  }
  calcularTotalAPagar() {
    this.totalPagar = this.carrito.reduce(
      (total, p) => total += ((p.precio || 0) * (p.cantidadElegida || 0))
      , 0
    );
  }

  @ViewChild('contenidoPDF', { static: false }) contenidoPDF!: ElementRef;
  descargarPDF(): void {
    const content: HTMLElement | null = this.contenidoPDF?.nativeElement;

    if (content) {
      const opcionesCanvas = {
        scale: 2,
        useCORS: true,
        logging: true
      };

      html2canvas(content, opcionesCanvas).then((canvas: HTMLCanvasElement) => {
        // Configura el tamaño del PDF
        const pdf = new jspdf.jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });

        // Ajusta las dimensiones del canvas de acuerdo con las dimensiones reales del contenido
        const canvasWidth = content.offsetWidth;
        const canvasHeight = content.offsetHeight;

        // Calcula la relación de aspecto de la imagen
        const aspectRatio = canvasWidth / canvasHeight;

        // Establece el alto del PDF en la altura total de la página y calcula el ancho en base al aspectRatio
        const pdfHeight = pdf.internal.pageSize.getHeight() - 20; // Reduzco 20 mm para tener margen
        const pdfWidth = pdfHeight * aspectRatio;

        // Calcula la posición para centrar horizontalmente
        const offsetX = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
        const offsetY = 10; // Supongamos que la posición vertical superior es 10 mm

        // Convierte el canvas a una imagen y la añade al PDF (primera página)
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', offsetX, offsetY, pdfWidth, pdfHeight);

        // Descarga el PDF
        pdf.save(`Receta - ${this.producto.nombre}.pdf`);
      });
    } else {
      console.error('Elemento no encontrado con el ID "contenidoPDF"');
    }
  }

  resetear() {
    // Realiza acciones necesarias con this.myForm.value
    this.carrito = [];
    this.totalPagar = 0;
    this.pagoNombre = "";
    this.pagoDireccion = "";

    this.guardarPago();
    this.saveCart();
  }

  
  guardarPago() {
    // Guardar pago
    this.db.addPago({
      nombre: this.pagoNombre,
      direccion: this.pagoDireccion,
      nroTarjeta: "**** **** **** ****",
      codigoSeguridad: "***",
      fecha: "**/**",
      total: this.totalPagar,
      items: this.carrito
    })

  }

}
