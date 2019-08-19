import MovementDirection from './enums/movement-direction.enum';
import CanvasItemDirectionModifier from './models/canvas-item-direction-modifier.model';
import CanvasDimensions from './models/canvas.model';
import Circle from './models/shapes/circle.model';
import RGB from './models/rgb-color.model';


const circle = new Circle(
  50, 50, 20, new RGB(0, 130, 200), 0, 0, new CanvasItemDirectionModifier(MovementDirection.forward, MovementDirection.forward)
)


export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function sayHello(): void {
  draw_circle(circle.x, circle.y, circle.radius, circle.fill.red, circle.fill.green, circle.fill.blue);
  draw_rect(200, 200, 150, 10, 255, 0, 255);
}

@external("canvas", "drawCircle")
declare function draw_circle(x: i32, y: i32, radius: i32, red: i32, green: i32, blue: i32): void;

@external("canvas", "drawRect")
declare function draw_rect(x: i32, y: i32, width: i32, height: i32, red: i32, green: i32, blue: i32): void;