import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
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
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ConfirmationService, MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ImageModule } from "primeng/image";

@Component({
  selector: "app-list",
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ImageModule,
  ],
  providers: [ListStore, MessageService, ConfirmationService],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  private store = inject(ListStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

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
    sortOrder: "desc",
  };

  paginationObject: PaginationModel = {
    pageNumber: "0",
    pageSize: "8",
  };
  tableLoading: boolean = false;

  constructor() {
    this.error$.pipe(takeUntilDestroyed()).subscribe((error) => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Oops! Something went wrong",
      });
    });
  }

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
    this.router.navigate(["../edit", id], { relativeTo: this.route });
  }

  createRecord() {
    this.router.navigate(["../create"], { relativeTo: this.route });
  }

  deleteRecord({ id }: StockItem) {
    this.confirmationService.confirm({
      header: "Are you sure you would like to delete this record?",
      message: "Please confirm to proceed.",
      accept: () => {
        if (id) {
          this.store.deleteStockItem(id);
          this.getList();
        }
      },
      reject: () => {},
    });
  }
}
