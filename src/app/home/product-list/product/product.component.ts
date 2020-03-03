import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Product } from "src/types";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() fav: boolean;
  @Output() favourited = new EventEmitter<boolean>();

  constructor() {}

  getFavouritedIcon = () => {
    return this.fav ? "favorite" : "favorite_border";
  };

  favourite(id) {
    this.favourited.emit(id);
  }
  ngOnInit(): void {}
}
