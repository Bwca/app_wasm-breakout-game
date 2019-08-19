import MovementDirection from '../../enums/movement-direction.enum';
import RGB from '../rgb-color.model';
import CanvasItemDirectionModifier from '../canvas-item-direction-modifier.model';

/** the interface allows shapes to store information
 *  about their positions on the canvas
 */
export default abstract class CanvasItem {
    /** x-axis position on canvas */
    public x: i32;
    /** y-axis position on canvas */
    public y: i32;
    /** color */
    public fill: RGB;
    /** base x speed */
    public speedX: i32;
    /** base y speed */
    public speedY: i32;
    /** determines if the item is moving forward or backward */
    public directionModifier: CanvasItemDirectionModifier;

    constructor() {
        this.resetMovementModifier();
    }

    public resetMovementModifier(): void {
        this.directionModifier.x = MovementDirection.forward;
        this.directionModifier.y = MovementDirection.forward;
    }

    /** change position based on speed */
    public accelerateItem(): void {
        this.x += this.speedX * this.directionModifier.x;
        this.y += this.speedY * this.directionModifier.y;
    }
}