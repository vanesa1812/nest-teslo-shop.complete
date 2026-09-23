import { PaginationService } from './../../../shared/components/pagination/pagination.service';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.html',
})

export class GenderPage {

  route = inject(ActivatedRoute);
  PaginationService = inject(PaginationService)

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender}) => gender)
    )
  )
    private productsService = inject(ProductsService);

  productsResource = rxResource({
    params: () => ({gender:this.gender(), page:this.PaginationService.currentPage() -1}),
    stream: ({params}) => this.productsService.getProducts({
      gender: params.gender,
      offset: params.page * 9,
    })
  });


}
