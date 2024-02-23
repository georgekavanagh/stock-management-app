import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { ToastModule } from "primeng/toast";
import { TabViewModule } from "primeng/tabview";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../shared/services/api.service";
import { first } from "rxjs";
import { MessageService } from "primeng/api";
import { StockItemFormComponent } from "../shared/stock-item-form/stock-item-form.component";
import { StockItem } from "../../../shared/models/stock-item.model";
import { CommonModule } from "@angular/common";
import { StockItemImageUploadComponent } from "../shared/stock-item-image-upload/stock-item-image-upload.component";
import { StockItemImageListComponent } from "../shared/stock-item-image-list/stock-item-image-list.component";
import { Image } from "../../../shared/models/image.model";

@Component({
  selector: "app-create",
  standalone: true,
  providers: [MessageService],
  templateUrl: "./create.component.html",
  styleUrl: "./create.component.scss",
  imports: [
    CommonModule,
    ToastModule,
    TabViewModule,
    StockItemFormComponent,
    StockItemImageUploadComponent,
    StockItemImageListComponent,
  ],
})
export class CreateComponent implements OnInit {
  loading: { value: boolean } = { value: false };
  deletingImage: { value: boolean } = { value: false };
  stockItemToEdit: StockItem | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    if (this.route.snapshot.data["data"]) {
      this.stockItemToEdit = this.route.snapshot.data["data"];
    }
  }

  onSubmit(data: any) {
    this.loading = { value: true };
    let subscription;
    if (data.id) {
      //Call edit stock item endpoint
      subscription = this.api.updateStockItem(data);
    } else {
      //Call create stock item endpoint
      subscription = this.api.createStockItem(data);
    }

    subscription.pipe(first()).subscribe({
      next: (result) => {
        // Handle successful result
        const relativeRoute: string = data.id ? "../../list" : "../list";
        this.router.navigate([relativeRoute], { relativeTo: this.route });
      },
      error: (err) => {
        // Handle error
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Oops! Something went wrong",
        });
      },
      complete: () => {
        // Handle completion
        this.loading = { value: false };
      },
    });
  }

  onCancel(data: any) {
    const relativeRoute: string = data ? "../../list" : "../list";
    this.router.navigate([relativeRoute], { relativeTo: this.route });
  }

  onUpload(file: any) {
    if (file && this.stockItemToEdit) {
      this.loading = { value: true };
      let formData = new FormData();
      formData.append("file", file);
      formData.append(
        "description",
        `${this.stockItemToEdit.regNo}: stock item image`
      );
      formData.append("stockItemId", String(this.stockItemToEdit.id));
      this.api
        .uploadImage(formData)
        .pipe(first())
        .subscribe({
          next: (result) => {
            // Handle successful result
            if (this.stockItemToEdit) {
              let newAray = [...this.stockItemToEdit.images, result];
              let obj = { ...this.stockItemToEdit, images: newAray };
              this.stockItemToEdit = obj;
            }
          },
          error: (err) => {
            // Handle error
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Oops! Something went wrong",
            });
          },
          complete: () => {
            // Handle completion
            this.loading = { value: false };
          },
        });
    }
  }

  onImageDelete(imageId: number) {
    if (imageId) {
      this.deletingImage = { value: true };
      this.api
        .deleteImage(imageId)
        .pipe(first())
        .subscribe({
          next: (result) => {
            console.log(result);
            // Handle successful result
            if (this.stockItemToEdit) {
              this.stockItemToEdit.images = this.stockItemToEdit.images.filter(
                (item) => item.id !== imageId
              );
              // Create a new array reference
              this.stockItemToEdit = { ...this.stockItemToEdit };
            }
          },
          error: (err) => {
            // Handle error
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Oops! Something went wrong",
            });
          },
          complete: () => {
            // Handle complete
            this.deletingImage = { value: false };
          },
        });
    }
  }
}
