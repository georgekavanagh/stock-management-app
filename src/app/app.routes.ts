import { Routes } from "@angular/router";
import { ListComponent } from "./features/stock/list/list.component";
import { addEditStockItemResolver } from "./shared/resolvers/stock-item.resolver";

export const routes: Routes = [
  {
    path: "stock",
    children: [
      {
        path: "list",
        component: ListComponent,
      },
      {
        path: "create",
        loadComponent: () =>
          import("./features/stock/create/create.component").then(
            (m) => m.CreateComponent
          ),
      },
      {
        path: "edit/:id",
        loadComponent: () =>
          import("./features/stock/create/create.component").then(
            (m) => m.CreateComponent
          ),
        resolve: { data: addEditStockItemResolver },
      },
      { path: "", redirectTo: "list", pathMatch: "full" },
    ],
  },
  { path: "", redirectTo: "stock", pathMatch: "full" },
];
