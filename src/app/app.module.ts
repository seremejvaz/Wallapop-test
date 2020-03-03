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
import { FavouritesModalComponent } from "./home/product-list/favourites-modal/favourites-modal.component";
import { ModalService } from "./home/product-list/favourites-modal/modal.service";
import { SortComponent } from "./home/sort/sort.component";
import { LoadingComponent } from "./home/product-list/loading/loading.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    FiltersComponent,
    ProductComponent,
    FavouritesModalComponent,
    SortComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule {}
