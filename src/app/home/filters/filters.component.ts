import { Component, OnInit, Input } from "@angular/core";
import { ProductService } from "../product.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"]
})
export class FiltersComponent implements OnInit {
  private filters = [];
  private activeFilter = "";

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getFilters();
  }

  getFilters() {
    this.filters = this.productService.getFilters();
  }

  setFilter(value) {
    this.productService.setActiveFilter(value);
  }
}
