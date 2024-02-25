import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authGuard = () => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem("token");

  if (isAuthenticated) {
    return true;
  } else {
    return router.navigateByUrl("/login");
  }
};
