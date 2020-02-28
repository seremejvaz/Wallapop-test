import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ProductListComponent } from "./home/product-list/product-list.component";
import { FiltersComponent } from "./home/filters/filters.component";
import { ProductComponent } from "./home/product-list/product/product.component";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { FavouritesModalComponent } from "./home/filters/favourites-modal/favourites-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    FiltersComponent,
    ProductComponent,
    FavouritesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    NoopAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
