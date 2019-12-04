export enum Shapes {
  circle = 'circle',
  square = 'square',
  triangle = 'triangle'
}

export interface Position {
  x: number;
  y: number;
}

export interface Shape {
  name: Shapes;
  position: Position;
}

export interface Diagram {
  _id?: string;
  published: boolean;
  shapes: Shape[];
}

export interface DiagramResolve {
  diagram: Diagram;
  error?: string;
}
