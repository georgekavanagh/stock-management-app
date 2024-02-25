import { Injectable, inject } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageService {
  private apiService = inject(ApiService);

  uploadImage(formData: any): Observable<any> {
    const url = "api/Image";
    return this.apiService.post(url, formData);
  }

  deleteImage(imageId: number): Observable<any> {
    const url = `api/Image/${imageId}`;
    return this.apiService.delete(url);
  }
}
