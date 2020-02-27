import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ProductListComponent } from "./home/product-list/product-list.component";
import { FiltersComponent } from "./home/filters/filters.component";
import { ProductComponent } from "./home/product-list/product/product.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    FiltersComponent,
    ProductComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
