import Circle from './models/shapes/circle.model';
import CanvasDimensions from './models/canvas.model';
import RGB from './models/rgb-color.model';
import CanvasItemDirectionModifier from './models/canvas-item-direction-modifier.model';
import MovementDirection from './enums/movement-direction.enum';

export class BreakoutGame {

    public ball: Circle;
    public canvas: CanvasDimensions;

    constructor(canvasWidth: i32, canvasHeight: i32) {
        this.canvas = new CanvasDimensions(canvasWidth, canvasHeight);
        this.ball = new Circle(200, 200, 30, new RGB(0, 255, 0), 15, 15, new CanvasItemDirectionModifier(MovementDirection.forward, MovementDirection.forward))
    }

    public gameLoop():void{
        this.ball.accelerateItem();
        clear_rect(0,0,this.canvas.width, this.canvas.height)
        draw_circle(
            this.ball.x,
            this.ball.y,
            this.ball.radius,
            this.ball.fill.red,
            this.ball.fill.green,
            this.ball.fill.blue
        );
    }

}


const circle = new Circle(
  50, 50, 20, new RGB(0, 130, 200), 0, 0, new CanvasItemDirectionModifier(MovementDirection.forward, MovementDirection.forward)
)


export function add(a: i32, b: i32): i32 {
  return a + b;
}

@external("canvas", "drawCircle")
declare function draw_circle(x: i32, y: i32, radius: i32, red: i32, green: i32, blue: i32): void;

@external("canvas", "drawRect")
declare function draw_rect(x: i32, y: i32, width: i32, height: i32, red: i32, green: i32, blue: i32): void;

@external("canvas", "clearRect")
declare function clear_rect(x: i32, y: i32, width: i32, height: i32): void;
