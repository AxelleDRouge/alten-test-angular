import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductsComponent } from "./products/products.component";
import { ProductsAdminComponent } from "./products-admin/products-admin.component";

import { DataViewModule } from "primeng/dataview";
import { ButtonModule } from "primeng/button";
import { PanelModule } from "primeng/panel";
import { DropdownModule } from "primeng/dropdown";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";

@NgModule({
  declarations: [ProductsComponent, ProductsAdminComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DataViewModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    RatingModule,
    RippleModule,
    FormsModule,
    TableModule,
    ToastModule,
    ToolbarModule,
  ],
})
export class ProductModule {}
