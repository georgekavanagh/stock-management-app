import { Routes } from "@angular/router";
import { ListComponent } from "./features/stock/list/list.component";

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
      { path: "", redirectTo: "list", pathMatch: "full" },
    ],
  },
  { path: "", redirectTo: "stock", pathMatch: "full" },
];
