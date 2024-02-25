import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiService = inject(ApiService);

  getUserById(id: number): Observable<User> {
    const url = `api/User/${id}`;
    return this.apiService.get<User>(url);
  }
}
