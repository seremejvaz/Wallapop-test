import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  public products = [1, 2, 3];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts();
  }
}
