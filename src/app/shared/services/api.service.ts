import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { PaginationModel } from "../models/pagination.model";
import { FilterModel } from "../models/filter.model";
import { SortModel } from "../models/sort.model";
import { StockItem } from "../models/stock-item.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  readonly APIURL = "http://localhost:5067";
  private http = inject(HttpClient);

  getStockItems(
    pagination: PaginationModel,
    sort: SortModel,
    filters: FilterModel
  ): Observable<{ totalCount: number; stockItems: StockItem[] }> {
    const urlObject = {
      ...pagination,
      ...sort,
      ...filters,
    };
    return this.http.get<{ totalCount: number; stockItems: StockItem[] }>(
      `${this.APIURL}/api/StockItems?${new URLSearchParams(urlObject)}`
    );
  }

  getStockItemById(id: number): Observable<StockItem> {
    return this.http.get<StockItem>(`${this.APIURL}/api/StockItems/${id}`);
  }

  createStockItem(formData: any): Observable<StockItem> {
    return this.http.post<StockItem>(`${this.APIURL}/api/StockItems`, formData);
  }

  updateStockItem(formData: any): Observable<StockItem> {
    return this.http.put<StockItem>(
      `${this.APIURL}/api/StockItems/${formData.id}`,
      formData
    );
  }

  uploadImage(formData: any): Observable<any> {
    return this.http.post(`${this.APIURL}/api/Image`, formData);
  }

  deleteImage(imageId: number): Observable<any> {
    return this.http.delete(`${this.APIURL}/api/Image/${imageId}`);
  }

  deleteStockItem(stockItemId: number): Observable<any> {
    return this.http.delete(`${this.APIURL}/api/StockItems/${stockItemId}`);
  }
}
