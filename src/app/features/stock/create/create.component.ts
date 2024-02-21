import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { InputNumberModule } from "primeng/inputnumber";
import { MultiSelectModule } from "primeng/multiselect";
import { TooltipModule } from "primeng/tooltip";
import { accessories } from "../../../shared/data/accessories";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../shared/services/api.service";
import { first, take } from "rxjs";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-create",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    MultiSelectModule,
    TooltipModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: "./create.component.html",
  styleUrl: "./create.component.scss",
})
export class CreateComponent {
  loading: boolean = false;
  form: FormGroup;
  accessoryList = accessories;
  currentYear = new Date().getFullYear();
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private messageService = inject(MessageService);

  constructor() {
    this.form = this.fb.group({
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

  onSubmit() {
    if (this.form.valid) {
      const formData = {
        ...this.form.value,
        kms: this.form.value.kms.toString(),
        modelYear: this.form.value.modelYear.toString(),
        accessories: this.form.get("accessories")?.value.map((item: any) => {
          return { description: item.description };
        }),
      };
      this.loading = true;
      this.api
        .createStockItem(formData)
        .pipe(first())
        .subscribe({
          next: (result) => {
            // Handle successful result
            this.router.navigate(["../list"], { relativeTo: this.route });
          },
          error: (err) => {
            // Handle error
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Message Content",
            });
          },
          complete: () => {
            // Handle completion
            this.loading = false;
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(["../list"], { relativeTo: this.route });
  }
}
