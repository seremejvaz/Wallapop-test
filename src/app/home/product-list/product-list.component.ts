import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "src/types";
import { ModalService } from "./favourites-modal/modal.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CACHE_KEY } from "../../constants/constants";
import { v4 as uuidv4 } from "uuid";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  public list = [];
  public favouriteList = {};
  public filteredList = [];
  public pageItems = 5;

  constructor(
    private productService: ProductService,
    private modalService: ModalService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: { items: Product[] }) => {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        this.list = data.items.map(item => {
          return { ...item, id: uuidv4(), price: parseInt(item.price) };
        });

        this.getFilteredProducts();
      },
      err => {
        this.productService.setLoadingState(false);
        this.openSnackBar(
          `Error ${err.status}. There has been an error getting the products.`
        );
      }
    );
  }

  getFilteredProducts() {
    this.productService.getFilters().subscribe(f => {
      this.filteredList = this.list
        .filter(p => {
          return this.filterProducts(f, p);
        })
        .slice(0, (f.filters.page + 1) * this.pageItems)
        .sort((a, b) => this.sortProducts(f, a, b));
    });
    this.productService.setLoadingState(false);
  }

  sortProducts(f, a, b) {
    if (a[f.sorters.key] < b[f.sorters.key]) {
      return f.sorters.dir * -1;
    }
    if (a[f.sorters.key] > b[f.sorters.key]) {
      return f.sorters.dir;
    }
    return 0;
  }

  filterProducts(f, p: Product) {
    let keepItem = true;

    Object.keys(f.filters)
      .filter(v => f.filters[v] && v !== "page")
      .map(filterKey => {
        if (filterKey === "price" && f.filters[filterKey]) {
          if (p.price !== f.filters.price) {
            keepItem = false;
            return;
          }
        } else {
          if (
            f.filters[filterKey] &&
            filterKey !== "page" &&
            !p[filterKey]
              .toLowerCase()
              .includes(f.filters[filterKey].toLowerCase())
          ) {
            keepItem = false;
            return;
          }
        }
      });
    return keepItem;
  }

  setFavourite(id) {
    this.favouriteList[id] = !this.favouriteList[id];
  }

  getIsOpenModal() {
    return this.modalService.getIsOpenModal();
  }

  getFavourites() {
    return this.filteredList.filter(item => {
      return this.favouriteList[item.id];
    });
  }

  getIsLoading() {
    return this.productService.loading;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 5000,
      horizontalPosition: "right"
    });
  }
}
