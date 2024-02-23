import { CommonModule } from "@angular/common";
import { ImageModule } from "primeng/image";
import { ButtonModule } from "primeng/button";
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import { Image } from "../../../../shared/models/image.model";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { StockItem } from "../../../../shared/models/stock-item.model";

@Component({
  selector: "app-stock-item-image-list",
  standalone: true,
  imports: [CommonModule, ImageModule, ButtonModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: "./stock-item-image-list.component.html",
  styleUrl: "./stock-item-image-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockItemImageListComponent {
  private confirmationService = inject(ConfirmationService);
  @Input() stockItem: StockItem | null = null;
  @Input() loading: { value: boolean } = { value: false };
  @Output() onImageDelete: EventEmitter<any> = new EventEmitter<any>();

  trackById(index: number, image: Image) {
    return image.id;
  }

  handleDelete({ id }: Image) {
    this.confirmationService.confirm({
      header: "Are you sure you would like to delete this image?",
      message: "Please confirm to proceed.",
      accept: () => {
        if (id) {
          this.onImageDelete.emit(id);
        }
      },
      reject: () => {},
    });
  }
}
