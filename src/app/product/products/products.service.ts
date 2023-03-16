import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PRODUCTS } from "./PRODUCTS";
import { ProductsData } from "./products.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getMockProducts() {
    return PRODUCTS;
  }

  getProducts() {
    return this.http.get<ProductsData>("/assets/products.json");
  }
}
