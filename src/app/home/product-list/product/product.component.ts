import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "src/types";
import { ProductService } from "../../product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() favourited = new EventEmitter<boolean>();

  constructor(private productService: ProductService) {}
  favourite(id) {
    this.favourited.emit(id);
  }
  ngOnInit(): void {}
}
