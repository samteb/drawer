import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { DrawerService } from '../../services/drawer.service';
import { Shape, Shapes } from '../../models';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})

export class DrawerComponent implements OnInit, OnDestroy {
  shapesList: Shapes[] = [ Shapes.circle, Shapes.square, Shapes.triangle ];
  shapesDiagram: Shape[] = [];
  subscription: Subscription;
  constructor(
    private drawerService: DrawerService
  ) {
    this.subscription = drawerService.shape$.subscribe(shape => this.shapesDiagram.push(shape));
  }

  ngOnInit() {
    setTimeout(() => this.drawerService.isViewMode(false));
  }

  dragDrop(event: CdkDragDrop<Shapes[]>) {
    if (!event.isPointerOverContainer) {
      const newShape = {
        name: event.item.data,
        position: event.distance
      };
      this.drawerService.addShape(newShape);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
