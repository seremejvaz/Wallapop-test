import { Component, OnInit, Input } from "@angular/core";
import { ProductService } from "../product.service";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.scss"]
})
export class SortComponent implements OnInit {
  public sorters = null;
  public sortersArray = ["title", "description", "price", "email"];

  constructor(private productService: ProductService) {}
  @Input() sortItem: string;
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
