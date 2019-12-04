import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { DiagramResolve } from '../../models';

@Injectable({ providedIn: 'root' })
export class ViewerResolve implements Resolve<DiagramResolve> {
    constructor(private apiService: ApiService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<DiagramResolve> {
        return this.apiService.getDiagram(route.params.id).pipe(
            map(diagram => ({ diagram })),
            catchError(error => of({ diagram: null, error }))
        );
    }
}
