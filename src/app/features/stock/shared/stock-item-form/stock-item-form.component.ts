import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputNumberModule } from "primeng/inputnumber";
import { MultiSelectModule } from "primeng/multiselect";
import { TooltipModule } from "primeng/tooltip";
import { CommonModule } from "@angular/common";
import { accessories } from "../../../../shared/data/accessories";
import { StockItem } from "../../../../shared/models/stock-item.model";

@Component({
  selector: "app-stock-item-form",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    MultiSelectModule,
    TooltipModule,
  ],
  templateUrl: "./stock-item-form.component.html",
  styleUrl: "./stock-item-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockItemFormComponent implements OnInit {
  form: FormGroup;
  currentYear = new Date().getFullYear();
  accessoryList = accessories;

  private fb = inject(FormBuilder);

  @Input() loading: { value: boolean } = { value: false };
  @Input() itemToEdit: StockItem | null = null;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.updateFormWithStockItem();
  }

  createForm() {
    return this.fb.group({
      regNo: ["", [Validators.required]],
      make: ["", [Validators.required]],
      model: ["", [Validators.required]],
      modelYear: [
        "",
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(this.currentYear + 2),
        ],
      ],
      kms: [
        "",
        [Validators.required, Validators.min(0), Validators.max(999999)],
      ],
      colour: ["", [Validators.required]],
      vinNo: ["", [Validators.required]],
      retailPrice: [0, [Validators.required, Validators.min(0)]],
      costPrice: [0, [Validators.required, Validators.min(0)]],
      accessories: [[]],
      images: [[]],
    });
  }

  updateFormWithStockItem() {
    if (this.itemToEdit) {
      const formatted = {
        ...this.itemToEdit,
        accessories: this.itemToEdit.accessories.map((item) => ({
          description: item.description,
          value: item.description,
        })),
      };
      this.form.patchValue(formatted);
    }
  }

  handleSubmit() {
    if (this.form.valid) {
      const formData = {
        id: this.itemToEdit?.id,
        ...this.form.value,
        kms: this.form.value.kms.toString(),
        modelYear: this.form.value.modelYear.toString(),
        accessories: this.form.get("accessories")?.value.map((item: any) => {
          return { description: item.description };
        }),
      };
      if (!this.itemToEdit) {
        delete formData.id;
      }
      //emit form data to parent component
      this.onSubmit.emit(formData);
    }
  }

  handleCancel() {
    //emit cancel event to parent component
    this.onCancel.emit(this.itemToEdit);
  }
}
