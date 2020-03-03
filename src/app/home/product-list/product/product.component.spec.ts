import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ProductComponent } from "./product.component";
import { isRegExp } from "util";

describe("ProductComponent", () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = {
      email: "email@wallapop.com",
      title: "title",
      description: "description",
      image: "image",
      favourite: false,
      price: "110€",
      id: 5
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should favourite", () => {
    const spy = spyOn(component, "favourite");
    const button = fixture.debugElement.nativeElement.querySelector(
      ".favourite"
    );
    button.click();
    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalledWith(5);
    });
  });
});
