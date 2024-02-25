import { Component, inject } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./ui/components/navbar/navbar.component";
import { filter } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: "./app.component.html",
  styles: [
    `
      .full-screen-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto !important;
      }
    `,
  ],
})
export class AppComponent {
  title = "stock-management-app";
  isLoginPage: boolean = true;

  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.isLoginPage = event.url === "/login" || event.url === "/";
      });
  }
}
