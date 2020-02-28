import { Component, OnInit, Inject } from "@angular/core";
import { ProductService } from "../product.service";
import { FavouritesModalComponent } from "./favourites-modal/favourites-modal.component";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  private filters = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getFilters();
  }

  getFilters() {
    this.productService.getFilters().subscribe(f => {
      this.filters = f;
    });
  }

  setFilters(key, value) {
    this.productService.setFilters({ ...this.filters, [key]: value });
  }

  openDialog() {
    this.dialog.open(FavouritesModalComponent, { data: "hola" });
  }

  loadMore() {
    this.productService.setFilters({
      ...this.filters,
      page: this.filters.page + 1
    });
  }
}
