import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product [], searchKey: string): Product [] {
    return products.filter((ele) =>ele.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()));
  }

}
