import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { SigninComponent } from './signin/signin.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ProductDeatilsComponent } from './product-deatils/product-deatils.component';
import { OrdersComponent } from './orders/orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", canActivate: [authGuard], component: HomeComponent, title: "Home" },
  { path: "about", canActivate: [authGuard], component: AboutComponent, title: "About" },
  { path: "products", canActivate: [authGuard], component: ProductsComponent, title: "Products" },
  { path: "category", canActivate: [authGuard], component: CategoryComponent, title: "categries" },
  { path: "wishlist", canActivate: [authGuard], loadComponent: () => import('./wishlist/wishlist.component').then(c => c.WishlistComponent), title: "wishlist" },
  { path: "brand", canActivate: [authGuard], loadComponent: () => import('./brand/brand.component').then(c => c.BrandComponent), title: "brand" },
  { path: "productDetails/:id", canActivate: [authGuard], component: ProductDeatilsComponent, title: "product Details" },
  { path: "checkout/:cartId", component: CheckoutComponent, title: "payment" },
  { path: "allorders", component: OrdersComponent },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },

  { path: "signIn", component: SigninComponent, title: "SignIn" },
  { path: "signUp", component: SignUpComponent, title: "SignUp" },
  { path: "forgotPassword", loadComponent: () => import('./forgotpassword/forgotpassword.component').then(c => c.ForgotpasswordComponent), title: "forgotpassword" },

  { path: "**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
