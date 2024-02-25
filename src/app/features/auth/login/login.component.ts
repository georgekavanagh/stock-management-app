import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { ButtonModule } from "primeng/button";
import { AuthService } from "../../../shared/services/auth.service";
import { CommonModule } from "@angular/common";
import { ToastModule } from "primeng/toast";
import { first } from "rxjs";
import { MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: "./login.template.html",
  styles: ``,
})
export class LoginComponent {
  form: FormGroup;
  loading: boolean = false;

  private fb = inject(FormBuilder);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  constructor() {
    this.form = this.createForm();
  }

  createForm() {
    return this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  logIn() {
    if (this.form.valid) {
      this.loading = true;
      this.authService
        .logIn(this.form.value)
        .pipe(first())
        .subscribe({
          next: (result) => {
            // Handle successful result
            window.localStorage.setItem("token", result.token);
            this.router.navigate(["/stock/list"], { relativeTo: this.route });
            this.loading = false;
          },
          error: (err) => {
            console.log(err);
            // Handle error
            this.loading = false;
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.error,
            });
          },
        });
    }
  }
}
