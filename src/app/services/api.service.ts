import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Diagram } from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getDiagram(id: string): Observable<Diagram> {
    return this.http.get<Diagram>(`/diagrams/${id}`).pipe(
        catchError(error => throwError(error))
    );
  }

  saveDiagram(diagram: Diagram): Observable<Diagram> {
    return this.http.post<Diagram>('/diagrams', diagram).pipe(
        catchError(error => throwError(error))
    );
  }

  editDiagram(diagram: Diagram): Observable<Diagram> {
    return this.http.put<Diagram>(`/diagrams/${diagram._id}`, diagram).pipe(
        catchError(error => throwError(error))
    );
  }

  publishDiagram(id: string): Observable<Diagram> {
    return this.http.put<Diagram>(`/diagrams/publish/${id}`, null).pipe(
        catchError(error => throwError(error))
    );
  }
}
