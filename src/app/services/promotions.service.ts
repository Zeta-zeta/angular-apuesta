import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {
  private apiUrl = 'http://localhost:8090/api/promocion'
  constructor(private http: HttpClient) {}

  getPromociones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}

