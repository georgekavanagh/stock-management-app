import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";

interface Credentials {
  email: string;
  password: string;
}

interface JWT {
  token: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiService = inject(ApiService);

  logIn(credentials: Credentials): Observable<JWT> {
    const url = "api/Auth/login";
    return this.apiService.post<JWT>(url, credentials);
  }
}
