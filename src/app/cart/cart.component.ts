import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Cart } from './interface/cart';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartDetails: Cart = {} as Cart;
  numOfCartItems: number = 0

  constructor(private _cartService: CartService, private _router: Router, private _toastrService: ToastrService) { }
  
  ngOnInit(): void {
    this.getCart()
  }
  getCart() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        this.cartDetails = res;
      }
    })
  }
  updataProductCount(count: number, id: string) {
    this._cartService.updataProductCount(count, id).subscribe({
      next: (res) => {
        this.cartDetails = res
      }
    })
  }

  removeProduct(id: string) {
    this._cartService.removeProduct(id).subscribe({
      next: (res) => {
        this.cartDetails = res
        this._toastrService.error("Product Removed From Your Cart")
      }
    })
  }

  clearCart(_id:string) {
    this._cartService.clearCart(_id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;
        this._router.navigate(['/home']);
        this._cartService.numOfCartItems.next(res.numOfCartItems=0)
    }
  })
  }
}
