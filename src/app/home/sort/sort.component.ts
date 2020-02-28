import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.scss"]
})
export class SortComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  sortBy(item) {
    this.productService.sortBy(item);
  }
}
