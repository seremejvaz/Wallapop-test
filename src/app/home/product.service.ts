import { Injectable } from "@angular/core";
import { Product } from "../../types";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor() {}

  getProducts(): Product[] {
    return [];
  }

  getFilters() {}

  setFilters(filter: string) {}

  setFavourite(id: string) {}

  getFavourites() {}
}
