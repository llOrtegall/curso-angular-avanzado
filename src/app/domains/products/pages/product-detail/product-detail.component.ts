import { Component, inject, signal, OnInit, input } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CartService } from '@shared/services/cart.service';
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
})
export default class ProductDetailComponent implements OnInit {
  readonly id = input<string>();
  product = signal<Product | null>(null);
  cover = signal('');
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit() {
    const id = this.id();
    if (id) {
      this.productService.getOne(id).subscribe({
        next: product => {
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        },
      });
    }
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
