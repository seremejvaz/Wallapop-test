import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductListComponent } from "./product-list.component";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ProductService } from "../product.service";
import { of } from "rxjs";

describe("ProductListComponent", () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let httpTestingController: HttpTestingController;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async(() => {
    productServiceSpy = jasmine.createSpyObj("ProductService", [
      "getFilters",
      "getProducts",
      "setLoadingState"
    ]);
    productServiceSpy.getProducts.and.returnValue(of({ items: [{}, {}] }));
    productServiceSpy.getFilters.and.returnValue(
      of({
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
      })
    );

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [{ provide: ProductService, useValue: productServiceSpy }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // loadProducts

  it("should fill list with products returned by productService", () => {
    component.list = [];
    component.loadProducts();
    expect(component.list.length).toBe(2);
  });

  it("should call loadProducts on init", () => {
    const spy = spyOn(component, "ngOnInit");
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it("should call productService.getProducts when loading products", () => {
    component.loadProducts();
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
  });

  it("should call getFilteresProducts function", () => {
    const spy = spyOn(component, "getFilteredProducts");
    component.loadProducts();
    expect(spy).toHaveBeenCalled();
  });

  it("should return an error when the server returns a 404", () => {
    productServiceSpy.getProducts.and.throwError(
      "There has been an error getting the products."
    );
  });

  // getFilteredProducts

  it("should call productService.getFilters when set filters", () => {
    component.getFilteredProducts();
    expect(productServiceSpy.getFilters).toHaveBeenCalled();
  });

  it("should call filterProducts function", () => {
    const spy = spyOn(component, "filterProducts");
    component.getFilteredProducts();
    expect(spy).toHaveBeenCalled();
  });

  it("should call sortProducts function", () => {
    const spy = spyOn(component, "sortProducts");
    component.getFilteredProducts();
    expect(spy).toHaveBeenCalled();
  });

  it("should change loading state to false", () => {
    component.getFilteredProducts();
    expect(productServiceSpy.setLoadingState).toHaveBeenCalledWith(false);
  });
});
