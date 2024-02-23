import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { ApiService } from "../services/api.service";
import { of } from "rxjs";

export const addEditStockItemResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = Number(route.paramMap.get("id"));
  if (!id || isNaN(id)) {
    return of(null);
  }

  return inject(ApiService).getStockItemById(id);
};
