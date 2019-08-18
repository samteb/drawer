import { Component, Input } from '@angular/core';
import { Shapes } from '../../models';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.svg',
  styleUrls: ['./shape.component.scss']
})

export class ShapeComponent {
  shapes = Shapes;
  @Input() name: Shapes;

  constructor() {}
}
