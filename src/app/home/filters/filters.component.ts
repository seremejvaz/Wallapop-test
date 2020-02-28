import { Component, OnInit, Inject } from "@angular/core";
import { ProductService } from "../product.service";
import { FavouritesModalComponent } from "./favourites-modal/favourites-modal.component";
import { ModalService } from "./favourites-modal/modal.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  private filters = null;

  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) {}

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
    this.modalService.openModal();
  }

  loadMore() {
    this.productService.setFilters({
      ...this.filters,
      page: this.filters.page + 1
    });
  }
}
