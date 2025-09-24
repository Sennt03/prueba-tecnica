import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LsProduct, LsResAll, LsResCreate, LsResMessage } from '@models/products.models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = `${environment.url_api}/products`

  private http = inject(HttpClient)

  validateAvaibleId(id: string | number): Observable<boolean>{
    return this.http.get<boolean>(`${this.url}/verification/${id}`)
  }

  getAll(): Observable<LsResAll>{
    return this.http.get<LsResAll>(this.url)
  }

  createProduct(product: LsProduct): Observable<LsResCreate>{
    return this.http.post<LsResCreate>(this.url, product)
  }

  editProduct(id: string, product: LsProduct): Observable<LsResCreate>{
    return this.http.put<LsResCreate>(`${this.url}/${id}`, product)
  }

  deleteProduct(id: string): Observable<LsResMessage>{
    return this.http.delete<LsResMessage>(`${this.url}/${id}`)
  }
}
