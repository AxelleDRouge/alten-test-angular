import { Component, OnInit } from "@angular/core";
import { MessageService, PrimeNGConfig, SelectItem } from "primeng/api";
import { Product, ProductsData } from "../products/products.model";
import { ProductsService } from "../products/products.service";

@Component({
  selector: "app-products-admin",
  templateUrl: "./products-admin.component.html",
  providers: [MessageService],
  styleUrls: ["./products-admin.component.scss"],
})
export class ProductsAdminComponent implements OnInit {
  products: Product[];
  product: Product;
  selectedProducts: Product[];
  sortOrder: number;
  sortField: string;
  clonedProducts: { [s: string]: Product } = {};
  submitted: boolean;
  newField: boolean;

  constructor(
    private productsService: ProductsService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: ProductsData) => {
      this.products = data.data;
    });

    this.primengConfig.ripple = true;
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf("!") === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(product: Product) {
    delete this.clonedProducts[product.id];
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Product is updated",
    });
  }

  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.id];
    delete this.products[product.id];
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.newField = true;
  }

  cancelNew() {
    this.newField = false;
  }

  onRowCreateSave(product: Product) {
    this.products.push(product);
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Product is created",
    });
  }

  deleteSelectedProducts() {
    this.products = this.products.filter(
      (val) => !this.selectedProducts.includes(val)
    );
  }

  selectProduct(product: Product) {
    this.selectedProducts.push(product);
  }

  selectProducts() {
    this.selectedProducts.concat(this.products);
  }

  editProduct(product: Product) {
    this.product = { ...product };
  }

  deleteProduct(product: Product) {
    this.products = this.products.filter((val) => val.id !== product.id);
  }

  createProduct(product: Product) {
    product.id = this.createId();
    product.image = "product-placeholder.svg";
    this.products.push(product);
    this.messageService.add({
      severity: "success",
      summary: "Successful",
      detail: "Product Created",
      life: 3000,
    });
    this.newField = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = "product-placeholder.svg";
        this.products.push(this.product);
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = "";
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
