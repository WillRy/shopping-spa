import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory, Product, ProductPhoto } from 'src/app/model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductPhotoHttpService {

  private baseAPI = `${environment.api.url}`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  list(productId: number): Observable<{product: Product, photos: ProductPhoto[]}> {
    return this.http.get < {data: any }> (this.getBaseUrl(productId)).pipe(
      map(response => response.data)
    );
  }

  create(productId: number, files: FileList): Observable<{product: Product, photos: ProductPhoto[]}> {
    const formData =  new FormData();
    const filesArray = Array.from(files);
    filesArray.forEach((file) => {
      formData.append('photos[]', file);
    });
    return this.http.post<any>(this.getBaseUrl(productId), formData);

  }
  private getBaseUrl(productId: number, categoryId: number = null): string {
    let baseUrl = `${this.baseAPI}/products/${productId}/photos`;
    if (categoryId) {
      baseUrl += `/${categoryId}`;
    }
    return baseUrl;
  }

}
