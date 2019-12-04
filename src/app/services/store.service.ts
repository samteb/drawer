import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Diagram, Shape } from '../models';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private diagramSource = new BehaviorSubject<Diagram>({
    published: false,
    shapes: []
  });
  private viewModeSource = new BehaviorSubject<boolean>(false);

  public readonly diagram$ = this.diagramSource.asObservable();
  public readonly viewMode$ = this.viewModeSource.asObservable();

  setDiagram(diagram: Diagram) {
    this.diagramSource.next(diagram);
  }

  setViewMode(value: boolean) {
    this.viewModeSource.next(value);
  }
}
