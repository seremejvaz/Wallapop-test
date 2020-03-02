import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, of } from "rxjs";
import { Product } from "src/types";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private products: Product[] = [];
  private filtersSource = new BehaviorSubject<any>({
    filters: {
      title: "",
      description: "",
      price: "",
      email: "",
      page: 0
    },
    sorters: {
      key: "",
      dir: 1
    }
  });
  private filters$ = this.filtersSource.asObservable();

  constructor(private http: HttpClient) {}

  public getProducts() {
    if (!window.localStorage.getItem("cache")) {
      return this.http.get(
        "https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/items.json"
      );
    } else {
      return of(JSON.parse(window.localStorage.getItem("cache")));
    }
  }

  public getFilters() {
    return this.filters$;
  }

  public setFilters(newFilters) {
    this.filtersSource.next(newFilters);
  }

  public setFavourite(id: string) {}
}
