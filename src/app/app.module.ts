import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { ProductListComponent } from './home/product-list/product-list.component';
import { FiltersComponent } from './home/filters/filters.component';
import { ProductComponent } from './home/product-list/product/product.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ProductListComponent, FiltersComponent, ProductComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
