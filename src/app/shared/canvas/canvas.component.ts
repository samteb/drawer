import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Shape } from '../../models';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})

export class CanvasComponent {
  @Input() viewMode = false;
  @Input() shapes: Shape[];
  @Output() shapesChange = new EventEmitter<Shape[]>();

  dragEnd(event: CdkDragEnd<Shape>) {
    event.source.data.position = event.source.getFreeDragPosition();
  }
}
