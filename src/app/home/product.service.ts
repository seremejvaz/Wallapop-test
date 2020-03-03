import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, of } from "rxjs";
import { API_URL } from "../constants/constants";
import { CACHE_KEY } from "../constants/constants";
import { FILTERS_SORTERS_DEFAULT } from "../constants/constants";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private filtersSource = new BehaviorSubject<any>(FILTERS_SORTERS_DEFAULT);
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
