import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Diagram, Shape } from '../models';

@Injectable({ providedIn: 'root' })

export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    return throwError(error);
  }

  getDiagram(id: string): Observable<Diagram> {
    return this.http.get<Diagram>(`diagrams/${id}`).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  saveDiagram(shapes: Shape[]): Observable<Diagram> {
    return this.http.post<Diagram>('diagrams', shapes).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  editDiagram(diagram: Diagram): Observable<Diagram> {
    return this.http.put<Diagram>(`diagrams/${diagram._id}`, diagram).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  publishDiagram(id: string): Observable<Diagram> {
    return this.http.put<Diagram>(`diagrams/publish/${id}`, null).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
}
