import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { Category } from '../category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  allCategories: Category[] = [];

  constructor(private _productsService: ProductsService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this._productsService.getCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data

      }
    })
  }
}
