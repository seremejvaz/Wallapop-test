import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "src/types";
import { ModalService } from "./favourites-modal/modal.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  public list = [];
  public filteredList = [];
  public pageItems = 5;

  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) {}

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
          Object.keys(f.filters).map(filterKey => {
            if (
              f.filters[filterKey] &&
              filterKey !== "page" &&
              !p[filterKey]
                .toLowerCase()
                .includes(f.filters[filterKey].toLowerCase())
            ) {
              keepItem = false;
            }
          });
          return keepItem;
        })
        .slice(f.filters.page, (f.filters.page + 1) * this.pageItems)
        .sort((a, b) => {
          if (f.sorters.key === "price") {
            a.price = parseInt(a.price);
            b.price = parseInt(b.price);
          }
          if (a[f.sorters.key] < b[f.sorters.key]) {
            return f.sorters.dir * -1;
          }
          if (a[f.sorters.key] > b[f.sorters.key]) {
            return f.sorters.dir;
          }
          return 0;
        });
    });
  }

  setFavourite(id) {
    this.filteredList[id] = {
      ...this.filteredList[id],
      favourite: !this.filteredList[id].favourite
    };
  }

  getIsOpenModal() {
    return this.modalService.getIsOpenModal();
  }

  getFavourites() {
    return this.filteredList.filter(item => {
      return item.favourite === true;
    });
  }
}
