import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { isNgTemplate } from "@angular/compiler";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  public list = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      if (data && data.items) {
        this.list = data.items.map(item => {
          return { ...item, id: data.items.indexOf(item) };
        });
      } else {
        this.list = [];
      }
      console.log(this.list);
    });
  }
}
