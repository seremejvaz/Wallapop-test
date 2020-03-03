import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, of } from "rxjs";
import { Product } from "src/types";
import { API_URL } from "../constants/constants";
import { CACHE_KEY } from "../constants/constants";

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

  public loading: boolean = false;

  constructor(private http: HttpClient) {}

  public getProducts() {
    this.loading = true;
    if (!window.localStorage.getItem(CACHE_KEY)) {
      return this.http.get(API_URL);
    } else {
      return of(JSON.parse(window.localStorage.getItem(CACHE_KEY)));
    }
  }

  public getFilters() {
    return this.filters$;
  }

  public setFilters(newFilters) {
    this.filtersSource.next(newFilters);
  }

  public setFavourite(id: string) {}

  public setLoadingState(state) {
    this.loading = state;
  }
}
