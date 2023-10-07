import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Brand } from '../brand';
import { ProductsService } from '../products.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {

  allBrands: Brand[] = [];
  brandDataName: string = '';
  brandDataImage: string = '';
  pageSize: number = 0;
  page: number = 0;
  total: number = 0;

  constructor(private _productsService: ProductsService ) { }

  ngOnInit(): void {
    this.getBrand()
  }

  getBrand() {
    this._productsService.getBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data
        console.log(res);
        this.pageSize = res.metadata.limit;
        this.page = res.metadata.currentPage;
        this.total = res.results;
      }
    })
  }

  pageChanged(event: any) {
    this._productsService.getBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data
        console.log(res);
        this.pageSize = res.metadata.limit;
        this.page = res.metadata.currentPage;
        this.total = res.results;
      }
    })
  }

  openModal() {
    const modalDiv = document.getElementById('modal')
    if (modalDiv != null) {
      modalDiv.style.display = 'block'
    }
  }

  closeModal() {
    const modalDiv = document.getElementById('modal')
    if (modalDiv != null) {
      modalDiv.style.display = 'none'
    }
  }
}
