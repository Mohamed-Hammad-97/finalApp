import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../shared/services/wishlist.service';
import { Wishlist } from './interface/wishlist';
import { CartService } from '../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  wishlistDetails: Wishlist = {} as Wishlist;
  whishlistData: string[] = [];
  
  constructor(private _wishlistService: WishlistService, private _cartService: CartService, private _toastrService: ToastrService){}

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    this._wishlistService.getProductToWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistDetails = res 
        console.log(this.wishlistDetails);
        const newData = res.data.map((item: any) => item.id)
        this.whishlistData = newData
      }
    })
  }

  removeFromWishlist(id:string) {
    this._wishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        res = this.getWishlist()
      }
    })
  }

  addProductToCart(id:string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        res = this.removeFromWishlist(id)
        this._toastrService.success("Product Added to Your Cart")
      }
    })
  }
  
}
