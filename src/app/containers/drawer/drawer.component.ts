import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { StoreService } from '../../services/store.service';
import { Diagram, Shapes } from '../../models';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})

export class DrawerComponent implements OnInit {
  shapesList: Shapes[] = [ Shapes.circle, Shapes.square, Shapes.triangle ];
  diagram: Diagram;

  constructor(
      private storeService: StoreService
  ) {
    this.storeService.setViewMode(false);
  }

  ngOnInit() {
    this.storeService.diagram$.subscribe(diagram => this.diagram = diagram);
  }

  dragDrop(event: CdkDragDrop<Shapes[]>) {
    if (!event.isPointerOverContainer) {
      this.diagram.shapes.push({
        name: event.item.data,
        position: event.distance
      });
      this.storeService.setDiagram(this.diagram);
    }
  }
}
