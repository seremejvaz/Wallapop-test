import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.scss"]
})
export class SortComponent implements OnInit {
  private sorters = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getFilters();
  }

  getFilters() {
    this.productService.getFilters().subscribe(f => {
      this.sorters = f;
    });
  }

  sortBy(item) {
    this.productService.setFilters({
      ...this.sorters,
      sorters: {
        key: item,
        dir:
          this.sorters.sorters.key === item ? this.sorters.sorters.dir * -1 : 1
      }
    });
  }
}
