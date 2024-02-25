import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // readonly APIURL = "http://localhost:5067";
  readonly APIURL =
    "https://stockmanagementapi20240225181857.azurewebsites.net";
  private http = inject(HttpClient);

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.APIURL}/${url}`);
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.APIURL}/${url}`, data);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.APIURL}/${url}`, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.APIURL}/${url}`);
  }
}
