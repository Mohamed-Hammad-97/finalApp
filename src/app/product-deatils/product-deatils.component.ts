import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../shared/services/cart.service';
import { WishlistService } from '../shared/services/wishlist.service';

@Component({
  selector: 'app-product-deatils',
  templateUrl: './product-deatils.component.html',
  styleUrls: ['./product-deatils.component.css']
})
export class ProductDeatilsComponent {

  productId: string = '';
  productDeatails: Product = {} as Product;
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _wishlistService: WishlistService
  ) {
    this._activatedRoute.paramMap.subscribe((res:any) => {
      this.productId = res.params.id
    })
    this._productsService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.productDeatails=res.data
      }
    })
  }

  addProductToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }

  addProductToWishlist(id: string) {
    this._wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }
}
