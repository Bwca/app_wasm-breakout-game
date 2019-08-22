import Circle from './models/shapes/circle.model';
import CanvasDimensions from './models/canvas.model';
import RGB from './models/rgb-color.model';
import CanvasItemDirectionModifier from './models/canvas-item-direction-modifier.model';
import MovementDirection from './enums/movement-direction.enum';
import BreakOutGameStatuses from '../wasm-shared/enums/game-statuses.enum';

export class BreakoutGame {

  private ball: Circle;
  private canvas: CanvasDimensions;
  private gameStatus: BreakOutGameStatuses;

  constructor(canvasWidth: i32, canvasHeight: i32) {
    this.canvas = new CanvasDimensions(canvasWidth, canvasHeight);
    this.ball = new Circle(200, 200, 5, new RGB(0, 255, 0), 15, 15, new CanvasItemDirectionModifier(MovementDirection.forward, MovementDirection.forward));
    this.gameStatus = BreakOutGameStatuses.NewGame;
  }

  public gameLoop(): void {
    this.ball.accelerateItem();
    clear_rect(0, 0, this.canvas.width, this.canvas.height);
    draw_circle(
      this.ball.x,
      this.ball.y,
      this.ball.radius,
      this.ball.fill.red,
      this.ball.fill.green,
      this.ball.fill.blue
    );
    this.collide();
    check_if_can_continue(this.gameStatus);
  }

  private collide(): void {
    if (this.ball.x < 0 || this.ball.x > this.canvas.width) {
      this.ball.directionModifier.x = -this.ball.directionModifier.x;
    }
    if (this.ball.y < 0 || this.ball.y > this.canvas.height) {
      this.ball.directionModifier.y = -this.ball.directionModifier.y;
    }
  }
}

export function createGame(canvasWidth: i32, canvasHeight: i32): BreakoutGame {
  return new BreakoutGame(canvasWidth, canvasHeight);
}

@external("canvas", "drawCircle")
declare function draw_circle(x: i32, y: i32, radius: i32, red: i32, green: i32, blue: i32): void;

@external("canvas", "drawRect")
declare function draw_rect(x: i32, y: i32, width: i32, height: i32, red: i32, green: i32, blue: i32): void;

@external("canvas", "clearRect")
declare function clear_rect(x: i32, y: i32, width: i32, height: i32): void;

@external("game", "canContinueCheck")
declare function check_if_can_continue(status: BreakOutGameStatuses): void;