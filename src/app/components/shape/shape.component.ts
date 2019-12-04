import { Component, Input } from '@angular/core';
import { Shapes } from '../../models';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.svg'
})

export class ShapeComponent {
  @Input() name: Shapes;
  shapes = Shapes;

  constructor() {}
}
