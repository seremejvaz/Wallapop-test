import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";

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
        this.list = data.items
          .filter(i => {
            return this.productService.getActiveFilter() !== i.title;
          })
          .map(item => {
            return { ...item, id: data.items.indexOf(item), favourite: false };
          });
      } else {
        this.list = [];
      }
    });
  }

  setFavourite(id) {
    this.list[id] = {
      ...this.list[id],
      favourite: !this.list[id].favourite
    };
  }
}
