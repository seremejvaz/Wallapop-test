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
    this.productService.getFilters().subscribe(f => {
      this.list = this.productService.getProducts().filter(product => {
        let keepItem = true;
        Object.keys(f).map(filterKey => {
          if (
            f[filterKey] &&
            !product[filterKey]
              .toLowerCase()
              .includes(f[filterKey].toLowerCase())
          ) {
            keepItem = false;
          }
        });
        return keepItem;
      });
      console.log(this.list);
    });
  }

  setFavourite(id) {
    this.list[id] = {
      ...this.list[id],
      favourite: !this.list[id].favourite
    };
  }
}
