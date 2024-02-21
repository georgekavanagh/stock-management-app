import { Component, OnInit, inject } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { InputTextModule } from "primeng/inputtext";
import { ListStore } from "./list.store";
import { CommonModule } from "@angular/common";
import { StockItem } from "../../../shared/models/stock-item.model";
import { FilterModel } from "../../../shared/models/filter.model";
import { SortModel } from "../../../shared/models/sort.model";
import { PaginationModel } from "../../../shared/models/pagination.model";
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    InputTextModule,
  ],
  providers: [ListStore],
  templateUrl: "./list.component.html",
  styles: ``,
})
export class ListComponent implements OnInit {
  private store = inject(ListStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  totalCount: number = 7;

  list$ = this.store.list$;
  totalCount$ = this.store.totalCount$;
  error$ = this.store.error$;
  loading$ = this.store.loading$;

  filterObj: FilterModel = {
    colour: "",
    kms: "",
    make: "",
    model: "",
    modelYear: "",
    regNoFilter: "",
    vinNo: "",
  };

  sortObject: SortModel = {
    sortBy: "Id",
    sortOrder: "asc",
  };

  paginationObject: PaginationModel = {
    pageNumber: "0",
    pageSize: "10",
  };
  tableLoading: boolean = false;

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.store.getList({
      pagination: this.paginationObject,
      sort: this.sortObject,
      filters: this.filterObj,
    });
  }

  onSort(event: any) {
    console.log(event);
    this.sortObject.sortBy = event.field;
    this.sortObject.sortOrder = event.order == 1 ? "asc" : "desc";
    this.getList();
  }

  onPaginate(event: any) {
    const pageNumber = Math.floor(event.first / event.rows);
    this.paginationObject.pageNumber = pageNumber.toString();
    this.getList();
  }

  applyFilter(event: any, fieldToFilter: string) {
    this.filterObj[fieldToFilter] = event.target.value;
    this.getList();
  }

  getVehiclePrimaryImage(item: StockItem) {
    if (item && item.images.length === 0) {
      return;
    }
    return `data:image/jpeg;base64,${item.images[0].imageData}`;
  }

  editRecord({ id }: StockItem) {
    this.router.navigate(["../edit"]);
  }

  createRecord() {
    this.router.navigate(["../create"], { relativeTo: this.route });
  }
}
