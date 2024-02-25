import { Injectable, inject } from "@angular/core";
import { PaginationModel } from "../models/pagination.model";
import { SortModel } from "../models/sort.model";
import { FilterModel } from "../models/filter.model";
import { Observable } from "rxjs";
import { StockItem } from "../models/stock-item.model";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class StockItemService {
  private apiService = inject(ApiService);

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
    const url = `api/StockItems?${new URLSearchParams(urlObject)}`;
    return this.apiService.get<{ totalCount: number; stockItems: StockItem[] }>(
      url
    );
  }

  getStockItemById(id: number): Observable<StockItem> {
    const url = `api/StockItems/${id}`;
    return this.apiService.get<StockItem>(url);
  }

  createStockItem(formData: any): Observable<StockItem> {
    const url = "api/StockItems";
    return this.apiService.post<StockItem>(url, formData);
  }

  updateStockItem(formData: any): Observable<StockItem> {
    const url = `api/StockItems/${formData.id}`;
    return this.apiService.put<StockItem>(url, formData);
  }

  deleteStockItem(stockItemId: number): Observable<any> {
    const url = `api/StockItems/${stockItemId}`;
    return this.apiService.delete(url);
  }
}
