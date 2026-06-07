import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(item: any, categoryId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?categoryId=${categoryId}`, item);
  }

  update(id: number, item: any, categoryId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}?categoryId=${categoryId}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}