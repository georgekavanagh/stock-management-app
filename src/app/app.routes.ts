import { Routes } from "@angular/router";
import { ListComponent } from "./features/stock/list/list.component";
import { addEditStockItemResolver } from "./shared/resolvers/stock-item.resolver";
import { LoginComponent } from "./features/auth/login/login.component";
import { authGuard } from "./shared/guards/auth.guard";

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "stock",
    children: [
      {
        path: "list",
        loadComponent: () =>
          import("./features/stock/list/list.component").then(
            (m) => m.ListComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: "create",
        loadComponent: () =>
          import("./features/stock/create/create.component").then(
            (m) => m.CreateComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import("./features/stock/create/create.component").then(
            (m) => m.CreateComponent
          ),
        canActivate: [authGuard],
        resolve: { data: addEditStockItemResolver },
      },

      { path: "", redirectTo: "stock", pathMatch: "full" },
    ],
  },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "**",
    loadComponent: () =>
      import("./ui/pages/not-found/not-found.component").then(
        (m) => m.NotFoundComponent
      ),
  },
];
