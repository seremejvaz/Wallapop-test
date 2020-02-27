import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  private list = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      if (data && data.items) {
        this.list = data.items;
      } else {
        this.list = [];
      }
    });
  }
}
