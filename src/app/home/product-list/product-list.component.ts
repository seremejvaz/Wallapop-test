import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "src/types";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  public list = [];
  public filteredList = [];
  public pageItems = 5;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService
      .getProducts()
      .subscribe((data: { items: Product[] }) => {
        this.list = data.items.map(item => {
          return { ...item, id: data.items.indexOf(item), favourite: false };
        });
        this.getFilteredProducts();
      });
  }

  getFilteredProducts() {
    this.productService.getFilters().subscribe(f => {
      this.filteredList = this.list
        .filter(p => {
          let keepItem = true;
          Object.keys(f).map(filterKey => {
            if (
              f[filterKey] &&
              filterKey !== "page" &&
              !p[filterKey].toLowerCase().includes(f[filterKey].toLowerCase())
            ) {
              keepItem = false;
            }
          });
          return keepItem;
        })
        .slice(f.page, (f.page + 1) * this.pageItems);
    });
  }

  setFavourite(id) {
    this.filteredList[id] = {
      ...this.filteredList[id],
      favourite: !this.filteredList[id].favourite
    };
  }
}
