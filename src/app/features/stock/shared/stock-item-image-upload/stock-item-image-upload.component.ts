import { CommonModule } from "@angular/common";
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FileUploadModule, FileUploadHandlerEvent } from "primeng/fileupload";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "app-stock-item-image-upload",
  standalone: true,
  imports: [CommonModule, FileUploadModule, TooltipModule],
  templateUrl: "./stock-item-image-upload.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockItemImageUploadComponent {
  @Input() loading: { value: boolean } = { value: false };
  @Output() onUpload: EventEmitter<any> = new EventEmitter<any>();

  handleUpload(event: FileUploadHandlerEvent) {
    if (event && event.files[0]) {
      this.onUpload.emit(event.files[0]);
    }
  }
}
