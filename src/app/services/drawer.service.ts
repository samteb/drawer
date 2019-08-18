import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Shape } from '../models';

@Injectable({ providedIn: 'root' })
export class DrawerService {
  private shapeSource = new Subject<Shape>();
  private viewerModeSource = new Subject<boolean>();

  shape$ = this.shapeSource.asObservable();
  viewerMode$ = this.viewerModeSource.asObservable();

  addShape(shape: Shape) {
    this.shapeSource.next(shape);
  }

  isViewMode(isViewMode: boolean) {
    this.viewerModeSource.next(isViewMode);
  }
}
