import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { of } from "rxjs";
import { StockItemService } from "../services/stock-item.service";

export const addEditStockItemResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = Number(route.paramMap.get("id"));
  if (!id || isNaN(id)) {
    return of(null);
  }

  return inject(StockItemService).getStockItemById(id);
};
