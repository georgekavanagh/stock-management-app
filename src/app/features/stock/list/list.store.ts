import { Injectable, inject } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { StockItem } from "../../../shared/models/stock-item.model";
import { ApiService } from "../../../shared/services/api.service";
import { PaginationModel } from "../../../shared/models/pagination.model";
import { SortModel } from "../../../shared/models/sort.model";
import { FilterModel } from "../../../shared/models/filter.model";
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  retry,
  switchMap,
  tap,
} from "rxjs/operators";
import { EMPTY, Observable } from "rxjs";

interface ListState {
  list: StockItem[];
  totalCount: number;
  loading: boolean;
  error: any;
}

interface ListParams {
  pagination: PaginationModel;
  sort: SortModel;
  filters: FilterModel;
}

@Injectable()
export class ListStore extends ComponentStore<ListState> {
  readonly list$ = this.select((state) => state.list);
  readonly totalCount$ = this.select((state) => state.totalCount);
  readonly loading$ = this.select((state) => state.loading);
  readonly error$ = this.select((state) => state.error);
  private apiService = inject(ApiService);

  constructor() {
    super({
      list: [],
      totalCount: 0,
      loading: false,
      error: null,
    });
  }

  getList = this.effect(
    (paginationAndSortAndFilters$: Observable<ListParams>) =>
      paginationAndSortAndFilters$.pipe(
        tap(() => this.patchState({ loading: true })),

        debounceTime(3000),
        distinctUntilChanged(),
        switchMap(({ pagination, sort, filters }: ListParams) =>
          this.apiService.getStockItems(pagination, sort, filters).pipe(
            retry(2),
            tap({
              next: (result: { totalCount: number; stockItems: StockItem[] }) =>
                this.patchState({
                  list: result.stockItems,
                  totalCount: result.totalCount,
                }),
              error: (err) => this.patchState({ error: err }),
              finalize: () => this.patchState({ loading: false }),
            }),
            catchError(() => EMPTY)
          )
        )
      )
  );

  deleteStockItem = this.effect((stockItemId$: Observable<number>) =>
    stockItemId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((stockItemId: number) =>
        this.apiService.deleteStockItem(stockItemId).pipe(
          tap({
            next: () => {},
            error: (err) => this.patchState({ error: err }),
            finalize: () => this.patchState({ loading: false }),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
