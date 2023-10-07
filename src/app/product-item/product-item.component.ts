import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { CartService } from '../shared/services/cart.service';
import { WishlistService } from '../shared/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{
  @Input() product: Product = {} as Product;
  
  whishlistData: string[] = [];
  
  constructor(private _cartService: CartService, private _wishlistService: WishlistService, private _toastrService:ToastrService) { }
  
  ngOnInit(): void {
    this._wishlistService.getProductToWishlist().subscribe({
      next: (res) => {
        const newData = res.data.map((item: any) => item.id)
        this.whishlistData = newData
      }
    })
  }

  addProductToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this._cartService.numOfCartItems.next(res.numOfCartItems) 
        this._toastrService.success(res.message)
      }
    })
  }
  addProductToWishlist(id: string) {
    this._wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this._toastrService.success(res.message)
        this.whishlistData = res.data
      }
    })
  }

  removeFromWishlist(id:string) {
    this._wishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        this._toastrService.error(res.message)
        this.whishlistData = res.data
      }
    })
  }
}
