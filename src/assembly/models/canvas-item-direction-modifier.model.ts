import MovementDirection from '../enums/movement-direction.enum';
/** direction modifier determines if the ball moves up or down, left or right */
export default class CanvasItemDirectionModifier {
    public x: MovementDirection;
    public y: MovementDirection;
    constructor(x: MovementDirection, y: MovementDirection) {
        this.x = x;
        this.y = y;
    }
}
