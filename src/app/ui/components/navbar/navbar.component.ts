import { Component, OnInit, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [RouterModule, MenuModule, ButtonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  private router = inject(Router);

  ngOnInit() {
    this.items = [
      {
        label: "Log Out",
        icon: "pi pi-power-off",
        command: () => {
          this.logOut();
        },
      },
    ];
  }

  logOut() {
    window.localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
