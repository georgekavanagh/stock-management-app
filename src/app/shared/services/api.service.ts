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

  createStockItem(formData: any): Observable<StockItem> {
    return this.http.post<StockItem>(`${this.APIURL}/api/StockItems`, formData);
  }
}
