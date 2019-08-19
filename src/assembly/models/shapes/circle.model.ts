import CanvasItem from './canvas-item.model';
import RGB from '../rgb-color.model';
import CanvasItemDirectionModifier from '../canvas-item-direction-modifier.model';

export default class Circle extends CanvasItem {
    public radius: i32;

    constructor(
        x: i32,
        y: i32,
        radius: i32,
        fill: RGB,
        speedX: i32,
        speedY: i32,
        directionModifier: CanvasItemDirectionModifier
    ) {
        super();
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.fill = fill;
        this.speedX = speedX;
        this.speedY = speedY;
        this.directionModifier = directionModifier;
    }

    public onHorizontalObstacleCollision(): void {
        this.directionModifier.x = -this.directionModifier.x;
    }

    public onVerticalObstacleCollision(): void {
        this.directionModifier.y = -this.directionModifier.y;
    }

    public onPaddleCollision(): void {
        this.onVerticalObstacleCollision();
    }
/* 
    public adjustCanvasPosition(canvasHeight: number, canvasWidth: number): void {
        if (this.canvasX < this.radius) {
            this.canvasX = this.radius;
        }
        else
            if (this.canvasX > canvasWidth - this.radius) {
                this.canvasX = canvasWidth - this.radius;
            }


        if (this.canvasY < this.radius) {
            this.canvasY = this.radius;
        }
        else
            if (this.canvasY > canvasHeight - this.radius) {
                this.canvasY = canvasHeight - this.radius;
            }
    } */
}