import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ProductService } from "./product.service";

describe("ProductService", () => {
  let httpClientSpy: { get: jasmine.Spy };
  let productService: ProductService;
  beforeEach(() => {
    window.localStorage.clear();
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    productService = new ProductService(<any>httpClientSpy);
  });

  it("should be created", () => {
    expect(productService).toBeTruthy();
  });

  it("should start with loading false", () => {
    expect(productService.loading).toBeFalsy();
  });
  it("should call http.get if there is no localStorage", () => {
    productService.getProducts();
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      "https://webpublic.s3-eu-west-1.amazonaws.com/tech-test/items.json"
    );
  });
  it("should set loading to true when calling getProducts", () => {
    window.localStorage.setItem("cache", JSON.stringify({ items: [] }));
    productService.getProducts();
    expect(productService.loading).toBeTruthy();
  });

  it("should NOT call http.get if there is data in local storage", () => {
    window.localStorage.setItem("cache", JSON.stringify({ items: [] }));
    productService.getProducts();
    expect(httpClientSpy.get).not.toHaveBeenCalled();
  });
});
