import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  allProduct: Product[] = [];
  searchKey: string = ''

  constructor(private _productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this._productsService.getProducts().subscribe({
      next: (res) => {
        this.allProduct = res.data

      }
    })
  }
}
