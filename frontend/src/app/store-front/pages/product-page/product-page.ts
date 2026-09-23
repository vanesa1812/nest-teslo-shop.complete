import type { Product } from '@products/interfaces/product.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarousel } from '@products/product-carousel/product-carousel';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',

})
export class ProductPage {

  activateRoute = inject(ActivatedRoute);
  productService = inject(ProductsService)


  productIdSlug = this.activateRoute.snapshot.params['product'];

  productResource = rxResource<Product, { idSlug: string }>({
  params: () => ({
    idSlug: this.productIdSlug
  }),
  stream: ({ params }) => {
    return this.productService.getProductByIdSlug(params.idSlug);
  }
});
}
